from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates

db = SQLAlchemy()

# USERS (The system has three users: Customer, Restaurant Owner and Admin) 
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    user_id = db.Column(db.Integer, primary_key=True)
    names = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False) 
    phone_number = db.Column(db.String(10), nullable=False)

    restaurants = db.relationship('Restaurant', backref='user')
    orders = db.relationship('CartItem', backref='user')
    carts = db.relationship('CartItem', backref='user')

    def to_dict(self):
        return{
            'user_id': self.user_id,
            'names': self.names,
            'email': self.email,
            'password': self.password_hash,
            'role': self.role,
            'phone_number': self.phone_number,
        }

    def __repr__(self):
        return f'User(user_id={self.user_id}, names={self.names})'
    
    # email validation
    @validates('email')
    def validates_email(self, key, email):
        if '@' not in email:
            raise ValueError("Enter a valid email")
        else:
            return email

    # phone_number validation
    @validates('phone_number')
    def validate_phone_number(self, key, value):
        if value is None:
            raise ValueError('Phone number must not be empty.')
        if not value.isdigit():
            raise ValueError('Phone number must contain only digits.')
        if len(value) != 10:
            raise ValueError('Phone number must contain exactly 10 digits.')
        return value
    
# RESTAURANT
class Restaurant(db.Model, SerializerMixin):
    __tablename__ = 'restaurants'

    restaurant_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', name='fk_user_id_restaurants'))
    restaurant_name = db.Column(db.String(200), nullable=False)
    restaurant_image = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    ambience = db.Column(db.String(100), nullable=False)
    cuisines_offered = db.Column(db.String(200), nullable=False)
    operating_hours = db.Column(db.String(200), nullable=False)
    contact_info = db.Column(db.String(200), nullable=False)


    loyaltyprogram = db.relationship('LoyaltyProgram', backref = 'restaurant', uselist = False)
    promotions = db.relationship('Promotion', backref = 'restaurant')
    menu_items = db.relationship('MenuItem', back_populates='restaurant')
    orders = db.relationship('Order', backref='restaurant')
    # staff_mapping = db.relationship('StaffMapping', back_populates='restaurant')
    # reviews = db.relationship('Review', back_populates='restaurant')
   # customers = db.relationship('Customer', back_populates='restaurant')

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'restaurant_id': self.restaurant_id,
            'restaurant_name': self.restaurant_name,
            'restaurant_image': self.restaurant_image,
            'location': self.location,
            'ambience': self.ambience,
            'cuisines_offered': self.cuisines_offered,
            'contact_info': self.contact_info

        }
    
    def __repr__(self):
        return f'Restaurant(restaurant_id={self.restaurant_id}, restaurant_name={self.restaurant_name})'
    

# MENU ITEMS
class MenuItem(db.Model, SerializerMixin):
    __tablename__ = 'menuitems'

    item_id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.restaurant_id', name='fk_restaurants_id_menu_item'))
    item_name = db.Column(db.String(200), nullable=False)
    item_category = db.Column(db.String(100), nullable=False)
    item_description = db.Column(db.String(500))
    price = db.Column(db.Float, nullable=False)
    customization_options = db.Column(db.String(100), nullable=False)
    restaurant = db.relationship('Restaurant', back_populates='menu_items')
    menu_item = db.relationship('MenuItem', backref='menuitems')
    cartitem = db.relationship('MenuItem', backref='menuitems')

    #restaurant = db.relationship('Restaurant', backref=db.backref('menu_item', lazy=True))

    def __repr__(self):
        return f'MenuItem(item_id={self.item_id}, item_name={self.item_name})'
    
    def to_dict(self):
        return {
            'item_id': self.item_id,
            'restaurant_id': self.restaurant_id,
            'item_name': self.item_name,
            'item_category': self.item_category,
            'item_description': self.item_description,
            'price': self.price,
            'customization_options': self.customization_options,

        }
    
class CartItem(db.Model):
    __tablename__ = 'cartitems'

    cart_item_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', name = 'fk_user_id_cartitems' ))
    item_id = db.Column(db.Integer, db.ForeignKey('menuitems.item_id', name = 'fk_item_id_cartitems'))
    order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id', name = 'fk_order_id_cartitems'))
    quantity = db.Column(db.Integer, nullable=False)

    # Define the relationships
    # user = db.relationship('User', backref='cart_items')
    # item = db.relationship('MenuItem', backref='cart_items')

    def to_dict(self):
        return {
            'cart_item_id': self.cart_item_id,
            'user_id': self.user_id,
            'item_id': self.item_id,
            'quantity': self.quantity
        }


