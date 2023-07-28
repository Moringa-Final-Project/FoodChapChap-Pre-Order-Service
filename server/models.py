from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin

db = SQLAlchemy()

# MODELS

# ADMIN
class Admin(db.Model, SerializerMixin):
    __tablename__ = 'admins'

    admin_id = db.Column(db.Integer, primary_key=True)
    admin_username = db.Column(db.String(100), nullable=False, unique=True)
    admin_email = db.Column(db.String(120), nullable=False, unique=True)
    admin_password = db.Column(db.String(255), nullable=False)
    customers = db.relationship('Customer', back_populates='admin')
    restaurants = db.relationship('Restaurant', back_populates='admin')

    serialize_rules = ('-customers.admin', '-restaurants.admin',)

    def __repr__(self):
        return f'Admin(admin_id={self.admin_id}, admin_email={self.admin_email})'


# ASSOCIATION TABLE CUSTOMER TO REVIEW
customer_review_association = db.Table(
    'customer_reviews',
    db.Column('customer_id', db.Integer, db.ForeignKey('customers.customer_id'), primary_key=True),
    db.Column('review_id', db.Integer, db.ForeignKey('reviews.review_id'), primary_key=True)
)

# CUSTOMER
class Customer(db.Model, SerializerMixin):
    __tablename__ = 'customers'

    customer_id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer, db.ForeignKey('admins.admin_id'), nullable=False)
    customer_username = db.Column(db.String(100), nullable=False, unique=True)
    customer_email = db.Column(db.String(120), nullable=False, unique=True)
    customer_password = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(20))
    address = db.Column(db.String(200))
    orders = db.relationship('Order', back_populates = 'customer')
    loyalty_programs = db.Relationship('LoyaltyProgram', back_populates = 'customer')

    serialize_rules = ('-admin.customers', '-orders.customer', '-loyalty_programs.customer',)

    def __repr__(self):
        return f'Customer(customer_id={self.customer_id}, customer_email={self.customer_email})'
    
    
# ASSOCIATION TABLE RESTAURANT TO PROMOTION
restaurant_promotion_association = db.Table(
    'restaurant_promotions',
    db.Column('restaurant_id', db.Integer, db.ForeignKey('restaurants.restaurant_id'), primary_key=True),
    db.Column('promotion_id', db.Integer, db.ForeignKey('promotions.promotion_id'), primary_key=True)
)

# RESTAURANT

class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'

    restaurant_id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer, db.ForeignKey('admins.admin_id'), nullable=False)
    restaurant_name = db.Column(db.String(200), nullable=False)
    restaurant_email = db.Column(db.String(120), nullable=False, unique=True)
    restaurant_password = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    ambience = db.Column(db.String(100), nullable=False)
    cuisines_offered = db.Column(db.String(200), nullable=False)
    operating_hours = db.Column(db.String(200), nullable=False)
    contact_info = db.Column(db.String(200), nullable=False)
    orders = db.relationship('Order', back_populates = 'restaurant')
    reviews = db.Relationship('Review', back_populates = 'restaurant')
    menuitems = db.Relationship('MenuItem', back_populates = 'restaurant')
    staff_mappings = db.Relationship('StaffMapping', back_populates = 'restaurant') 
    promotions = db.relationship('Promotion', secondary=restaurant_promotion_association, back_populates='restaurants')
    
    serialize_rules = ('-admin.restaurants', '-menuitems.restaurant', '-staff_mappings.restaurant', '-reviews.restaurant', '-orders.restaurant',)

    def __repr__(self):
        return f'Restaurant(restaurant_id={self.restaurant_id}, restaurant_name={self.restaurant_name})'
    

# MENU ITEMS
class MenuItem(db.Model, SerializerMixin):
    __tablename__ = 'menuitems'

    item_id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.restaurant_id'), nullable = False)
    item_name = db.Column(db.String(200), nullable=False)
    item_category = db.Column(db.String(100), nullable=False)
    item_description = db.Column(db.String(500))
    price = db.Column(db.Float, nullable=False)

    serialize_rules = ('-restaurant.menuitems',)

    def __repr__(self):
        return f'MenuItem(item_id={self.item_id}, item_name={self.item_name})'
    

# ORDERS
class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    order_id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.restaurant_id'), nullable = False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable = False)
    order_status = db.Column(db.String(100), nullable=False)
    order_total = db.Column(db.Float, nullable=False)
    order_date = db.Column(db.DateTime, nullable=False)
    order_items = db.Relationship('OrderItem', back_populates ='order')
    payment_transaction = db.relationship('PaymentTransaction', back_populates='order')

    serialize_rules = ('-restaurant.orders', '-customer.orders', '-order_items.order',)

    def __repr__(self):
        return f'Order(order_id={self.order_id}, order_status={self.order_status})'
    
 
# ORDER ITEMS
class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'orderitems'

    order_item_id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id'), nullable = False)
    quantity = db.Column(db.Integer, nullable=False)
    subtotal = db.Column(db.Float, nullable=False)

    serialize_rules =('-order.order_items',)

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
    admin_id = db.Column(db.Integer, db.ForeignKey('admins.admin_id'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.restaurant_id'), nullable=False)
    review_text = db.Column(db.Text, nullable=False)
    review_rating = db.Column(db.Integer, nullable=False)
    reviews = db.relationship('Review', secondary=customer_review_association, back_populates='customers')

    serialize_rules =('-restaurant.reviews',)

    def __repr__(self):
        return f'Review(review_id={self.review_id}, review_text={self.review_text})'
    

# LOYALTY PROGRAM
class LoyaltyProgram(db.Model, SerializerMixin):
    __tablename__ = 'loyaltyprograms'

    loyalty_program_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable=False)
    loyalty_points = db.Column(db.Integer, nullable=False)
    loyalty_tier = db.Column(db.String(100))

    serialize_rules =('-customer.loyalty_programs',)

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
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.restaurant_id'), nullable = False)
    staff_name = db.Column(db.String(100), nullable=False)
    staff_role = db.Column(db.String(100), nullable=False)

    serialize_rules =('-restaurant.staff_mapping',)

    def __repr__(self):
        return f'StaffMapping(staff_id={self.staff_id}, staff_name={self.staff_name})'
    



    