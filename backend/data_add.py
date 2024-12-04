from app import create_app, db
from models import Customer, Product, Subscription
from datetime import date

def seed_data():
    app = create_app()
    with app.app_context():
        # Helper function to avoid duplicates
        def add_unique_customer(name, pan):
            existing_customer = Customer.query.filter_by(pan=pan).first()
            if not existing_customer:
                customer = Customer(name=name, pan=pan)
                db.session.add(customer)
                return customer
            return existing_customer

        def add_unique_product(name, description, cost_per_user):
            existing_product = Product.query.filter_by(name=name).first()
            if not existing_product:
                product = Product(name=name, description=description, cost_per_user=cost_per_user)
                db.session.add(product)
                return product
            return existing_product

        # Add Customers
        customer1 = add_unique_customer("Sita", "ABCDE1234F")
        customer2 = add_unique_customer("Ram", "FGHIJ5678L")

        # Add Products
        product1 = add_unique_product("MacOs", "Powerful OS", 50.0)
        product2 = add_unique_product("Ubuntu", "Power of all OS", 75.0)

        # Commit Customers and Products to DB
        db.session.commit()

        # Add Subscriptions
        subscription1 = Subscription(
            customer_id=customer1.id,
            product_id=product1.id,
            start_date=date(2024, 1, 1),
            end_date=date(2024, 12, 31),
            no_of_users=10
        )
        subscription2 = Subscription(
            customer_id=customer2.id,
            product_id=product2.id,
            start_date=date(2024, 2, 1),
            no_of_users=5
        )

        # Commit Subscriptions to DB
        db.session.add_all([subscription1, subscription2])
        db.session.commit()

        print("Dummy data added successfully!")

if __name__ == "__main__":
    seed_data()
