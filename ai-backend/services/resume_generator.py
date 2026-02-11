from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
import json
import re

def generate_verified_resume(analysis_data):

    llm = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0.35
    )

    prompt = f"""
You are a Principal Software Engineer and FAANG-level resume strategist.

Your task is to transform academic and project-based analysis into a
highly competitive, top 1% industry-ready Software Engineer resume.

This resume must be suitable for:
- Product-based companies
- High-performance engineering teams
- Scalable backend systems
- Full-stack engineering roles

STRICT REQUIREMENTS:

1. Use powerful action verbs (Architected, Engineered, Designed, Optimized, Led, Scaled).
2. Include measurable impact in EVERY experience/project section:
   - % improvements
   - performance gains
   - scale (users, requests, systems)
   - latency reduction
   - reliability improvements
3. Convert academic projects into production-level descriptions.
4. Show system design thinking and ownership.
5. Mention technologies in context (not just listing).
6. Avoid weak phrases like "worked on", "helped with", "basic knowledge".
7. Keep resume dense, high-signal, and within 1 page.
8. Each experience/project MUST have 4–6 strong bullet points.
9. Professional summary must sound senior and impact-driven.
10. Return STRICT raw JSON only. No markdown. No explanation.

REQUIRED JSON STRUCTURE:

{{
  "name": "Candidate Name",
  "professional_summary": "4–5 line impact-driven summary",
  "experience": [
    {{
      "role": "...",
      "company": "...",
      "duration": "...",
      "points": [
        "Strong quantified bullet",
        "Strong quantified bullet",
        "Strong quantified bullet",
        "Strong quantified bullet"
      ]
    }}
  ],
  "projects": [
    {{
      "title": "...",
      "description": [
        "Strong quantified bullet",
        "Strong quantified bullet",
        "Strong quantified bullet",
        "Strong quantified bullet"
      ]
    }}
  ],
  "technical_skills": [
    "Grouped and categorized skills (Languages | Frameworks | Databases | Tools)"
  ]
}}

ACADEMIC ANALYSIS INPUT:
{analysis_data}
"""

    response = llm.invoke([HumanMessage(content=prompt)])
    content = response.content.strip()

    # Remove markdown if model accidentally adds it
    content = re.sub(r"```json", "", content)
    content = re.sub(r"```", "", content)

    try:
        return json.loads(content)
    except Exception as e:
        print("JSON Parse Error:", e)
        return {
            "professional_summary": content,
            "technical_skills": [],
            "projects": []
        }
