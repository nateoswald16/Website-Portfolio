from flask import Blueprint, request, jsonify

contact_bp = Blueprint("contact", __name__, url_prefix="/api/contact")

@contact_bp.route("/", methods=["POST"])
def send_message():
    data = request.get_json()
    
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")
    
    if not name or not email or not message:
        return jsonify({"error": "Name, email, and message are required"}), 400
    
    # TODO: Implement email sending or message storage
    
    return jsonify({"message": "Message received"}), 200
