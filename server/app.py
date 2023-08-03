from flask import Flask, request, make_response, jsonify, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Restaurant


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///foodchapchap.db'
app.config['SECRET_KEY'] = '0657b93c995a1d2fbf62c4969a83c7cf' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['DEBUG'] = True
app.json.compact = False

jwt = JWTManager(app)

CORS(app)
migrate = Migrate(app, db)
db.init_app(app)


api = Api(app)

def role_required(allowed_roles):
    def decorator(fn):
        @jwt_required()
        def wrapper(*args, **kwargs):
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            if not user or user.role not in allowed_roles:
                return jsonify({'error': 'Unauthorized'}), 403
            return fn(*args, **kwargs)

        # Set a custom __name__ attribute to avoid overwriting existing endpoint function name
        wrapper.__name__ = f"protected_{fn.__name__}"
        return wrapper
    return decorator


class Index(Resource):
    def get (self):
        response_dict = {
             "index" : "Welcome to FOODCHAPCHAP, a food pre-order service to satisfy ALL your cravings!",
            }

        response = make_response(jsonify(response_dict), 200,)
        return response

api.add_resource(Index, '/')

# SIGNUP ROUTE
@app.route('/signup', methods = ['POST'])
def signup():
    names = request.form['names']
    email = request.form['email']
    password = request.form['password']
    role = request.form['role']
    phone_number = request.form['phone_number']
    address = request.form.get('address') 


    if not names or not email or not password or not role:
        response = make_response(jsonify({"error": "Please provide all required fields"}), 400)
        return response
    
    allowed_roles = ['customer', 'restaurant_owner']

    if role not in allowed_roles:
        response = make_response(jsonify({"error": "Invalid role"}), 400)
        return response
    
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        response = make_response(jsonify({"error": "User with the same email already exists"}), 409)
        return response
    
    new_user = User(
        names = names,
        email = email,
        password_hash=generate_password_hash(password),
        role = role,
        phone_number = phone_number,
        address = address
    )

    db.session.add(new_user) 
    db.session.commit()

    response_dict = new_user.to_dict()

    response = make_response(jsonify(response_dict), 201)
    return response

# LOGIN ROUTE
@app.route('/login', methods = ['POST'])
def login():
    email = request.form['email']
    password = request.form['password']

    # Check if all the required fields are being entered
    if not email or not password:
        response = make_response(jsonify({"error": "Please provide all required fields"}), 400)
        return response
        
    user = User.query.filter_by(email=email).first()

    # Check if the correct fields are being entered
    if not user:
        response = make_response(jsonify({'error': 'Invalid email or password.'}), 401)
        return response
        
    if not check_password_hash(user.password_hash, password):
        response = make_response(jsonify({'error': 'Invalid email or password.'}), 401)
        return response
        

    # Generate the access token using the user's ID as the identity
    access_token = create_access_token(identity=user.user_id)

    response = make_response(jsonify({'message': 'Login successful.', 'access_token': access_token, 'role': user.role}), 200)
    return response

    # response = make_response(jsonify({'message': 'Login successful.'}), 200)
    # return response

# Protected Route
@app.route('/protected')
@role_required(['admin'])
def protected():
    return "Protected"


# ADMIN CRUD
# CREATE RESTAURANT

@app.route('/restaurant', methods=['POST'])
@role_required(['admin'])
def create_restaurant():
    restaurant_name = request.form['restaurant_name']
    restaurant_image = request.form['restaurant_image']
    location = request.form['location']
    ambience = request.form['ambience']
    cuisines_offered = request.form['cuisines_offered']
    operating_hours = request.form['operating_hours']
    contact_info = request.form['contact_info']
    restaurant_owner_user_id = int(request.form['restaurant_owner_user_id'])

    if not restaurant_name or not restaurant_image or not location or not ambience or not cuisines_offered or not operating_hours or not contact_info or not restaurant_owner_user_id:
        response = make_response(jsonify({"error": "Please provide all required fields"}), 400)
        return response
    
    # Check if restaurant with the same name already exists
    existing_restaurant = Restaurant.query.filter_by(restaurant_name=restaurant_name).first()
    if existing_restaurant:
        response = make_response(jsonify({"error": "Restaurant with the same name already exists"}), 409)
        return response
    
    # Check if user id corresponds to an restaurant owner who has already signed up to the web app
    restaurant_owner = User.query.filter_by(user_id=restaurant_owner_user_id, role='restaurant_owner').first()
    if not restaurant_owner:
        response = make_response(jsonify({"error": "Invalid restaurant owner user_id"}), 404)
        return response
    
    new_restaurant = Restaurant(
        restaurant_name=restaurant_name,
        restaurant_image=restaurant_image,
        location=location,
        ambience=ambience,
        cuisines_offered=cuisines_offered,
        operating_hours=operating_hours,
        contact_info=contact_info,
        user=restaurant_owner  
    )

    db.session.add(new_restaurant)
    db.session.commit()

    response_dict = new_restaurant.to_dict()

    response = make_response(jsonify(response_dict), 201)
    return response

# READ RESTAURANT

@app.route('/restaurants', methods=['GET'])
@role_required(['admin', 'customer'])
def get_restaurants():
    restaurants = Restaurant.query.all()

    restaurants_list = [restaurant.to_dict() for restaurant in restaurants]

    response = make_response(jsonify(restaurants_list), 200)
    return response


# UPDATE  AND DELETE RESTAURANT
@app.route('/restaurants/<int:restaurant_id>', methods=['PATCH', 'DELETE'])
@role_required(['admin'])
def ud_restaurant(restaurant_id):
    if request.method == 'PATCH':
        data = request.form
        restaurant = Restaurant.query.get(restaurant_id)

        if not restaurant:
            return jsonify({'error': 'Restaurant not found'}), 404

        if 'restaurant_name' in data:
            restaurant.restaurant_name = data['restaurant_name']
        if 'restaurant_image' in data:
            restaurant.restaurant_image = data['restaurant_image']
        if 'location' in data:
            restaurant.location = data['location']
        if 'ambience' in data:
            restaurant.ambience = data['ambience']
        if 'cuisines_offered' in data:
            restaurant.cuisines_offered = data['cuisines_offered']
        if 'operating_hours' in data:
            restaurant.operating_hours = data['operating_hours']
        if 'contact_info' in data:
            restaurant.contact_info = data['contact_info']
        
        
        db.session.commit()

        response = make_response(jsonify(restaurant.to_dict()), 200)
        return response
    
    elif request.method == 'DELETE':
        restaurant = Restaurant.query.get(restaurant_id)

        if not restaurant:
            response = make_response(jsonify({'error': 'Restaurant not found'}), 404)
            return response

        # Delete the restaurant from the database
        db.session.delete(restaurant)
        db.session.commit()

        response = make_response(jsonify({'message': 'Restaurant deleted successfully'}), 200)
        return response

# # DELETE RESTAURANT
# @app.route('/restaurants/<int:restaurant_id>', methods=['DELETE'])
# @role_required(['admin'])
# def delete_restaurant(restaurant_id):
#     restaurant = Restaurant.query.get(restaurant_id)

#     if not restaurant:
#         response = make_response(jsonify({'error': 'Restaurant not found'}), 404)
#         return response

#     # Delete the restaurant from the database
#     db.session.delete(restaurant)
#     db.session.commit()

#     response = make_response(jsonify({'message': 'Restaurant deleted successfully'}), 200)
#     return response

if __name__ == '__main__':
    app.run(port=5555)