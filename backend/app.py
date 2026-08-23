from services.job_services import get_required_skills
from bson import ObjectId
from skill_services import match_skills, get_missing_skills
from utils.candidate_classifier import detect_candidate_type
from roadmap_service import generate_roadmap
from db import job_roles_collection
from werkzeug.utils import secure_filename
import uuid
from auth import token_required
from flask_cors import CORS
from dotenv import load_dotenv

from ai_analysis import analyze_resume
from flask import Flask, request, jsonify
import jwt
import os
from werkzeug.exceptions import RequestEntityTooLarge
from resume_parser import extract_text
from flask_bcrypt import Bcrypt

from db import users_collection
from db import resume_collection

from datetime import datetime, timedelta, timezone
from ats_service import calculate_ats_score



BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(BASE_DIR, ".env"))

app = Flask(__name__)
@app.errorhandler(RequestEntityTooLarge)
def handle_file_too_large(error):
    return jsonify({
        "error": "File size must not exceed 5 MB"
    }), 413


@app.errorhandler(500)
def handle_server_error(error):
    return jsonify({
        "error": "Internal server error"
    }), 500


CORS(
    app,
    resources={
        r"/*": {
            "origins": "https://ai-resume-analyzer-frontend-iz3z.onrender.com"
        }
    }
)

app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

if not app.config["SECRET_KEY"]:
    raise RuntimeError("SECRET_KEY is not configured")


bcrypt = Bcrypt(app)

@app.route('/login', methods=['POST'])
def login():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
        "error": "Invalid request data"
    }), 400

    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    if not email or not password:
        return jsonify({
        "error": "Email and password are required"
    }), 400
    user = users_collection.find_one({
        "email": email
    })

    if not user:
        return jsonify({
          
    "error": "Invalid  username or password"
}), 401
    

    if not bcrypt.check_password_hash(user["password"], password):
        return jsonify({
            "error": "Invalid password"
        }), 401

   
    token = jwt.encode(
        {
            "email": email,
            "exp": datetime.now(timezone.utc) + timedelta(hours=24)
        },
        app.config["SECRET_KEY"],
        algorithm="HS256"
    )

   

    return jsonify({

        "success": True,

        "message": "Login Successful",

        "data": {

            "token": token,

            "email": email,

            "username": user["username"]

        }

    })
@app.route("/job-roles", methods=["GET"])
def get_job_roles():
    roles = job_roles_collection.find({}, {"_id": 0, "role_name": 1})

    return jsonify({
        "roles": [role["role_name"] for role in roles]
    })
@app.route("/register", methods=["POST"])
def register():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "error": "Invalid request data"
        }), 400

    username = data.get("username", "").strip()
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    # Required fields
    if not username or not email or not password:
        return jsonify({
            "error": "Username, email and password are required"
        }), 400

    # Username validation
    if len(username) < 3 or len(username) > 50:
        return jsonify({
        "error": "Username must be between 3 and 50 characters"
    }), 400

    # Email validation
    import re

    email_pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"

    if not re.match(email_pattern, email):
        return jsonify({
            "error": "Please enter a valid email address"
        }), 400
    if len(email) > 254:
        return jsonify({
        "error": "Email address is too long"
    }), 400
    # Password validation
    if len(password) < 8:
        return jsonify({
            "error": "Password must be at least 8 characters"
        }), 400
    if len(password) > 72:
        return jsonify({
        "error": "Password must not exceed 72 characters"
    }), 400
    existing_user = users_collection.find_one({
        "email": email
    })

    if existing_user:
        return jsonify({
            "error": "Email is already registered"
        }), 400

    hashed_password = bcrypt.generate_password_hash(
        password
    ).decode("utf-8")

    users_collection.insert_one({
        "username": username,
        "email": email,
        "password": hashed_password
    })

    return jsonify({
        "message": "User registered successfully"
    }), 201
UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {"pdf", "docx"}

app.config["MAX_CONTENT_LENGTH"] = 5 * 1024 * 1024  # 5 MB
def allowed_file(filename):
    return (
        "." in filename and
        filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS
    )
@app.route('/')
def home():
    return "API is running"

