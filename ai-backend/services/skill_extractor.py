from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from core.config import OPENAI_API_KEY
import json


def extract_skills_with_evidence(vectorstore, chunks):

    llm = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0,
        openai_api_key=OPENAI_API_KEY
    )

    document_text = "\n".join(chunks)

    prompt = ChatPromptTemplate.from_template("""
You are an advanced AI Career Intelligence Engine.

Analyze the given academic resume or project report deeply.

Perform the following tasks:

1. Extract ALL verifiable skills.
2. Categorize each skill into:
   - Technical
   - Tools
   - Management
   - Communication
   - Leadership
   - Domain
3. Determine skill depth:
   - Beginner
   - Intermediate
   - Advanced
4. Provide exact supporting evidence sentence.
5. Assign confidence score (0–100).
6. Calculate overall Career Readiness Score (0–100).
7. Identify Industry Skill Gaps.
8. Suggest new skills to learn.
9. Suggest 3 suitable job roles based on current skill profile.
10. Provide a detailed professional analysis summary.

IMPORTANT:
- Only extract skills explicitly supported by text.
- Do NOT hallucinate.
- Return STRICT JSON only.
- No explanation text.

Return in this exact format:

{{
  "summary": "...",
  "career_readiness_score": 0,
  "skills": [
    {{
      "name": "...",
      "category": "...",
      "depth": "...",
      "confidence_score": 0,
      "evidence": "..."
    }}
  ],
  "industry_gap_analysis": [
    "..."
  ],
  "suggested_skills_to_learn": [
    "..."
  ],
  "recommended_job_roles": [
    "..."
  ]
}}

If document lacks strong skill evidence:

{{
  "summary": "Insufficient verifiable skill content.",
  "career_readiness_score": 0,
  "skills": [],
  "industry_gap_analysis": [],
  "suggested_skills_to_learn": [],
  "recommended_job_roles": []
}}

Document:
{document}
""")

    response = llm.invoke(prompt.format(document=document_text))

    try:
        parsed = json.loads(response.content)
        return parsed
    except:
        return {
            "summary": "Formatting issue detected.",
            "career_readiness_score": 0,
            "skills": [],
            "industry_gap_analysis": [],
            "suggested_skills_to_learn": [],
            "recommended_job_roles": []
        }