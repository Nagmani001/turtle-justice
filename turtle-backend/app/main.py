from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.chroma_client import get_chroma_client
from sentence_transformers import SentenceTransformer
import google.generativeai as genai
import os
from dotenv import load_dotenv

from app.utils import get_intent

load_dotenv()

app = FastAPI()
model = SentenceTransformer('all-MiniLM-L6-v2',device="cpu")
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

origins = [
    "http://localhost:3000",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = get_chroma_client()
collection = client.get_collection("documents")
gemini = genai.GenerativeModel('gemini-2.0-flash-001')

class QueryRequest(BaseModel):
    prompt: str


@app.get("/")
async def root():
    print("hi")
    return {"message": "Hello World"}

@app.post("/query")
async def handle_query(request_body: QueryRequest):
        intent =  get_intent(request_body.prompt)
        query_embedding = model.encode(request_body.prompt).tolist()
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=5,
            where={
            "$or":[
                {
                    "intent1":intent[0]
                },
                {
                    "intent2":intent[1]
                }
            ]
        }
        )
        print(results) 
        context = "\n\n".join(results['documents'][0])
        
        response = gemini.generate_content(
            f"Context: {context}\n\nQuestion: {request_body.prompt}\n\nAnswer:"
        )
        
        return {"response": response.text}
    

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
