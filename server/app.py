from flask import Flask, request, make_response, jsonify, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from models import db, Customer, Admin, Restaurant, MenuItem, Order, OrderItem, PaymentTransaction, Review, LoyaltyProgram, Promotion, StaffMapping

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///foodchapchap.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)
db.init_app(app)

api = Api(app)

# INDEX ROUTE
# @app.route('/')
# def index():
#     return "Index For FOODCHAPCHAP"

class Index(Resource):
    def get (self):
        response_dict = {
             "index" : "Welcome to FOODCHAPCHAP, a food pre-order service to satisfy ALL your cravings!",
            }

        response = make_response(jsonify(response_dict), 200,)
        return response

api.add_resource(Index, '/')


# CUSTOMERS
# Signup
class CustomerSignup(Resource):
    def post(self):
        customer_name = request.form['customer_name']
        customer_email = request.form['customer_email']
        customer_password = request.form['customer_password']
        phone_number = request.form['phone_number']
        address = request.form['address']
         
        # Check if all the required fields are being entered
        if not customer_name or not customer_email or not customer_password:
            response = make_response(jsonify({"error": "Please provide all required fields"}), 400)
            return response

        # Check if the customer with the same email already exists
        existing_customer = Customer.query.filter_by(customer_email=customer_email).first()
        if existing_customer:
            response = make_response(jsonify({"error": "Customer with the same email already exists"}), 409)
            return response
        
        new_customer = Customer(
            customer_name=customer_name,
            customer_email=customer_email,
            customer_password=customer_password,
            phone_number=phone_number,
            address=address,
        )

        db.session.add(new_customer) 
        db.session.commit()

        response_dict = new_customer.to_dict()

        response = make_response(jsonify(response_dict), 201)
        return response

api.add_resource(CustomerSignup, '/customersignup')

# Login
class CustomerLogin(Resource):
    def post(self): 
        customer_email = request.form['customer_email']
        customer_password = request.form['customer_password']

        # Check if all the required fields are being entered
        if not customer_email or not customer_password:
            response = make_response(jsonify({"error": "Please provide all required fields"}), 400)
            return response
        
        customer = Customer.query.filter_by(customer_email=customer_email).first()

        # Check if the correct fields are being entered
        if not customer:
            response = make_response(jsonify({'error': 'Invalid email or password.'}), 401)
            return response
        
        if customer.customer_password != customer_password:
            response = make_response(jsonify({'error': 'Invalid email or password.'}), 401)
            return response
        
        response = make_response(jsonify({'message': 'Login successful.'}), 200)
        return response
    
api.add_resource(CustomerLogin, '/customerlogin')


#RESTAURANT
# Signup

class RestaurantSignup(Resource):
    def post(self):
        restaurant_name = request.form['restaurant_name']
        restaurant_email = request.form['restaurant_email']
        restaurant_password = request.form['restaurant_password']
        location = request.form['location']
        ambience = request.form['ambience']
        cuisines_offered = request.form['cuisines_offered']
        operating_hours = request.form['operating_hours']
        contact_info = request.form['contact_info']

        # Check if all the required fields are being entered
        if not restaurant_name or not restaurant_email or not restaurant_password:
            response = make_response(jsonify({"error": "Please provide all required fields"}), 400)
            return response
        
        # Check if the customer with the same email already exists
        existing_restaurant = Restaurant.query.filter_by(restaurant_email=restaurant_email).first()

        if existing_restaurant:
            response = make_response(jsonify({"error": "Restaurant with the same email already exists"}), 409)
            return response
        
        new_restaurant = Restaurant(
            restaurant_name = restaurant_name,
            restaurant_email = restaurant_email,
            restaurant_password = restaurant_password,
            location = location,
            ambience= ambience,
            cuisines_offered = cuisines_offered,
            operating_hours = operating_hours,
            contact_info = contact_info,
        )

        db.session.add(new_restaurant) 
        db.session.commit()

        response_dict = new_restaurant.to_dict()

        response = make_response(jsonify(response_dict), 201)
        return response
        
api.add_resource(RestaurantSignup, '/restaurantsignup')

# Login
class RestaurantLogin(Resource):
    def post(self): 
        restaurant_email = request.form['restaurant_email']
        restaurant_password = request.form['restaurant_password']

        # Check if all the required fields are being entered
        if not restaurant_email or not restaurant_password:
            response = make_response(jsonify({"error": "Please provide all required fields"}), 400)
            return response
        
        restaurant = Restaurant.query.filter_by(restaurant_email=restaurant_email).first()

        # Check if the correct fields are being entered
        if not restaurant:
            response = make_response(jsonify({'error': 'Invalid email or password.'}), 401)
            return response
        
        if restaurant.restaurant_password != restaurant_password:
            response = make_response(jsonify({'error': 'Invalid email or password.'}), 401)
            return response
        
        response = make_response(jsonify({'message': 'Login successful.'}), 200)
        return response
    
api.add_resource(RestaurantLogin, '/restaurantlogin')



if __name__ == '__main__':
    app.run(port=5555)


