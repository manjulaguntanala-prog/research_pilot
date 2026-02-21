from fastapi import APIRouter
from utils.research_agent import ask_agent

router = APIRouter(prefix="/chat")

@router.get("/")
def chat(query: str):
    response = ask_agent(query)
    return {"response": response}