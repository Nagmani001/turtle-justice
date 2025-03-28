# Turtle-justice

## Things to do 

- Intent recognition and NER (getting useful data from user's query )
- Implement recursive RAG
- Adding system prompt to get response in specific format 
- Adding project Id and storing user <==> system conversation and sending all the chats with the latest query 

## Setting up locally 

### Note: i am using python3.11 because the latest python 3.13 has some problems running build tools 

- clone the repo 

```
git clone https://github.com/MyRedPaper/Turtle-Justice.git && cd Turtle-Justice
```


- Run docker container for chromaDB
```
docker run -d -p 8000:8000 -v chroma_data:/chroma/chroma chromadb/chroma
```

- Initialze venv and source it 

```
python3.11 -m venv venv && source venv/bin/activate
```


- install dependencies 
```
pip3.11 install -r requirements.txt
```
- if your internet speed is low use this 
```
pip3.11 install --timeout 1800 -r requirements.txt
```
- populate .env
```
cp .env.example .env
```
- populate chromaDB
```
python3.11 -m app.ingest
```
- run uvicorn server 
```
uvicorn app.main:app --reload --port 8001
```


# Testing the endpoint 

- with curl 
```
curl -X POST http://localhost:8001/query \
     -H "Content-Type: application/json" \
     -d '{"prompt": "What is the structure of the state as defined in the Constitution of Nepal 2015?"}'

```
- with httpie 
```
http POST http://localhost:8001/query prompt="What is the structure of the state as defined in the Constitution of Nepal 2015? "
```
- or use postman
