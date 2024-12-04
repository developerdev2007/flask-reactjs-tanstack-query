from datetime import timedelta

class Config:
    SECRET_KEY = 'your-secret-key'  # In production, use environment variable
    SQLALCHEMY_DATABASE_URI = 'postgresql://username:password@localhost/xyz_enterprise'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = 'jwt-secret-key'  # In production, use environment variable
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

# import os

# class Config:
#     SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'your-secret-key'
#     SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///database.db'
#     SQLALCHEMY_TRACK_MODIFICATIONS = False
