# from extensions import db
# from datetime import date, timedelta
# from sqlalchemy.orm import validates


# class Customer(db.Model):
#     id = db.Column(db.Integer, primary_key=True,unique=True)
#     name = db.Column(db.String(100), nullable=False)
#     pan = db.Column(db.String(10), unique=True, nullable=False)

# class Product(db.Model):
#     id = db.Column(db.Integer, primary_key=True,unique=True)
#     name = db.Column(db.String(100), unique=True, nullable=False)
#     description = db.Column(db.String(200), nullable=False)
#     cost_per_user = db.Column(db.Float, nullable=False)

# class Subscription(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
#     product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
#     start_date = db.Column(db.Date,default=date.today(), nullable=True)
#     end_date = db.Column(db.Date, nullable=True)
#     no_of_users = db.Column(db.Integer, nullable=False)

#     @validates('start_date')
#     def set_start_date(self, key, start_date):
#         """Set the start_date to current date if not provided."""
#         if start_date is None:  # Check if start_date is not provided
#             start_date = date.today()  # Set current date as start_date
#         return start_date

#     @validates('end_date')
#     def set_end_date(self, key, end_date):
#         """Automatically set end_date to one year after start_date if not provided."""
#         if end_date is None and self.start_date:  # Only set if end_date is not provided
#             end_date = self.start_date + timedelta(days=365)
#         return end_date

#     customer = db.relationship('Customer', backref='subscriptions')
#     product = db.relationship('Product', backref='subscriptions')
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()

class Customer(db.Model):
    __tablename__ = 'customer'
    
    customer_id = db.Column(db.String(50), primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    pan = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    subscriptions = db.relationship('Subscription', backref='customer', lazy=True)

    def to_dict(self):
        return {
            'customer_id': self.customer_id,
            'name': self.name,
            'pan': self.pan,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class Product(db.Model):
    __tablename__ = 'product'
    
    product_name = db.Column(db.String(50), primary_key=True)
    description = db.Column(db.String(200), nullable=False)
    annual_subscription_cost = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)
    subscriptions = db.relationship('Subscription', backref='product', lazy=True)

    def to_dict(self):
        return {
            'product_name': self.product_name,
            'description': self.description,
            'annual_subscription_cost': self.annual_subscription_cost,
            'is_active': self.is_active,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

class Subscription(db.Model):
    __tablename__ = 'subscription'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    customer_id = db.Column(db.String(50), db.ForeignKey('customer.customer_id'))
    product_name = db.Column(db.String(50), db.ForeignKey('product.product_name'))
    subscription_start_date = db.Column(db.Date, nullable=False)
    subscription_end_date = db.Column(db.Date, nullable=False)
    number_of_users = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), default='active')  # active, expired, cancelled
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'customer_id': self.customer_id,
            'product_name': self.product_name,
            'subscription_start_date': self.subscription_start_date.isoformat(),
            'subscription_end_date': self.subscription_end_date.isoformat(),
            'number_of_users': self.number_of_users,
            'status': self.status,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }