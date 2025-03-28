import chromadb
from dotenv import load_dotenv
import os

load_dotenv()

def get_chroma_client():
    return chromadb.HttpClient(
        host=os.getenv("CHROMA_HOST","localhost"),
        port=int(os.getenv("CHROMA_PORT",8000))
    )
