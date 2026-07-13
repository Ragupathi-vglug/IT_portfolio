import os
import uuid

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    create_access_token,
    jwt_required,
)
from werkzeug.utils import secure_filename

from config import Config
from extensions import db
from models import Admin, Faculty

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, resources={r"/api/*": {"origins": Config.CORS_ORIGINS}, r"/uploads/*": {"origins": "*"}})
db.init_app(app)
jwt = JWTManager(app)

os.makedirs(Config.UPLOAD_FOLDER, exist_ok=True)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
def allowed_file(filename: str) -> bool:
    return (
        "." in filename
        and filename.rsplit(".", 1)[1].lower() in Config.ALLOWED_EXTENSIONS
    )


def save_faculty_photo(file_storage) -> str:
    """Saves an uploaded photo with a unique filename and returns the stored filename."""
    original_name = secure_filename(file_storage.filename)
    ext = original_name.rsplit(".", 1)[1].lower()
    unique_name = f"{uuid.uuid4().hex}.{ext}"
    file_storage.save(os.path.join(Config.UPLOAD_FOLDER, unique_name))
    return unique_name


def delete_faculty_photo(filename: str) -> None:
    if not filename:
        return
    path = os.path.join(Config.UPLOAD_FOLDER, filename)
    if os.path.isfile(path):
        os.remove(path)


def ensure_default_admin() -> None:
    if Admin.query.first() is None:
        admin = Admin(username=Config.DEFAULT_ADMIN_USERNAME)
        admin.set_password(Config.DEFAULT_ADMIN_PASSWORD)
        db.session.add(admin)
        db.session.commit()
        print(
            f"[setup] Created default admin account -> "
            f"username: '{Config.DEFAULT_ADMIN_USERNAME}'  password: '{Config.DEFAULT_ADMIN_PASSWORD}'"
        )


with app.app_context():
    db.create_all()
    ensure_default_admin()


# ---------------------------------------------------------------------------
# Static file serving for uploaded photos
# ---------------------------------------------------------------------------
@app.route("/uploads/faculty/<path:filename>")
def get_faculty_photo(filename):
    return send_from_directory(Config.UPLOAD_FOLDER, filename)


# ---------------------------------------------------------------------------
# Auth routes
# ---------------------------------------------------------------------------
@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json(silent=True) or {}
    username = data.get("username", "").strip()
    password = data.get("password", "")

    if not username or not password:
        return jsonify({"error": "Username and password are required."}), 400

    admin = Admin.query.filter_by(username=username).first()
    if admin is None or not admin.check_password(password):
        return jsonify({"error": "Invalid username or password."}), 401

    token = create_access_token(identity=str(admin.id))
    return jsonify({"token": token, "username": admin.username}), 200


# ---------------------------------------------------------------------------
# Faculty routes
# ---------------------------------------------------------------------------
@app.route("/api/faculty", methods=["GET"])
def list_faculty():
    """Public endpoint — used by the portfolio site itself to display the Faculty section."""
    faculty = Faculty.query.order_by(Faculty.id.asc()).all()
    return jsonify([f.to_dict() for f in faculty]), 200


@app.route("/api/faculty", methods=["POST"])
@jwt_required()
def create_faculty():
    name = request.form.get("name", "").strip()
    qualification = request.form.get("qualification", "").strip()
    designation = request.form.get("designation", "").strip()
    photo_file = request.files.get("photo")

    if not name or not qualification or not designation:
        return jsonify({"error": "Name, qualification, and designation are all required."}), 400

    photo_filename = None
    if photo_file and photo_file.filename:
        if not allowed_file(photo_file.filename):
            return jsonify({"error": "Only JPG, JPEG, and PNG images are allowed."}), 400
        photo_filename = save_faculty_photo(photo_file)

    faculty = Faculty(
        name=name,
        qualification=qualification,
        designation=designation,
        photo=photo_filename,
    )
    db.session.add(faculty)
    db.session.commit()
    return jsonify(faculty.to_dict()), 201


@app.route("/api/faculty/<int:faculty_id>", methods=["PUT"])
@jwt_required()
def update_faculty(faculty_id):
    faculty = Faculty.query.get(faculty_id)
    if faculty is None:
        return jsonify({"error": "Faculty member not found."}), 404

    name = request.form.get("name", "").strip()
    qualification = request.form.get("qualification", "").strip()
    designation = request.form.get("designation", "").strip()
    photo_file = request.files.get("photo")

    if not name or not qualification or not designation:
        return jsonify({"error": "Name, qualification, and designation are all required."}), 400

    if photo_file and photo_file.filename:
        if not allowed_file(photo_file.filename):
            return jsonify({"error": "Only JPG, JPEG, and PNG images are allowed."}), 400
        delete_faculty_photo(faculty.photo)
        faculty.photo = save_faculty_photo(photo_file)

    faculty.name = name
    faculty.qualification = qualification
    faculty.designation = designation
    db.session.commit()
    return jsonify(faculty.to_dict()), 200


@app.route("/api/faculty/<int:faculty_id>", methods=["DELETE"])
@jwt_required()
def delete_faculty(faculty_id):
    faculty = Faculty.query.get(faculty_id)
    if faculty is None:
        return jsonify({"error": "Faculty member not found."}), 404

    delete_faculty_photo(faculty.photo)
    db.session.delete(faculty)
    db.session.commit()
    return jsonify({"message": "Faculty member deleted successfully."}), 200


# ---------------------------------------------------------------------------
# Error handlers
# ---------------------------------------------------------------------------
@app.errorhandler(413)
def file_too_large(_e):
    return jsonify({"error": "Image is too large. Maximum allowed size is 5 MB."}), 413


if __name__ == "__main__":
    app.run(debug=True, port=5000)
