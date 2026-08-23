import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

print("API Key:", os.getenv("GOOGLE_API_KEY")[:10], "...")

client = genai.Client(api_key=os.getenv("GOOGLE_API_KEY"))

response = client.models.generate_content(
    model="models/gemini-3.1-flash-lite",
    contents="Reply with only OK"
)

print(response.text)