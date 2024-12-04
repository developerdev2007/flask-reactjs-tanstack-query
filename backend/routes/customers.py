from flask import Blueprint, request, jsonify
from extensions import db
import re
from models import Customer
from schemas import customer_schema, customers_schema

bp = Blueprint('customers', __name__)

@bp.route('/', methods=['GET'])
def get_customers():
    customers = Customer.query.all()
    return customers_schema.jsonify(customers)

@bp.route('/', methods=['POST'])
def add_customer():
    data = request.json

    # Validate PAN format
    def validate_pan():
        pan_pattern = r'^[A-Z]{5}[0-9]{4}[A-Z]{1}$'
        pan = data.get('pan')
        if not isinstance(pan, str):
            return jsonify({"msg": "Invalid input format. PAN must be a string."}), 400
        if re.match(pan_pattern, pan):
            return True
        else:
            return False
    
    # Check if PAN is valid
    if not validate_pan():
        return jsonify({"msg": "Invalid PAN format. Please try again."}), 400

    # Check if customer already exists by PAN
    existing_customer = Customer.query.filter_by(pan=data['pan']).first()
    if existing_customer:
        return jsonify({"msg": "Customer already exists.", "customer": customer_schema.dump(existing_customer)}), 409

    new_customer = Customer(name=data['name'], pan=data['pan'])
    db.session.add(new_customer)
    db.session.commit()
    return customer_schema.jsonify(new_customer)
