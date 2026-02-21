from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext

import models
from database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔥 REGISTER API
@app.post("/auth/register")
def register(username: str, password: str, db: Session = Depends(get_db)):

    # Check if user already exists
    existing_user = db.query(models.User).filter(
        models.User.username == username
    ).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Username already exists")

    # Hash password
    hashed_password = pwd_context.hash(password)

    # Create user
    new_user = models.User(
        username=username,
        password=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}