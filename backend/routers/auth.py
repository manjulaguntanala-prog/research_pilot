from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter(prefix="/auth")

fake_users = {}

class User(BaseModel):
    username: str
    password: str

@router.post("/register")
def register(user: User):
    fake_users[user.username] = user.password
    return {"message": "User registered"}

@router.post("/login")
def login(user: User):
    if fake_users.get(user.username) == user.password:
        return {"message": "Login successful"}
    return {"error": "Invalid credentials"}