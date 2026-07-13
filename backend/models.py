from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from extensions import db


class Admin(db.Model):
    """A single admin account used to log into the Faculty admin dashboard."""
    __tablename__ = "admin"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    def set_password(self, raw_password: str) -> None:
        self.password_hash = generate_password_hash(raw_password)

    def check_password(self, raw_password: str) -> bool:
        return check_password_hash(self.password_hash, raw_password)


class Faculty(db.Model):
    """A single faculty / staff member shown in the Faculty section of the site."""
    __tablename__ = "faculty"

    id = db.Column(db.Integer, primary_key=True)
    photo = db.Column(db.String(255), nullable=True)          # stored filename only
    name = db.Column(db.String(120), nullable=False)
    qualification = db.Column(db.String(255), nullable=False)
    designation = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self) -> dict:
        return {
            "id": self.id,
            "photo": self.photo,
            "name": self.name,
            "qualification": self.qualification,
            "designation": self.designation,
        }