@app.route('/upload', methods=['POST'])
@token_required
def upload_resume(data):

    if 'resume' not in request.files:
        return jsonify({
            "error": "No file uploaded"
        }), 400

    file = request.files["resume"]

    if file.filename == "":
        return jsonify({
            "error": "No selected file"
        }), 400

    original_filename = secure_filename(file.filename)

    if not original_filename:
        return jsonify({
            "error": "Invalid filename"
        }), 400

    if not allowed_file(original_filename):
        return jsonify({
            "error": "Only PDF and DOCX files are allowed"
        }), 400

    role = request.form.get("role", "").strip()

    if not role or len(role) > 100:
        return jsonify({
            "error": "Invalid job role"
        }), 400

    extension = original_filename.rsplit(".", 1)[1].lower()

    unique_filename = f"{uuid.uuid4().hex}.{extension}"

    file_path = os.path.join(
        UPLOAD_FOLDER,
        unique_filename
    )

    file.save(file_path)

    try:
        # Extract Resume Text
        resume_text = extract_text(file_path)

        # Candidate Type
        candidate_type = detect_candidate_type(resume_text)

        # Required Skills
        required_skills = get_required_skills(role)

        if not required_skills:
            return jsonify({
                "error": "Invalid Job Role"
            }), 400

        # Match Skills
        matched_skills = match_skills(
            resume_text,
            required_skills
        )

        missing_skills = get_missing_skills(
            matched_skills,
            required_skills
        )

        # ATS Score
        ats_score = calculate_ats_score(
            matched_skills,
            required_skills
        )

        # AI Analysis
        analysis = analyze_resume(resume_text)

        # Roadmap
        roadmap = generate_roadmap(
            missing_skills
        )

        # Store in MongoDB
        resume_collection.insert_one({
            "resume_name": file.filename,
            "email": data["email"],
            "role": role,
            "candidate_type": candidate_type,
            "ats_score": ats_score,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "analysis": analysis,
            "roadmap": roadmap
        })

        return jsonify({
            "resume_name": file.filename,
            "candidate_type": candidate_type,
            "role": role,
            "ats_score": ats_score,
            "matched_skills": matched_skills,
            "missing_skills": missing_skills,
            "analysis": analysis,
            "roadmap": roadmap
        })

    except Exception as e:
        print("Upload processing error:", e)

        return jsonify({
            "error": "Failed to process resume"
        }), 500

    finally:
        if os.path.exists(file_path):
            os.remove(file_path)


@app.route("/history", methods=["GET"])
@token_required
def get_history(data):

    history = list(
        resume_collection.find({"email": data["email"]})
    )

    for item in history:
        item["_id"] = str(item["_id"])

    return jsonify({
        "history": history
    })
'''@app.route('/match-jd', methods=['POST'])
def match_jd():

    data = request.json

    resume_text = data.get("resume_text")
    job_description = data.get("job_description")

    if not resume_text or not job_description:
        return jsonify({
            "error": "resume_text and job_description are required"
        }), 400
       
    result = match_resume_with_jd(
    resume_text,
    job_description

)
    
    return jsonify(result)'''


@app.route("/resume/<resume_id>", methods=["DELETE"])
@token_required
def delete_resume(data, resume_id):

    try:
        object_id = ObjectId(resume_id)
    except Exception:
        return jsonify({
            "error": "Invalid resume ID"
        }), 400

    result = resume_collection.delete_one({
        "_id": object_id,
        "email": data["email"]
    })

    if result.deleted_count == 0:
        return jsonify({
            "error": "Resume not found"
        }), 404

    return jsonify({
        "message": "Resume deleted successfully"
    }), 200

@app.route('/roadmap', methods=['POST'])
@token_required
def roadmap(data):

    request_data = request.get_json(silent=True)

    if not request_data:
        return jsonify({
            "error": "Invalid request data"
        }), 400

    missing_skills = request_data.get("missing_skills", [])

    if not isinstance(missing_skills, list):
        return jsonify({
            "error": "missing_skills must be a list"
        }), 400

    result = generate_roadmap(missing_skills)

    return jsonify({
        "roadmap": result
    })

if __name__ == '__main__':
    app.run()
    