from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from core.config import OPENAI_API_KEY
import os

def create_vector_store(chunks):
    embeddings = OpenAIEmbeddings(openai_api_key=OPENAI_API_KEY)
    vectorstore = FAISS.from_texts(chunks, embeddings)
    return vectorstore
