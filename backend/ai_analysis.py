import os
import json
from dotenv import load_dotenv
from google import genai

load_dotenv()

GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY not found")

client = genai.Client(api_key=GOOGLE_API_KEY)

MODEL_NAME = "models/gemini-3.1-flash-lite"


def analyze_resume(resume_text):

    prompt = f"""
You are an expert ATS Resume Reviewer.

Analyze the resume and return ONLY valid JSON.

Rules:
- Return ONLY JSON.
- No markdown.
- No explanation.
- No code block.
- Always return every field.
- If nothing is found, return an empty array.

Return exactly this format:

{{
    "strengths": [],
    "weaknesses": [],
    "suggestions": [],
    "interview_questions": []
}}

Generate:
- 4-6 strengths
- 3-5 weaknesses
- 4-6 suggestions
- 5 technical interview questions based on the resume.

Resume:

{resume_text}
"""

    try:

        response = client.models.generate_content(
            model=MODEL_NAME,
            contents=prompt,
        )

        response_text = response.text.strip()

        if response_text.startswith("```"):
            response_text = (
                response_text
                .replace("```json", "")
                .replace("```", "")
                .strip()
            )

        data = json.loads(response_text)

        return {
            "strengths": data.get("strengths", []),
            "weaknesses": data.get("weaknesses", []),
            "suggestions": data.get("suggestions", []),
            "interview_questions": data.get("interview_questions", [])
        }

    except Exception as e:

        print("AI Error:", e)

        return {
            "strengths": [],
            "weaknesses": [],
            "suggestions": [],
            "interview_questions": [],
            "error": str(e)
        }