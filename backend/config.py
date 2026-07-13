import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))


class Config:
    # --- Database ---
    SQLALCHEMY_DATABASE_URI = f"sqlite:///{os.path.join(BASE_DIR, 'faculty.db')}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # --- Auth ---
    # IMPORTANT: change this to a long random string in production
    # (e.g. generate one with: python -c "import secrets; print(secrets.token_hex(32))")
    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "change-this-secret-key-in-production")
    JWT_ACCESS_TOKEN_EXPIRES = 60 * 60 * 8  # 8 hours, in seconds

    # --- Default admin account (created automatically on first run if none exists) ---
    DEFAULT_ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
    DEFAULT_ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "admin123")

    # --- File uploads ---
    UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads", "faculty")
    ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png"}
    MAX_CONTENT_LENGTH = 5 * 1024 * 1024  # 5 MB

    # --- CORS ---
    # Add your deployed frontend URL here too once you deploy.
    CORS_ORIGINS = os.environ.get("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173").split(",")
