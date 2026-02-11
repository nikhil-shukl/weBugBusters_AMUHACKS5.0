import json
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from services.retriever import retrieve_with_score
from core.config import OPENAI_API_KEY


def extract_skills_with_evidence(vectorstore, chunks):

    llm = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0,
        openai_api_key=OPENAI_API_KEY
    )

    full_text = "\n".join(chunks)

    # STEP 1: Extract possible skills from document
    extraction_prompt = ChatPromptTemplate.from_template("""
You are an AI system that extracts all clearly identifiable skills from academic project reports.

RULES:
- Extract only skills that are explicitly present.
- Do NOT guess.
- Categorize skills into:
    Technical
    Tools
    Management
    Communication
    Leadership
    Domain
- Return JSON list:
[
  {{
    "name": "...",
    "category": "..."
  }}
]

If no strong skills are found, return:
[]
Document:
{document}
""")

    skill_response = llm.invoke(
        extraction_prompt.format(document=full_text)
    )

    try:
        skills = json.loads(skill_response.content)
    except:
        return {
            "message": "Skill extraction currently in development. Please upload a more detailed project document."
        }

    if not skills:
        return {
            "message": "No strong verifiable skills found in the document. Please upload a technical or project-based report."
        }

    verified_results = []

    # STEP 2: Verify each skill using RAG retrieval
    for skill in skills:

        skill_name = skill["name"]

        retrieved_docs = retrieve_with_score(vectorstore, skill_name, k=2)

        if not retrieved_docs:
            continue

        best_doc, score = retrieved_docs[0]

        # Similarity threshold check (important)
        if score < 0.5:  # adjust threshold if needed
            verified_results.append({
                "name": skill_name,
                "category": skill["category"],
                "evidence": best_doc.page_content[:300]
            })

    if not verified_results:
        return {
            "message": "Skills detected but not strongly verifiable from document context."
        }

    return {
        "skills": verified_results
    }