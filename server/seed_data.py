from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect
from models import db
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///foodchapchap.db'
app.config['SECRET_KEY'] = '0657b93c995a1d2fbf62c4969a83c7cf' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
app.json.compact = False

db.init_app(app)

from models import User, Restaurant, MenuItem, Order, OrderItem, PaymentTransaction, Review, LoyaltyProgram, Promotion, StaffMapping


# Seed data for Users
users_data = [
    {
        'names': 'John Doe',
        'email': 'john@example.com',
        'password_hash': 'hashed_password_1',
        'role': 'Customer',
        'image': 'user1.jpg',
        'phone_number': '1234567890'
    },
    {
        'names': 'Jane Smith',
        'email': 'jane@example.com',
        'password_hash': 'hashed_password_2',
        'role': 'Restaurant Owner',
        'image': 'user2.jpg',
        'phone_number': '9876543210'
    },
    {
        'names': 'Admin User',
        'email': 'admin@example.com',
        'password_hash': 'hashed_password_3',
        'role': 'Admin',
        'image': 'admin.jpg',
        'phone_number': '5555555555'
    }
]

# Seed data for Restaurants
restaurants_data = [
    {
        'user_id': 2,
        'restaurant_name': 'Delicious Bites',
        'restaurant_image': 'restaurant1.jpg',
        'location': '123 Main Street, City',
        'ambience': 'Cozy and Relaxed',
        'cuisines_offered': 'Italian, American',
        'operating_hours': '10:00 AM - 10:00 PM',
        'contact_info': 'contact@deliciousbites.com'
    },
    {
        'user_id': 2,
        'restaurant_name': 'Spicy Sizzlers',
        'restaurant_image': 'restaurant2.jpg',
        'location': '456 Park Avenue, Town',
        'ambience': 'Vibrant and Energetic',
        'cuisines_offered': 'Indian, Chinese',
        'operating_hours': '11:30 AM - 11:00 PM',
        'contact_info': 'info@spicysizzlers.com'
    }
]

# Seed data for Menu Items
menu_items_data = [
    {
        'restaurant_id': 1,
        'item_name': 'Margherita Pizza',
        'item_category': 'Pizza',
        'item_description': 'Classic tomato, mozzarella, and basil pizza',
        'price': 10.99,
        'customization_options': 'Gluten-free, Extra Cheese'
    },
    {
        'restaurant_id': 1,
        'item_name': 'Chicken Alfredo',
        'item_category': 'Pasta',
        'item_description': 'Creamy fettuccine pasta with grilled chicken',
        'price': 12.99,
        'customization_options': 'Spicy, Vegetarian Option'
    },
    {
        'restaurant_id': 2,
        'item_name': 'Butter Chicken',
        'item_category': 'Curry',
        'item_description': 'Tender chicken in rich tomato-based gravy',
        'price': 14.99,
        'customization_options': 'Extra Spicy, Vegan Option'
    }
]

# Seed data for Orders
orders_data = [
    {
        'user_id': 1,
        'restaurant_id': 1,
        'order_status': 'Completed',
        'order_total': 23.98,
        'order_date': '2023-08-04 12:30:00'
    },
    {
        'user_id': 1,
        'restaurant_id': 2,
        'order_status': 'Pending',
        'order_total': 14.99,
        'order_date': '2023-08-04 18:15:00'
    }
]

# Seed data for Order Items
order_items_data = [
    {
        'order_id': 1,
        'item_id': 1,
        'quantity': 2,
        'subtotal': 21.98
    },
    {
        'order_id': 2,
        'item_id': 3,
        'quantity': 1,
        'subtotal': 14.99
    }
]

# Seed data for Reviews
reviews_data = [
    {
        'user_id': 1,
        'restaurant_id': 1,
        'review_text': 'Great food and excellent service!',
        'review_rating': 5
    },
    {
        'user_id': 1,
        'restaurant_id': 2,
        'review_text': 'The butter chicken was delicious!',
        'review_rating': 4
    }
]

# Seed data for Loyalty Programs
loyalty_programs_data = [
    {
        'customer_id': 1,
        'loyalty_points': 100,
        'loyalty_tier': 'Silver'
    }
]

# Seed data for Promotions
promotions_data = [
    {
        'restaurant_id': 1,
        'promotion_name': 'Weekend Special',
        'promotion_description': 'Get 10% off on all orders over $30',
        'start_date': datetime(2023, 8, 5),
        'end_date': datetime(2023, 8, 7),
        'discount_amount': 10.0
    },
    {
        'restaurant_id': 2,
        'promotion_name': 'Lunch Combo',
        'promotion_description': 'Enjoy a combo meal at discounted price',
        'start_date': datetime(2023, 8, 4),
        'end_date': datetime(2023, 8, 10),
        'discount_amount': 5.0
    }
]

# Seed data for Staff Mapping
staff_mapping_data = [
    {
        'restaurant_id': 1,
        'staff_name': 'Michael',
        'staff_role': 'Chef'
    },
    {
        'restaurant_id': 2,
        'staff_name': 'Sarah',
        'staff_role': 'Server'
    }
]

payment_transactions_data = [
    {
        'order_id': 1,
        'payment_date': datetime(2023, 8, 4, 15, 30),  
        'payment_amount': 23.98,
        'payment_status': 'Completed'
    },
    {
        'order_id': 2,
        'payment_date': datetime(2023, 8, 4, 19, 45), 
        'payment_amount': 14.99,
        'payment_status': 'Pending'
    }
]

# Function to seed the database with the data
def seed_data():
    # Add Users
    for user_data in users_data:
        user = User(**user_data)
        db.session.add(user)
    
    # Add Restaurants
    for restaurant_data in restaurants_data:
        restaurant = Restaurant(**restaurant_data)
        db.session.add(restaurant)
    
    # Add Menu Items
    for menu_item_data in menu_items_data:
        menu_item = MenuItem(**menu_item_data)
        db.session.add(menu_item)
    
    # Add Orders
    for order_data in orders_data:
        order_data['order_date'] = datetime.strptime(order_data['order_date'], '%Y-%m-%d %H:%M:%S')
        order = Order(**order_data)
        db.session.add(order)
    
    # Add Order Items
    for order_item_data in order_items_data:
        order_item = OrderItem(**order_item_data)
        db.session.add(order_item)
    
    # Add Reviews
    for review_data in reviews_data:
        review = Review(**review_data)
        db.session.add(review)
    
    # Add Loyalty Programs
    for loyalty_program_data in loyalty_programs_data:
        loyalty_program = LoyaltyProgram(**loyalty_program_data)
        db.session.add(loyalty_program)
    
    # Add Promotions
    for promotion_data in promotions_data:
        promotion = Promotion(**promotion_data)
        db.session.add(promotion)
    
    # Add Staff Mapping
    for staff_mapping_datas in staff_mapping_data:
        staff_mapping = StaffMapping(**staff_mapping_datas)
        db.session.add(staff_mapping)
    
    for payment_data in payment_transactions_data:
        payment_transaction = PaymentTransaction(**payment_data)
        db.session.add(payment_transaction)
    
    # Commit changes to the database
    db.session.commit()

def list_tables():
    inspector = inspect(db.engine)
    tables = inspector.get_table_names()
    print("List of tables:")
    for table in tables:
        print(table)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        seed_data()
        #list_tables()
