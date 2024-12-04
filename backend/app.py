from flask import Flask
from extensions import db, ma
from flask_cors import CORS
def create_app():
    app = Flask(__name__)

    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize extensions
    db.init_app(app)
    ma.init_app(app)
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})

    # Import and register routes
    from routes import customers, products, subscriptions
    app.register_blueprint(customers.bp, url_prefix='/api/customers')
    app.register_blueprint(products.bp, url_prefix='/api/products')
    app.register_blueprint(subscriptions.bp, url_prefix='/api/subscriptions')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
# from flask import Flask
# from flask_cors import CORS
# from flask_jwt_extended import JWTManager
# from models import db
# from routes import api
# from config import Config
# import logging

# def create_app(config_class=Config):
#     app = Flask(__name__)
#     app.config.from_object(config_class)

#     # Initialize extensions
#     CORS(app)
#     db.init_app(app)
#     jwt = JWTManager(app)

#     # Register blueprints
#     app.register_blueprint(api, url_prefix='/api')

#     # Configure logging
#     logging.basicConfig(
#         level=logging.INFO,
#         format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
#     )

#     # Create database tables
#     with app.app_context():
#         db.create_all()

#     return app

# if __name__ == '__main__':
#     app = create_app()
#     app.run(debug=True)