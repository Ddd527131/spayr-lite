from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
import json
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_PATH = "db.json"

class AdvanceRequest(BaseModel):
    username: str
    amount: float

def read_db():
    if not os.path.exists(DB_PATH):
        return {"users": {"Durand": {"balance": 1500}}, "history": []}
    with open(DB_PATH, "r") as f:
        return json.load(f)

def write_db(data):
    with open(DB_PATH, "w") as f:
        json.dump(data, f, indent=2)

@app.get("/history")
def get_history():
    data = read_db()
    return {"history": data["history"]}

@app.post("/advance")
def request_advance(req: AdvanceRequest):
    data = read_db()
    user = data["users"].get(req.username, {"balance": 1500})

    if req.amount > user["balance"]:
        return {"error": "Montant demandé supérieur au solde."}

    user["balance"] -= req.amount
    data["users"][req.username] = user
    data["history"].append({
        "date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "amount": req.amount
    })

    write_db(data)
    return {"message": "Avance accordée", "new_balance": user["balance"]}
from fastapi import HTTPException

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/login")
def login(req: LoginRequest):
    data = read_db()
    for username, user in data["users"].items():
        if user.get("email") == req.email and user.get("password") == req.password:
            token = f"token-{username}"
            return {"access_token": token, "role": "user"}
    raise HTTPException(status_code=401, detail="Identifiants incorrects")


@app.get("/user/{username}")
def get_user(username: str):
    data = read_db()
    user = data["users"].get(username)
    if not user:
        return {"error": "Utilisateur introuvable"}
    return {"balance": user["balance"]}
from fastapi import Header

@app.get("/me")
def get_me(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Token manquant")

    token = authorization.replace("Bearer ", "")
    if not token.startswith("token-"):
        raise HTTPException(status_code=401, detail="Token invalide")

    username = token.replace("token-", "")
    data = read_db()

    user = data["users"].get(username)
    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur non trouvé")

    return {
        "username": username,
        "email": user["email"],
        "role": "user",
        "balance": user["balance"]
    }
