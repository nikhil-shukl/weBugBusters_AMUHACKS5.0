def retrieve_with_score(vectorstore, query, k=3):
    docs = vectorstore.similarity_search_with_score(query, k=k)
    return docs

