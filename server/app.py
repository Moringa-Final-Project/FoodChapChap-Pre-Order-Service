from flask import Flask, request, make_response, jsonify, session
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///foodchapchap.db'
app.config['SECRET_KEY'] = '0657b93c995a1d2fbf62c4969a83c7cf' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

jwt = JWTManager(app)

migrate = Migrate(app, db)
db.init_app(app)


api = Api(app)

def role_required(role):
    def decorator(fn):
        @jwt_required()
        def wrapper(*args, **kwargs):
            current_user_id = get_jwt_identity()
            user = User.query.get(current_user_id)
            allowed_roles = ['customer', 'restaurant_owner', 'admin']
            if not user or user.role not in allowed_roles:
                return jsonify({'error': 'Unauthorized'}), 403
            return fn(*args, **kwargs)
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
    address = request.form['address'] 


    if not names or not email or not password or not role:
        response = make_response(jsonify({"error": "Please provide all required fields"}), 400)
        return response
    
    allowed_roles = ['customer', 'restaurant_owner', 'admin']

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


@app.route('/protected')
@role_required(['customer', 'admin'])
def protected():
    return "Protected"





if __name__ == '__main__':
    app.run(port=5555)