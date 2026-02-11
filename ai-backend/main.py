from fastapi import FastAPI, UploadFile, File
from services.pdf_loader import extract_text_from_pdf
from services.text_splitter import split_text
from services.embeddings import create_vector_store
from services.skill_extractor import extract_skills_with_evidence

app = FastAPI()

@app.post("/analyze")
async def analyze_project(file: UploadFile = File(...)):
    text = extract_text_from_pdf(file.file)
    chunks = split_text(text)
    vectorstore = create_vector_store(chunks)
    skills = extract_skills_with_evidence(vectorstore)
    return {"skills": skills}
