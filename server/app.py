from flask import Flask, request, make_response, jsonify, session
from datetime import datetime
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Restaurant, LoyaltyProgram, MenuItem, Promotion, StaffMapping



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
    data = request.json
    names = data.get('names')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role')
    phone_number = data.get('phone_number')


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
        phone_number = phone_number
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


# Protected Route
@app.route('/protected')
@role_required(['admin'])
def protected():
    return "Protected"


# ADMIN
# ADMIN CRUD
# CREATE RESTAURANT

@app.route('/restaurant', methods=['POST'])
@role_required(['admin'])
def create_restaurant():
    data = request.json

    restaurant_name = data.get('restaurant_name')
    restaurant_image = data.get('restaurant_image')
    location = data.get('location')
    ambience = data.get('ambience')
    cuisines_offered = data.get('cuisines_offered')
    operating_hours = data.get('operating_hours')
    contact_info = data.get('contact_info')
    restaurant_owner_user_id = data.get('restaurant_owner_user_id')

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
@app.route('/restaurants/details', methods=['GET'])
@role_required(['customer'])
def get_restaurant_details_with_active_promotion():
    restaurants = Restaurant.query.all()

    restaurant_list = []
    for restaurant in restaurants:
        restaurant_data = restaurant.to_dict()
        
        active_promotion = Promotion.query.filter_by(restaurant_id=restaurant.restaurant_id, active=True).first()
        if active_promotion:
            restaurant_data['offers'] = active_promotion.promotion_description
        else:
            restaurant_data.pop('offers', None)  
        
        restaurant_list.append(restaurant_data)

    response = make_response(jsonify(restaurant_list), 200)
    return response



# UPDATE  AND DELETE RESTAURANT
@app.route('/restaurants/<int:restaurant_id>', methods=['PATCH', 'DELETE'])
@role_required(['admin'])
def ud_restaurant(restaurant_id):
    if request.method == 'PATCH':
        data = request.json
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

# ADMIN REPORTS
# READ CUSTOMERS
@app.route('/customers', methods=['GET'])
@role_required(['admin'])
def get_all_customers():
    customers = User.query.filter_by(role='customer').all()
    customer_list = [customer.to_dict() for customer in customers]

    response = make_response(jsonify(customer_list), 200)
    return response

# READ RESTAURANT_OWNERS
@app.route('/restaurant_owners', methods=['GET'])
@role_required(['admin'])
def get_all_restaurant_owners():
    restaurant_owners = User.query.filter_by(role='restaurant_owner').all()
    restaurant_owner_list = [owner.to_dict() for owner in restaurant_owners]

    response = make_response(jsonify(restaurant_owner_list), 200)
    return response

# MENUITEMS
# CREATE
@app.route('/menu', methods=['POST'])
@role_required(['admin'])
def create_menu_item():
    data = request.get_json()
    if not data:
        return jsonify({'message': 'Invalid input data.'}), 400
        
    restaurant_id = data.get('restaurant_id')
    if restaurant_id is None:
        return jsonify({'message': 'Restaurant ID is required.'}), 400
        
    restaurant = Restaurant.query.get(restaurant_id)
    if restaurant is None:
        return jsonify({'message': 'Restaurant not found.'}), 404
        
    new_menu_item = MenuItem(
        restaurant_id=restaurant_id,
        item_name=data['item_name'],
        item_image=data['item_image'],  # Ensure to provide the item image URL
        item_description=data['item_description'],
        price=data['price']
    )
    
    db.session.add(new_menu_item)
    db.session.commit()
    
    return jsonify({'message': 'Menu item created successfully.'}), 201