# ORDERS
class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    order_id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.user_id', name = 'fk_user_id_orders'))
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.restaurant_id', name = 'fk_restaurant_id_orders'))
    order_status = db.Column(db.String(100), nullable=False)
    order_total = db.Column(db.Float, nullable=False)
    order_date = db.Column(db.DateTime, nullable=False)

    orderitems = db.relationship('OrderItem', backref='order')
    cart = db.relationship('CartItem', backref='order')

    # payments = db.relationship('PaymentTransaction', back_populates='order')

    def to_dict(self):
        return{
            'order_id': self.order_id,
            'order_status': self.order_status,
            'order_total': self.order_total,
            'order_date': self.order_date,
            
        }

    def __repr__(self):
        return f'Order(order_id={self.order_id}, order_status={self.order_status})'
    
 
# ORDER ITEMS
class OrderItem(db.Model, SerializerMixin):
    __tablename__ = 'orderitems'

    order_item_id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id', name='fk_order_id_orderitems'))
    item_id = db.Column(db.Integer, db.ForeignKey('menuitems.item_id', name = 'fk_item_id_orderitems'))
    quantity = db.Column(db.Integer, nullable=False)
    subtotal = db.Column(db.Float, nullable=False)


    def to_dict(self):
        return{
            'order_item_id': self.order_item_id,
            'quantity': self.quantity,
            'subtotal': self.subtotal,
        }

    def __repr__(self):
        return f'OrderItem(order_item_id={self.order_item_id}, subtotal={self.subtotal})'
    

# PAYMENT TRANSACTIONS
class PaymentTransaction(db.Model, SerializerMixin):
    __tablename__ = 'paymenttransactions'

    transaction_id = db.Column(db.Integer, primary_key=True)
    # order_id = db.Column(db.Integer, db.ForeignKey('orders.order_id'))
    payment_date = db.Column(db.DateTime, nullable=False)
    payment_amount = db.Column(db.Float, nullable=False)
    payment_status = db.Column(db.String(100), nullable=False)

    # order = db.relationship('Order', back_populates='payments')

    def __repr__(self):
        return f'PaymentTransaction(transaction_id={self.transaction_id}, payment_status={self.payment_status})'
    

# REVIEWS
class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    review_id = db.Column(db.Integer, primary_key=True)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.user_id'))
    # restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.restaurant_id'))
    review_text = db.Column(db.Text, nullable=False)
    review_rating = db.Column(db.Integer, nullable=False)

    # restaurant = db.relationship('Restaurant', back_populates='reviews')

    def __repr__(self):
        return f'Review(review_id={self.review_id}, review_text={self.review_text})'
    

# LOYALTY PROGRAM
class LoyaltyProgram(db.Model, SerializerMixin):
    __tablename__ = 'loyaltyprograms'

    loyalty_program_id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.restaurant_id', name='fk_restaurant_id_loyaltyprograms'))
    loyalty_points = db.Column(db.Integer, nullable=False)
    loyalty_tier = db.Column(db.String(100))

    def to_dict(self):
        return{
            'loyalty_program_id': self.loyalty_program_id,
            'loyalty_points': self.loyalty_points,
            'loyalty_tier': self.loyalty_tier

        }

    def __repr__(self):
        return f'LoyaltyProgram(loyalty_program_id={self.loyalty_program_id}, loyalty_points={self.loyalty_points})'
    
    
# PROMOTION
class Promotion(db.Model, SerializerMixin):
    __tablename__ = 'promotions'

    promotion_id = db.Column(db.Integer, primary_key=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.restaurant_id', name='fk_restaurant_id_promotions'))
    promotion_name = db.Column(db.String(200), nullable=False)
    promotion_description = db.Column(db.Text)
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    discount_percentage = db.Column(db.Float, nullable=False)
    active =db.Column(db.Boolean, default=True)

    def to_dict(self):
        return {
            'promotion_id': self.promotion_id,
            'promotion_name': self.promotion_name,
            'promotion_description': self.promotion_description,
            'start_date': self.start_date,
            'end_date': self.end_date,
            'discount_percentage': self.discount_percentage,
            'active': self.active

        }


    def __repr__(self):
        return f'Promotion(promotion_id={self.promotion_id}, promotion_name={self.promotion_name})'
    

# STAFF MAPPING
class StaffMapping(db.Model, SerializerMixin):
    __tablename__ = 'mappings'

    staff_id = db.Column(db.Integer, primary_key=True)
    # restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurants.restaurant_id'))
    staff_name = db.Column(db.String(100), nullable=False)
    staff_role = db.Column(db.String(100), nullable=False)

    # restaurant = db.relationship('Restaurant', back_populates='staff_mapping')

    def __repr__(self):
        return f'StaffMapping(staff_id={self.staff_id}, staff_name={self.staff_name})'
