# from flask import Blueprint, request, jsonify
# from flask_jwt_extended import jwt_required
# from marshmallow import ValidationError
# from services import SubscriptionService
# from schemas import SubscriptionSchema
# import logging

# api = Blueprint('api', __name__)
# logger = logging.getLogger(__name__)

# @api.route('/subscriptions', methods=['POST'])
# @jwt_required
# def create_subscription():
#     try:
#         schema = SubscriptionSchema()
#         data = schema.load(request.json)
        
#         # Check for active subscription
#         existing = SubscriptionService.get_active_subscription(
#             data['customer_id'], 
#             data['product_name']
#         )
        
#         if existing:
#             return jsonify({
#                 'error': 'Active subscription already exists'
#             }), 400

#         subscription = SubscriptionService.create_subscription(data)
#         return jsonify(subscription.to_dict()), 201

#     except ValidationError as e:
#         return jsonify({'error': 'Validation error', 'details': e.messages}), 400
#     except Exception as e:
#         logger.error(f"Error creating subscription: {str(e)}")
#         return jsonify({'error': 'Internal server error'}), 500

# @api.route('/subscriptions/<int:subscription_id>/extend', methods=['PUT'])
# @jwt_required
# def extend_subscription(subscription_id):
#     try:
#         if 'end_date' not in request.json:
#             return jsonify({'error': 'end_date is required'}), 400

#         subscription = SubscriptionService.extend_subscription(
#             subscription_id,
#             request.json['end_date']
#         )
#         return jsonify(subscription.to_dict())

#     except Exception as e:
#         logger.error(f"Error extending subscription: {str(e)}")
#         return jsonify({'error': 'Internal server error'}), 500

# @api.route('/subscriptions/<int:subscription_id>/end', methods=['PUT'])
# @jwt_required
# def end_subscription(subscription_id):
#     try:
#         subscription = SubscriptionService.end_subscription(subscription_id)
#         return jsonify(subscription.to_dict())

#     except Exception as e:
#         logger.error(f"Error ending subscription: {str(e)}")
#         return jsonify({'error': 'Internal server error'}), 500

# @api.route('/revenue', methods=['GET'])
# @jwt_required
# def get_revenue():
#     try:
#         revenue_data = SubscriptionService.calculate_revenue()
#         return jsonify(revenue_data)

#     except Exception as e:
#         logger.error(f"Error calculating revenue: {str(e)}")
#         return jsonify({'error': 'Internal server error'}), 500
