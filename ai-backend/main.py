from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from services.pdf_loader import extract_text_from_pdf
from services.text_splitter import split_text
from services.embeddings import create_vector_store
from services.skill_extractor import extract_skills_with_evidence
from services.resume_generator import generate_verified_resume  # NEW

app = FastAPI()

# CORS (VERY IMPORTANT for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def health_check():
    return {"status": "AI Backend Running"}


# -------------------------------
# EXISTING ANALYZE ENDPOINT
# -------------------------------

@app.post("/analyze")
async def analyze_project(file: UploadFile = File(...)):

    text = extract_text_from_pdf(file.file)

    if not text.strip():
        return {
            "message": "The uploaded file appears empty or unreadable."
        }

    chunks = split_text(text)
    vectorstore = create_vector_store(chunks)

    result = extract_skills_with_evidence(vectorstore, chunks)

    return result


# -------------------------------
# NEW RESUME GENERATION ENDPOINT
# -------------------------------

@app.post("/generate_verified_resume")
async def generate_resume(file: UploadFile = File(...)):

    text = extract_text_from_pdf(file.file)

    if not text.strip():
        return {
            "message": "The uploaded file appears empty or unreadable."
        }

    chunks = split_text(text)
    vectorstore = create_vector_store(chunks)

    # Reuse extracted skills
    analysis = extract_skills_with_evidence(vectorstore, chunks)

    # Convert analysis → structured resume
    resume_data = generate_verified_resume(analysis)

    return resume_data
