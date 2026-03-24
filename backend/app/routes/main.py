from flask import Blueprint, jsonify

main_bp = Blueprint("main", __name__, url_prefix="/api")

@main_bp.route("/", methods=["GET"])
def index():
    return jsonify({"message": "Portfolio API"}), 200

@main_bp.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"}), 200