# READ
@app.route('/menu/<int:restaurant_id>/', methods=['GET'])
@role_required(['admin', 'customer'])
def get_menu_items(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    if restaurant is None:
        return jsonify({'message': 'Restaurant not found.'}), 404
        
    menu_items = MenuItem.query.filter_by(restaurant_id=restaurant_id).all()
    
    menu_items_data = [item.to_dict() for item in menu_items]
    
    return jsonify({'menu_items': menu_items_data}, 200)

# UPDATE AND DELETE
@app.route('/menu/<int:item_id>/', methods=['PATCH', 'DELETE'])
@role_required(['admin'])
def update_menu_item(item_id):
    if request.method == 'PATCH': 
        data = request.get_json()
        if not data:
            return jsonify({'message': 'Invalid input data.'}), 400
            
        menu_item = MenuItem.query.get(item_id)
        if menu_item is None:
            return jsonify({'message': 'Menu item not found.'}), 404
        
        if 'item_name' in data:
            menu_item.item_name = data['item_name']
        if 'item_image' in data:
            menu_item.item_image = data['item_image']
        if 'item_description' in data:
            menu_item.item_description = data['item_description']
        if 'price' in data:
            menu_item.price = data['price']
        
        db.session.commit()
        
        return jsonify({'message': 'Menu item updated successfully.'})
    
    elif request.method == 'DELETE':
        menu_item = MenuItem.query.get(item_id)
        if menu_item is None:
            return jsonify({'message': 'Menu item not found.'}), 404
        
        db.session.delete(menu_item)
        db.session.commit()
        
        return jsonify({'message': 'Menu item deleted successfully.'})


      
# LOYALTYPROGRAM CRUD
# CREATE
@app.route('/restaurants/<int:restaurant_id>/loyalty_programs', methods=['POST'])
@role_required(['restaurant_owner'])
def loyalty_program(restaurant_id):
        
    data = request.json

    restaurant = Restaurant.query.get(restaurant_id)
    if not restaurant:
        response = make_response(jsonify({'error': 'Restaurant not found'}), 404)
        return response

    loyalty_program = LoyaltyProgram(
        restaurant_id=restaurant_id,
        loyalty_points=data['loyalty_points'],
        loyalty_tier=data['loyalty_tier']
    )

    db.session.add(loyalty_program)
    db.session.commit()

    response = make_response(jsonify(loyalty_program.to_dict()), 201)
    return response
    

# READ
@app.route('/restaurants/<int:restaurant_id>/loyalty_programs', methods=['GET'])
@role_required(['restaurant_owner', 'customer'])
def get_loyalty_program(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    if not restaurant:
        response = make_response(jsonify({'error': 'Restaurant not found'}), 404)
        return response

    loyalty_programs = LoyaltyProgram.query.filter_by(restaurant_id=restaurant_id).all()
    if not loyalty_programs:
        response = make_response(jsonify({'message': 'Loyalty program not found'}), 404)
        return response

    loyalty_programs_data = [loyalty_program.to_dict() for loyalty_program in loyalty_programs]

    response = make_response(jsonify(loyalty_programs_data), 200)
    return response

# UPDATE and DELETE
@app.route('/restaurants/<int:restaurant_id>/loyalty_programs/<int:loyalty_program_id>', methods=['PATCH', 'DELETE'])
@role_required(['restaurant_owner'])
def ud_loyalty_program(restaurant_id, loyalty_program_id):
    if request.method == 'PATCH':
        restaurant = Restaurant.query.get(restaurant_id)
        if not restaurant:
            response = make_response(jsonify({'error': 'Restaurant not found'}), 404)
            return response

        loyalty_program = LoyaltyProgram.query.filter_by(restaurant_id=restaurant_id, loyalty_program_id=loyalty_program_id).first()
        if not loyalty_program:
            response = make_response(jsonify({'error': 'Loyalty program not found'}), 404)
            return response

        data = request.json

        if 'loyalty_points' in data:
            loyalty_program.loyalty_points = data['loyalty_points']
        if 'loyalty_tier' in data:
            loyalty_program.loyalty_tier = data['loyalty_tier']

        db.session.commit()

        response = make_response(jsonify(loyalty_program.to_dict()), 200)
        return response
    
    elif request.method == 'DELETE':
        restaurant = Restaurant.query.get(restaurant_id)
        if not restaurant:
            response = make_response(jsonify({'error': 'Restaurant not found'}), 404)
            return response

        loyalty_program = LoyaltyProgram.query.filter_by(restaurant_id=restaurant_id, loyalty_program_id=loyalty_program_id).first()
        if not loyalty_program:
            response = make_response(jsonify({'error': 'Loyalty program not found'}), 404)
            return response

        # Delete the loyalty program from the database
        db.session.delete(loyalty_program)
        db.session.commit()

        response = make_response(jsonify({'message': 'Loyalty program deleted successfully'}), 200)
        return response    

# PROMOTIONS CRUD
# CREATE
@app.route('/restaurants/<int:restaurant_id>/promotions', methods=['POST'])
@role_required(['restaurant_owner'])
def create_promotion(restaurant_id):
    data = request.json

    promotion_name = data.get('promotion_name')
    promotion_description = data.get('promotion_description')
    start_date = datetime.strptime(data.get('start_date'), '%Y-%m-%d %H:%M:%S')
    end_date = datetime.strptime(data.get('end_date'), '%Y-%m-%d %H:%M:%S')
    discount_percentage = float(data.get('discount_percentage'))
    active = data.get('active', True)

    restaurant = Restaurant.query.get(restaurant_id)
    if not restaurant:
        response = make_response(jsonify({'error': 'Restaurant not found'}), 404)
        return response

    new_promotion = Promotion(
        restaurant_id=restaurant_id,
        promotion_name=promotion_name,
        promotion_description=promotion_description,
        start_date=start_date,
        end_date=end_date,
        discount_percentage=discount_percentage,
        active=active
    )

    
    db.session.add(new_promotion)
    db.session.commit()

    response = make_response(jsonify({'message': 'Promotion created successfully'}), 201)
    return response

#UPDATE AND DELETE
@app.route('/restaurants/<int:restaurant_id>/promotions/<int:promotion_id>', methods=['PATCH', 'DELETE'])
@role_required(['restaurant_owner'])
def ud_promotion(restaurant_id, promotion_id):
    if request.method == 'PATCH':
        data = request.json
        promotion_name = data.get('promotion_name')
        promotion_description = data.get('promotion_description')
        start_date = datetime.strptime(data.get('start_date'), '%Y-%m-%d %H:%M:%S')
        end_date = datetime.strptime(data.get('end_date'), '%Y-%m-%d %H:%M:%S')
        discount_percentage = float(data.get('discount_percentage'))
        active = data.get('active', True)

        restaurant = Restaurant.query.get(restaurant_id)
        if not restaurant:
            response = make_response(jsonify({'error': 'Restaurant not found'}), 404)
            return response

        promotion = Promotion.query.filter_by(promotion_id=promotion_id, restaurant_id=restaurant_id).first()
        if not promotion:
            response = make_response(jsonify({'error': 'Promotion not found'}), 404)
            return response

        promotion.promotion_name = promotion_name
        promotion.promotion_description = promotion_description
        promotion.start_date = start_date
        promotion.end_date = end_date
        promotion.discount_percentage = discount_percentage
        promotion.active = active

        db.session.commit()

        response = make_response(jsonify({'message': 'Promotion updated successfully'}), 200)
        return response
    
    elif request.method == 'DELETE':
        restaurant = Restaurant.query.get(restaurant_id)
        if not restaurant:
            response = make_response(jsonify({'error': 'Restaurant not found'}), 404)
            return response

        promotion = Promotion.query.filter_by(promotion_id=promotion_id, restaurant_id=restaurant_id).first()
        if not promotion:
            response = make_response(jsonify({'error': 'Promotion not found'}), 404)
            return response

        # Delete the promotion
        db.session.delete(promotion)
        db.session.commit()

        response = make_response(jsonify({'message': 'Promotion deleted successfully'}), 200)
        return response

# READ
@app.route('/restaurants/<int:restaurant_id>/promotions', methods=['GET'])
@role_required(['restaurant_owner', 'customer']) 
def get_promotions(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)

    if not restaurant:
        response = make_response(jsonify({'error': 'Restaurant not found'}), 404)
        return response

    promotions = Promotion.query.filter_by(restaurant_id=restaurant_id).all()

    serialized_promotions = [promotion.to_dict() for promotion in promotions]

    response = make_response(jsonify({'promotions': serialized_promotions}), 200)
    return response

# STAFFMAPPING
# CREATE, READ
@app.route('/restaurants/<int:restaurant_id>/staff', methods=['GET','POST'])
@role_required(['restaurant_owner'])
def create_staff(restaurant_id):
    if request.method == 'POST':
        data = request.json

        staff_name = data.get('staff_name')
        staff_role = data.get('staff_role')

        if not staff_name or not staff_role:
            response = make_response(jsonify({'error': 'Please provide staff name and role'}), 400)
            return response

        restaurant = Restaurant.query.get(restaurant_id)
        if not restaurant:
            response = make_response(jsonify({'error': 'Restaurant not found'}), 404)
            return response

        new_staff = StaffMapping(
            restaurant_id=restaurant_id,
            staff_name=staff_name,
            staff_role=staff_role
        )

        db.session.add(new_staff)
        db.session.commit()

        response = make_response(jsonify({'message': 'Staff created and linked successfully'}), 201)
        return response
    
    elif request.method == 'GET':
        restaurant = Restaurant.query.get(restaurant_id)

        if not restaurant:
            response = make_response(jsonify({'error': 'Restaurant not found'}), 404)
            return response

        staff_members = StaffMapping.query.filter_by(restaurant_id=restaurant_id).all()

        serialized_staff = [staff.to_dict() for staff in staff_members]

        response = make_response(jsonify({'staff_members': serialized_staff}), 200)
        return response
    
# UPDATE, DELETE
@app.route('/restaurants/<int:restaurant_id>/staff/<int:staff_id>', methods=['PATCH', 'DELETE'])
@role_required(['restaurant_owner'])
def ud_staff_member(restaurant_id, staff_id):
    if request.method == 'PATCH':
        data = request.json

        restaurant = Restaurant.query.get(restaurant_id)
        if not restaurant:
            response = make_response(jsonify({'error': 'Restaurant not found'}), 404)
            return response

        staff_member = StaffMapping.query.filter_by(restaurant_id=restaurant_id, staff_id=staff_id).first()
        if not staff_member:
            response = make_response(jsonify({'error': 'Staff member not found'}), 404)
            return response

        if 'staff_name' in data:
            staff_member.staff_name = data['staff_name']
        if 'staff_role' in data:
            staff_member.staff_role = data['staff_role']

        db.session.commit()

        response = make_response(jsonify(staff_member.to_dict()), 200)
        return response
    
    elif request.method == 'DELETE':
        restaurant = Restaurant.query.get(restaurant_id)
        if not restaurant:
            response = make_response(jsonify({'error': 'Restaurant not found'}), 404)
            return response

        staff_member = StaffMapping.query.filter_by(restaurant_id=restaurant_id, staff_id=staff_id).first()
        if not staff_member:
            response = make_response(jsonify({'error': 'Staff member not found'}), 404)
            return response

        db.session.delete(staff_member)
        db.session.commit()

        response = make_response(jsonify({'message': 'Staff member deleted successfully'}), 200)
        return response


      
      
if __name__ == '__main__':
    app.run(port=5555)
