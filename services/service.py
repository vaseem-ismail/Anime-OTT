from flask import request, jsonify, Flask
from pymongo import MongoClient
from flask_bcrypt import Bcrypt
import jwt
from datetime import datetime, timedelta, timezone
import os

app = Flask(__name__)

bcrypt = Bcrypt(app)

MONGO_URI = os.getenv("MONGO_URI")
mongo_client = MongoClient(MONGO_URI)
db = mongo_client["Anime-Galaxy"]
users_collection = db['users']
watch_later_collection = db['watch-later']


SECRET_CODE = "ANIMEGALAXY"


def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')
    
    user = {
        "username": username,
        "email": email,
        "password": password
    }
    print("User :", user)

    if not username or not password or not email:
        return jsonify({'error': 'Username, email, and password are required'}), 400
    hashed_pass = bcrypt.generate_password_hash(password).decode("utf-8")
    if users_collection.find_one({'email': email}):
        return jsonify({'error': 'User already exists'}), 400

    user_id = users_collection.insert_one({'username': username, 'email': email, 'password': hashed_pass}).inserted_id
    
    token = jwt.encode({"user": user , "exp": datetime.now(timezone.utc) + timedelta(hours=1)}, SECRET_CODE, algorithm="HS256")

    watch_later_collection.insert_one({'email': email, 'watchLaterList': []})

    return jsonify({'message': 'User registered successfully', "token": token}), 201


def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    user = users_collection.find_one(
        {'email': email},
        {'_id': 1, "email": 1, 'username': 1, "password": 1}
    )
    
    if not bcrypt.check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid email or password'}), 401

    watch_later_data = watch_later_collection.find_one(
        {'email': email},
        {'_id': 0, 'watchLaterList': 1}
    )
    watch_later_list = watch_later_data['watchLaterList'] if watch_later_data else []

    token = jwt.encode({"user": {
        "email": email,
        "_id": str(user["_id"]),
        "username": user["username"]
        } , "exp": datetime.now(timezone.utc) + timedelta(hours=1)}, SECRET_CODE, algorithm="HS256")


    return jsonify({
        'message': 'Login successful',
        'token': token,
        'watchLaterList': watch_later_list
    }), 200
    
def store_watch_later():
    data = request.get_json()
    email = data.get('email')
    watch_later_list = data.get('watchLaterList')

    print("Received data:", data)

    if not email:
        print("Error: Email is required")
        return jsonify({'error': 'Email is required'}), 400
    if watch_later_list is None:
        print("Error: Watch Later list is required")
        return jsonify({'error': 'Watch Later list is required'}), 400
    if not isinstance(watch_later_list, list):
        print("Error: Watch Later list must be a list")
        return jsonify({'error': 'Watch Later list must be a list'}), 400

    result = watch_later_collection.update_one(
        {'email': email},
        {'$set': {'watchLaterList': watch_later_list}},
        upsert=True
    )

    print("Update result:", result.raw_result)
    return jsonify({'message': 'Watch Later list updated successfully'}), 200

def change_password():
    data = request.get_json()
    email = data.get('email')
    # oldPass = data.get("oldPassword")
    new_password = data.get('newPassword')

    if not email or not new_password:
        return jsonify({'error': 'Email and new password are required'}), 400

    user = users_collection.find_one({'email': email})
    if not user:
        return jsonify({'error': 'User not found'}), 404

    users_collection.update_one({'email': email}, {'$set': {'password': new_password}})
    return jsonify({'message': 'Password updated successfully'}), 200