from flask import Blueprint, request, jsonify, session
from app.models import Admin
from app import db

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    
    if not username or not password:
        return jsonify({"error": "Username and password are required"}), 400
    
    admin = Admin.query.filter_by(username=username).first()
    
    if admin and admin.check_password(password):
        session.permanent = True
        session["admin_id"] = admin.id
        return jsonify({"message": "Login successful"}), 200
    
    return jsonify({"error": "Invalid username or password"}), 401

@auth_bp.route("/check", methods=["GET"])
def check_auth():
    if "admin_id" in session:
        return jsonify({"authenticated": True}), 200
    return jsonify({"authenticated": False}), 401

@auth_bp.route("/logout", methods=["POST"])
def logout():
    session.clear()
    return jsonify({"message": "Logout successful"}), 200
