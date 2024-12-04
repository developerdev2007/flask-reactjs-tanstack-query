from flask import Blueprint, request, jsonify
from models import Product
from schemas import product_schema, products_schema
from app import db

bp = Blueprint('products', __name__)

@bp.route('/', methods=['GET'])
def get_products():
    products = Product.query.all()
    return products_schema.jsonify(products)

@bp.route('/', methods=['POST'])
def add_product():
    data = request.json
    new_product = Product(name=data['name'], description=data['description'], cost_per_user=data['cost_per_user'])
    db.session.add(new_product)
    db.session.commit()
    return product_schema.jsonify(new_product)
