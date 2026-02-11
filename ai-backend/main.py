from fastapi import FastAPI, UploadFile, File
from services.pdf_loader import extract_text_from_pdf
from services.text_splitter import split_text
from services.embeddings import create_vector_store
from services.skill_extractor import extract_skills_with_evidence

app = FastAPI()

@app.get("/")
def health_check():
    return {"status": "AI Backend Running"}

@app.post("/analyze")
async def analyze_project(file: UploadFile = File(...)):

    # Step 1: Extract text
    text = extract_text_from_pdf(file.file)

    if not text.strip():
        return {
            "message": "The uploaded file appears empty or unreadable."
        }

    # Step 2: Split into chunks
    chunks = split_text(text)

    # Step 3: Create vector store
    vectorstore = create_vector_store(chunks)

    # Step 4: Extract & verify skills
    result = extract_skills_with_evidence(vectorstore, chunks)

    return result