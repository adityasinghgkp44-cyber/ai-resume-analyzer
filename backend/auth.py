import os
import jwt

from flask import request, jsonify
from functools import wraps
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

load_dotenv(os.path.join(BASE_DIR, ".env"))

SECRET_KEY = os.getenv("SECRET_KEY")

if not SECRET_KEY:
    raise RuntimeError("SECRET_KEY is not configured")


def token_required(f):

    @wraps(f)
    def decorated(*args, **kwargs):

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({
                "error": "Token is missing"
            }), 401

        if not auth_header.startswith("Bearer "):
            return jsonify({
                "error": "Invalid Authorization header"
            }), 401

        token = auth_header.split(" ", 1)[1].strip()

        if not token:
            return jsonify({
                "error": "Token is missing"
            }), 401

        try:

            data = jwt.decode(
                token,
                SECRET_KEY,
                algorithms=["HS256"]
            )

        except jwt.ExpiredSignatureError:

            return jsonify({
                "error": "Token has expired"
            }), 401

        except jwt.InvalidTokenError:

            return jsonify({
                "error": "Invalid token"
            }), 401
        if not data.get("email"):
            return jsonify({
        "error": "Invalid token payload"
    }), 401


        return f(data, *args, **kwargs)

    return decorated