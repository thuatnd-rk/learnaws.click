from fastapi import FastAPI
from pydantic import BaseModel
from generator.generator import generate_response

app = FastAPI()

class QueryRequest(BaseModel):
    query: str

@app.post("/ask")
async def ask(request: QueryRequest):
    response = generate_response(request.query)
    return {"response": response}
