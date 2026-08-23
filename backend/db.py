from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise RuntimeError("MONGO_URI is not configured")

client = MongoClient(
    MONGO_URI,
    serverSelectionTimeoutMS=5000
)

try:
    client.admin.command("ping")
except Exception as e:
    raise RuntimeError(f"MongoDB connection failed: {e}")

db = client["ai_resume_analyzer"]

users_collection = db["users"]
resume_collection = db["resumes"]
job_roles_collection = db["job_roles"]

users_collection.create_index(
    "email",
    unique=True
)