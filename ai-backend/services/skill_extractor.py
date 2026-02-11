from core.constants import SKILL_KEYWORDS
from services.retriever import retrieve_relevant_chunks

def extract_skills_with_evidence(vectorstore):
    results = []

    for skill, keywords in SKILL_KEYWORDS.items():
        query = " ".join(keywords)
        matches = retrieve_relevant_chunks(vectorstore, query)

        if matches:
            results.append({
                "name": skill,
                "evidence": matches[0][:200]
            })

    return results