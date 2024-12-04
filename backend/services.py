from models import db, Customer, Product, Subscription
from datetime import date
from sqlalchemy import func

class SubscriptionService:
    @staticmethod
    def get_active_subscription(customer_id, product_name):
        return Subscription.query.filter(
            Subscription.customer_id == customer_id,
            Subscription.product_name == product_name,
            Subscription.subscription_end_date >= date.today(),
            Subscription.status == 'active'
        ).first()

    @staticmethod
    def create_subscription(data):
        subscription = Subscription(**data)
        db.session.add(subscription)
        db.session.commit()
        return subscription

    @staticmethod
    def extend_subscription(subscription_id, new_end_date):
        subscription = Subscription.query.get_or_404(subscription_id)
        subscription.subscription_end_date = new_end_date
        subscription.updated_at = datetime.utcnow()
        db.session.commit()
        return subscription

    @staticmethod
    def end_subscription(subscription_id):
        subscription = Subscription.query.get_or_404(subscription_id)
        subscription.subscription_end_date = date.today()
        subscription.status = 'cancelled'
        subscription.updated_at = datetime.utcnow()
        db.session.commit()
        return subscription

    @staticmethod
    def calculate_revenue():
        revenue_data = db.session.query(
            Product.product_name,
            func.sum(Product.annual_subscription_cost * Subscription.number_of_users).label('total_revenue'),
            func.count(Subscription.id).label('total_subscriptions')
        ).join(Subscription).group_by(Product.product_name).all()
        
        return [
            {
                'product_name': row[0],
                'total_revenue': float(row[1]),
                'total_subscriptions': row[2]
            }
            for row in revenue_data
        ]