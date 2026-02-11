from langchain_openai import OpenAIEmbeddings
from langchain_community.vectorstores import FAISS
from core.config import OPENAI_API_KEY

def create_vector_store(chunks):
    embeddings = OpenAIEmbeddings(
        model="text-embedding-3-small",
        openai_api_key=OPENAI_API_KEY
    )
    vectorstore = FAISS.from_texts(chunks, embeddings)
    return vectorstore

