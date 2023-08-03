from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

# MODELS

# USERS (The system has three users: Customer, Restaurant Owner and Admin) 
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    names = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False) 
    phone_number = db.Column(db.String(15))
    address = db.Column(db.String(200))  

    def __repr__(self):
        return f'User(user_id={self.user_id}, names={self.names})'
    
    

# RESTAURANT

class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'

    restaurant_id = db.Column(db.Integer, primary_key=True)
    restaurant_name = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    ambience = db.Column(db.String(100), nullable=False)
    cuisines_offered = db.Column(db.String(200), nullable=False)
    operating_hours = db.Column(db.String(200), nullable=False)
    contact_info = db.Column(db.String(200), nullable=False)
    
    def __repr__(self):
        return f'Restaurant(restaurant_id={self.restaurant_id}, restaurant_name={self.restaurant_name})'
    

# MENU ITEMS
class MenuItem(db.Model, SerializerMixin):
    __tablename__ = 'menuitems'

    item_id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(200), nullable=False)
    item_category = db.Column(db.String(100), nullable=False)
    item_description = db.Column(db.String(500))
    price = db.Column(db.Float, nullable=False)
    customization_options = db.Column(db.String(100), nullable=False)


    def __repr__(self):
        return f'MenuItem(item_id={self.item_id}, item_name={self.item_name})'
    

# ORDERS
class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    order_id = db.Column(db.Integer, primary_key=True)
    order_status = db.Column(db.String(100), nullable=False)
    order_total = db.Column(db.Float, nullable=False)
    order_date = db.Column(db.DateTime, nullable=False)



    def __repr__(self):
        return f'Order(order_id={self.order_id}, order_status={self.order_status})'
    
 
# ORDER ITEMS
class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'orderitems'

    order_item_id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    subtotal = db.Column(db.Float, nullable=False)


    def __repr__(self):
        return f'OrderItem(order_item_id={self.order_item_id}, subtotal={self.subtotal})'
    

# PAYMENT TRANSACTIONS
class PaymentTransaction(db.Model, SerializerMixin):
    __tablename__ = 'paymenttransactions'

    transaction_id = db.Column(db.Integer, primary_key=True)
    payment_date = db.Column(db.DateTime, nullable=False)
    payment_amount = db.Column(db.Float, nullable=False)
    payment_status = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f'PaymentTransaction(transaction_id={self.transaction_id}, payment_status={self.payment_status})'
    

# REVIEWS
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    review_id = db.Column(db.Integer, primary_key=True)
    review_text = db.Column(db.Text, nullable=False)
    review_rating = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'Review(review_id={self.review_id}, review_text={self.review_text})'
    

# LOYALTY PROGRAM
class LoyaltyProgram(db.Model, SerializerMixin):
    __tablename__ = 'loyaltyprograms'

    loyalty_program_id = db.Column(db.Integer, primary_key=True)
    loyalty_points = db.Column(db.Integer, nullable=False)
    loyalty_tier = db.Column(db.String(100))

    def __repr__(self):
        return f'LoyaltyProgram(loyalty_program_id={self.loyalty_program_id}, loyalty_points={self.loyalty_points})'
    
    
# PROMOTION
class Promotion(db.Model, SerializerMixin):
    __tablename__ = 'promotions'

    promotion_id = db.Column(db.Integer, primary_key=True)
    promotion_name = db.Column(db.String(200), nullable=False)
    promotion_description = db.Column(db.Text)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    discount_amount = db.Column(db.Float, nullable=False)

    def __repr__(self):
        return f'Promotion(promotion_id={self.promotion_id}, promotion_name={self.promotion_name})'
    

# STAFF MAPPING
class StaffMapping(db.Model, SerializerMixin):
    __tablename__ = 'mappings'

    staff_id = db.Column(db.Integer, primary_key=True)
    staff_name = db.Column(db.String(100), nullable=False)
    staff_role = db.Column(db.String(100), nullable=False)


    def __repr__(self):
        return f'StaffMapping(staff_id={self.staff_id}, staff_name={self.staff_name})'
    

