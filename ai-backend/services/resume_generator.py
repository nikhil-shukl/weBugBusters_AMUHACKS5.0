def generate_verified_resume(analysis_data):

    skills = [skill["name"] for skill in analysis_data.get("skills", [])]

    return {
        "professional_summary": analysis_data.get("summary", ""),
        "technical_skills": skills,
        "projects": [
            {
                "title": "Verified Academic Project",
                "description": analysis_data.get("industry_gap_analysis", ""),
                "tech_stack": skills[:5]
            }
        ],
        "recommended_job_title": (
            analysis_data.get("recommended_job_roles", ["Software Engineer"])[0]
        )
    }
