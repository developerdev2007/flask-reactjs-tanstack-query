# from app import ma
# from models import Customer, Product, Subscription

# class CustomerSchema(ma.SQLAlchemyAutoSchema):
#     class Meta:
#         model = Customer
#         load_instance = True

# class ProductSchema(ma.SQLAlchemyAutoSchema):
#     class Meta:
#         model = Product
#         load_instance = True

# class SubscriptionSchema(ma.SQLAlchemyAutoSchema):
#     class Meta:
#         model = Subscription
#         load_instance = True
#         include_fk = True

# # Initialize schemas
# customer_schema = CustomerSchema()
# customers_schema = CustomerSchema(many=True)
# product_schema = ProductSchema()
# products_schema = ProductSchema(many=True)
# subscription_schema = SubscriptionSchema()
# subscriptions_schema = SubscriptionSchema(many=True)
from marshmallow import Schema, fields, validates, ValidationError
import re

class CustomerSchema(Schema):
    customer_id = fields.Str(required=True)
    name = fields.Str(required=True)
    pan = fields.Str(required=True)
    email = fields.Email(required=True)

    @validates('pan')
    def validate_pan(self, value):
        if not re.match('^[A-Z]{5}[0-9]{4}[A-Z]$', value):
            raise ValidationError('Invalid PAN format')

class SubscriptionSchema(Schema):
    customer_id = fields.Str(required=True)
    product_name = fields.Str(required=True)
    subscription_start_date = fields.Date(required=True)
    subscription_end_date = fields.Date(required=True)
    number_of_users = fields.Int(required=True, validate=lambda x: x > 0)