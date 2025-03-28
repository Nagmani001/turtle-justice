from PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from app.chroma_client import get_chroma_client
from sentence_transformers import SentenceTransformer
from dotenv import load_dotenv

from app.utils import get_intent, read_pdf

load_dotenv()


def ingest_pdf():
    client = get_chroma_client()
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    collection = client.get_or_create_collection("documents")
    
    all_text = read_pdf() 

    documents = []
    metadatas = []
    ids = [] 
    current_id = 0

    text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,
    chunk_overlap=64,
    separators=["\n\n", "\n", ". ", "? ", "! "]
    ) 

    chunks = text_splitter.split_text(all_text)
    print("hi")
    for chunk in chunks:
        intent =  get_intent(chunk)
        metadata = {
            "chunk_id":current_id,
            "intent1":intent[0],
            "intent2":intent[1]
        }
        documents.append(chunk)
        metadatas.append(metadata)
        ids.append(str(current_id)) 
        current_id += 1
    print(metadatas)
    collection.add(
        ids=ids,
        documents=documents,
        metadatas=metadatas,
        embeddings=[model.encode(doc).tolist() for doc in documents]
    )
if __name__ == "__main__":
    ingest_pdf()
    print("PDF ingestion completed successfully!")
