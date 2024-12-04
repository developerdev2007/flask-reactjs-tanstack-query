from flask import Blueprint, request, jsonify
from extensions import db#+
from models import Subscription
from schemas import subscription_schema, subscriptions_schema
from app import db
from datetime import datetime

bp = Blueprint('subscriptions', __name__)

@bp.route('/', methods=['GET'])
def get_subscriptions():
    subscriptions = Subscription.query.all()
    return subscriptions_schema.jsonify(subscriptions)

@bp.route('/add', methods=['POST'])#+
def add_subscription():
    # Get the data from the request
    data = request.json
    # Validate if there's an active subscription#+
    active_subscription = Subscription.query.filter_by(#+
        customer_id=data['customer_id'],#+
        product_id=data['product_id'],#+
        end_date=None#+
    ).first()#+
    if active_subscription:#+
        return jsonify({'error': 'Active subscription already exists'}), 400#+

    # Parse the start_date and end_date into datetime objects (or None if missing)
    start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()

    # Check if 'end_date' is provided, otherwise set it to None
    end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date() if data.get('end_date') else None

    # Create a new subscription object
    new_subscription = Subscription(
        customer_id=data['customer_id'],
        product_id=data['product_id'],
        start_date=start_date,
        end_date=end_date,
        no_of_users=data['no_of_users'],
        num_users=data['num_users']#+
    )

    # Add the subscription to the database and commit the session
    db.session.add(new_subscription)
    db.session.commit()
    return jsonify({'message': 'Subscription added successfully'}), 201#+

    # Return the new subscription in the response
    return subscription_schema.jsonify(new_subscription)
@bp.route('/<int:id>/end', methods=['PATCH'])
def end_subscription(id):
    subscription = Subscription.query.get_or_404(id)
    subscription.end_date = date.today()
@bp.route('/extend/<int:subscription_id>', methods=['PUT'])#+
def extend_subscription(subscription_id):#+
    data = request.json#+
    subscription = Subscription.query.get_or_404(subscription_id)#+
    subscription.end_date = data['end_date']#+
    db.session.commit()
    return subscription_schema.jsonify(subscription)
    return jsonify({'message': 'Subscription extended successfully'}), 200#+
#+
@bp.route('/end/<int:subscription_id>', methods=['PUT'])#+
def end_subscription(subscription_id):#+
    subscription = Subscription.query.get_or_404(subscription_id)#+
    subscription.end_date = db.func.current_date()#+
    db.session.commit()#+
    return jsonify({'message': 'Subscription ended successfully'}), 200#+
#+
@bp.route('/revenue', methods=['GET'])#+
def revenue_report():#+
    # Implement logic to calculate revenue#+
    revenue = 0  # Placeholder for actual revenue calculation#+
    return jsonify({'revenue': revenue}), 200#+
