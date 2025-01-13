from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, create_access_token
from pymongo import MongoClient
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes and origins

# JWT configuration
app.config['JWT_SECRET_KEY'] = '460680e7fe09d19e4063e23c51d3c53757920b054007273cd083703623c1cfea'
jwt = JWTManager(app)

# MongoDB setup
MONGO_URI = "mongodb+srv://mohamedvaseem:mohamedvaseem@anime-galaxy.7lnts.mongodb.net/"
mongo_client = MongoClient(MONGO_URI)
db = mongo_client['Anime-Galaxy']
users_collection = db['users']
watch_later_collection = db['watch-later']

### Endpoints

# User registration
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')

    if not username or not password or not email:
        return jsonify({'error': 'Username, email, and password are required'}), 400

    # Check if the user already exists
    if users_collection.find_one({'email': email}):
        return jsonify({'error': 'Email already exists'}), 400

    # if users_collection.find_one({'username': username}):
    #     return jsonify({'error': 'Username already exists'}), 400

    # Insert user into the database
    user_id = users_collection.insert_one({'username': username, 'email': email, 'password': password}).inserted_id

    # Initialize watch-later list for the user
    watch_later_collection.insert_one({'email': email, 'watchLaterList': []})

    return jsonify({'message': 'User registered successfully', 'user_id': str(user_id)}), 201


# # User login
# @app.route('/login', methods=['POST'])
# def login():
#     data = request.get_json()
#     email = data.get('email')
#     password = data.get('password')

#     if not email or not password:
#         return jsonify({'error': 'Email and password are required'}), 400

#     # Find the user by email
#     user = users_collection.find_one({'email': email})
#     if not user or user['password'] != password:
#         return jsonify({'error': 'Invalid email or password'}), 401

#     # Fetch the watch-later list
#     watch_later_data = watch_later_collection.find_one({'email': email})
#     watch_later_list = watch_later_data['watchLaterList'] if watch_later_data else []

#     # Generate a JWT token
#     token = create_access_token(identity=str(user['_id']))

#     return jsonify({
#         'message': 'Login successful',
#         'token': token,
#         'watchLaterList': watch_later_list,
#         "name": user['username']
#     }), 200


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    # Find the user by email, fetching only necessary fields
    user = users_collection.find_one(
        {'email': email},
        {'_id': 1, 'username': 1, 'password': 1}
    )
    
    # Validate user and password
    if not user or user['password'] != password:
        return jsonify({'error': 'Invalid email or password'}), 401

    # Fetch the watch-later list
    watch_later_data = watch_later_collection.find_one(
        {'email': email},
        {'_id': 0, 'watchLaterList': 1}
    )
    watch_later_list = watch_later_data['watchLaterList'] if watch_later_data else []

    # Generate a JWT token
    token = create_access_token(identity=str(user['_id']))

    return jsonify({
        'message': 'Login successful',
        'token': token,
        'watchLaterList': watch_later_list,
        'name': user['username']
    }), 200

# Change password
@app.route('/change-password', methods=['POST'])
def change_password():
    data = request.get_json()
    email = data.get('email')
    new_password = data.get('newPassword')

    if not email or not new_password:
        return jsonify({'error': 'Email and new password are required'}), 400

    # Find the user by email
    user = users_collection.find_one({'email': email})
    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Update the user's password
    users_collection.update_one({'email': email}, {'$set': {'password': new_password}})
    return jsonify({'message': 'Password updated successfully'}), 200


# Store Watch Later list
@app.route('/storeWatchLater', methods=['POST'])
def store_watch_later():
    data = request.get_json()
    email = data.get('email')
    watch_later_list = data.get('watchLaterList')

    # Log received data for debugging
    print("Received data:", data)

    # Validate input
    if not email:
        print("Error: Email is required")
        return jsonify({'error': 'Email is required'}), 400
    if watch_later_list is None:
        print("Error: Watch Later list is required")
        return jsonify({'error': 'Watch Later list is required'}), 400
    if not isinstance(watch_later_list, list):
        print("Error: Watch Later list must be a list")
        return jsonify({'error': 'Watch Later list must be a list'}), 400

    # Update or create the watch-later list for the user
    result = watch_later_collection.update_one(
        {'email': email},
        {'$set': {'watchLaterList': watch_later_list}},
        upsert=True
    )

    print("Update result:", result.raw_result)
    return jsonify({'message': 'Watch Later list updated successfully'}), 200



if __name__ == '__main__':
    app.run(debug=True)
