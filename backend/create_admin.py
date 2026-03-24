#!/usr/bin/env python
from app import create_app, db
from app.models import Admin

app = create_app()

def prompt_for_password():
    """Prompt user to enter and confirm a password."""
    while True:
        password = input("Enter admin password: ")
        confirm = input("Confirm admin password: ")
        
        if password == confirm:
            if len(password) < 6:
                print("Password must be at least 6 characters long!")
                continue
            return password
        else:
            print("Passwords do not match. Try again.")

with app.app_context():
    # Check if admin already exists
    admin = Admin.query.filter_by(username='admin').first()
    
    if admin:
        print("Admin user already exists!")
        response = input("Would you like to change the password? (yes/no): ").lower()
        
        if response in ['yes', 'y']:
            password = prompt_for_password()
            admin.set_password(password)
            db.session.commit()
            print("Admin password updated successfully!")
        else:
            print("No changes made.")
    else:
        # Create new admin
        password = prompt_for_password()
        admin = Admin(username='admin')
        admin.set_password(password)
        
        db.session.add(admin)
        db.session.commit()
        
        print("Admin user created successfully!")
        print("Username: admin")
