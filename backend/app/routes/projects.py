from flask import Blueprint, request, jsonify, session
from app.models import Project
from app import db
import os
from werkzeug.utils import secure_filename
from werkzeug.exceptions import BadRequest

projects_bp = Blueprint("projects", __name__, url_prefix="/api/projects")

# Configuration for file uploads
UPLOAD_FOLDER = os.path.join(os.path.dirname(__file__), '../../../', 'frontend/public/uploads')
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_upload_file(file):
    """Save uploaded file and return the filepath"""
    if not file or file.filename == '':
        return None
    
    if not allowed_file(file.filename):
        raise BadRequest('Invalid file type. Allowed types: png, jpg, jpeg, gif, webp')
    
    # Create upload folder if it doesn't exist
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    
    filename = secure_filename(file.filename)
    # Add timestamp to make filename unique
    import time
    filename = f"{int(time.time())}_{filename}"
    filepath = os.path.join(UPLOAD_FOLDER, filename)
    
    file.save(filepath)
    
    # Return relative path for storage
    return f"uploads/{filename}"

def admin_required():
    return "admin_id" in session

@projects_bp.route("/", methods=["GET"])
def get_projects():
    projects = Project.query.all()
    return jsonify([
        {
            "id": p.id,
            "title": p.title,
            "description": p.description,
            "tech_stack": p.tech_stack,
            "github_link": p.github_link,
            "cover_image": p.cover_image,
            "created_at": p.created_at.isoformat() if p.created_at else None,
            "updated_at": p.updated_at.isoformat() if p.updated_at else None
        } for p in projects
    ])

@projects_bp.route("/", methods=["POST"])
def create_project():
    if "admin_id" not in session:
        return jsonify({"error": "Unauthorized"}), 403

    try:
        title = request.form.get("title")
        description = request.form.get("description")
        tech_stack = request.form.get("tech_stack")
        github_link = request.form.get("github_link")
        
        if not title or not description:
            return jsonify({"error": "Title and description are required"}), 400
        
        cover_image = None
        if "cover_image" in request.files:
            file = request.files["cover_image"]
            if file and file.filename != '':
                cover_image = save_upload_file(file)
        
        project = Project(
            title=title,
            description=description,
            tech_stack=tech_stack,
            github_link=github_link,
            cover_image=cover_image
        )

        db.session.add(project)
        db.session.commit()

        return jsonify({"message": "Project created"}), 201
    except BadRequest as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@projects_bp.route("/<int:project_id>", methods=["PUT"])
def update_project(project_id):
    if "admin_id" not in session:
        return jsonify({"error": "Unauthorized"}), 403

    try:
        project = Project.query.get_or_404(project_id)
        
        title = request.form.get("title")
        description = request.form.get("description")
        tech_stack = request.form.get("tech_stack")
        github_link = request.form.get("github_link")
        
        if title:
            project.title = title
        if description:
            project.description = description
        if tech_stack is not None:
            project.tech_stack = tech_stack
        if github_link is not None:
            project.github_link = github_link
        
        # Handle cover image deletion
        if request.form.get("delete_cover_image") == "true":
            if project.cover_image:
                try:
                    old_path = os.path.join(UPLOAD_FOLDER, project.cover_image.split('/')[-1])
                    if os.path.exists(old_path):
                        os.remove(old_path)
                except:
                    pass
                project.cover_image = None
        
        # Handle new cover image upload
        elif "cover_image" in request.files:
            file = request.files["cover_image"]
            if file and file.filename != '':
                # Delete old image if exists
                if project.cover_image:
                    try:
                        old_path = os.path.join(UPLOAD_FOLDER, project.cover_image.split('/')[-1])
                        if os.path.exists(old_path):
                            os.remove(old_path)
                    except:
                        pass
                # Save new image
                project.cover_image = save_upload_file(file)

        db.session.commit()
        return jsonify({"message": "Project updated"})
    except BadRequest as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@projects_bp.route("/<int:project_id>", methods=["DELETE"])
def delete_project(project_id):
    if "admin_id" not in session:
        return jsonify({"error": "Unauthorized"}), 403

    project = Project.query.get_or_404(project_id)
    
    # Delete associated image file
    if project.cover_image:
        try:
            file_path = os.path.join(UPLOAD_FOLDER, project.cover_image.split('/')[-1])
            if os.path.exists(file_path):
                os.remove(file_path)
        except:
            pass
    
    db.session.delete(project)
    db.session.commit()

    return jsonify({"message": "Project deleted"})
