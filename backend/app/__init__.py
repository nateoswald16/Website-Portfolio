from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    app.config.from_object('app.config.Config')
    
    # Initialize extensions
    db.init_app(app)
    CORS(app, supports_credentials=True)
    
    # Register blueprints
    from app.routes import auth, projects, main, contact
    app.register_blueprint(auth.auth_bp)
    app.register_blueprint(projects.projects_bp)
    app.register_blueprint(main.main_bp)
    app.register_blueprint(contact.contact_bp)
    
    # Create database tables
    with app.app_context():
        db.create_all()
    
    return app
