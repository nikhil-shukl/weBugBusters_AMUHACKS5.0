def retrieve_relevant_chunks(vectorstore, query):
    docs = vectorstore.similarity_search(query, k=2)
    return [doc.page_content for doc in docs]
