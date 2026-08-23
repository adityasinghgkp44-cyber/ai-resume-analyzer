from pymongo import MongoClient
from job_roles import job_roles
uri = "mongodb+srv://adityasinghgkp44_db_user:Aditya120@cluster0.wrq8om5.mongodb.net/?appName=Cluster0"

print(uri)

client = MongoClient(uri)

print(client)
client = MongoClient("mongodb+srv://adityasinghgkp44_db_user:Aditya120@cluster0.wrq8om5.mongodb.net/?appName=Cluster0")

print("Connected!")

db = client["resume_analyzer"]
collection = db["job_roles"]

print("DB:", db.name)
print("Collection:", collection.name)

collection.delete_many({})

for role, data in job_roles.items():
    collection.insert_one({
        "role_name": role,
        "required_skills": data["required_skills"]
    })

print("Inserted:", collection.count_documents({}))

print("Databases:", client.list_database_names())
print("Collections:", db.list_collection_names())

for doc in collection.find().limit(3):
    print(doc)
    print(client.list_database_names())
print(db.list_collection_names())
print(collection.count_documents({}))