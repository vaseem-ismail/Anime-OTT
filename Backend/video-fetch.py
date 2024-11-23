# import json
# from pymongo import MongoClient
# from datetime import datetime

# # Step 1: Connect to MongoDB
# client = MongoClient("mongodb://localhost:27017/")  # Replace with your MongoDB connection string
# db = client["Anime-OTT"]  # Replace with your database name
# collection = db["fs.files"]  # Replace with your collection name

# # Step 2: Custom serialization for JSON
# def custom_json_serializer(obj):
#     if isinstance(obj, datetime):
#         return obj.isoformat()  # Convert datetime to ISO 8601 string
#     raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")

# # Step 3: Fetch the data
# data = collection.find()  # Fetch all documents from the collection

# # Step 4: Preprocess data and write to JSON
# output = []

# for document in data:
#     # Remove MongoDB-specific ObjectId field or convert it to a string
#     document["_id"] = str(document["_id"])
#     output.append(document)

# output_file = "output.json"
# with open(output_file, "w", encoding="utf-8") as f:
#     json.dump(output, f, ensure_ascii=False, indent=4, default=custom_json_serializer)

# print(f"Data has been saved to {output_file}")




# import json
# from pymongo import MongoClient
# from bson.objectid import ObjectId
# import base64

# # Step 1: Connect to MongoDB
# client = MongoClient("mongodb://localhost:27017/")  # Replace with your MongoDB connection string
# db = client["Anime-OTT"]  # Replace with your database name
# files_collection = db["fs.files"]
# chunks_collection = db["fs.chunks"]

# # Step 2: Custom serialization for JSON
# def custom_json_serializer(obj):
#     if isinstance(obj, ObjectId):
#         return str(obj)  # Convert ObjectId to string
#     raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")

# # Step 3: Fetch files and their data
# output = []

# for file_document in files_collection.find():  # Iterate over all files
#     file_id = file_document["_id"]
#     file_document["_id"] = str(file_id)  # Convert ObjectId to string
    
#     # Fetch chunks associated with this file
#     chunks = chunks_collection.find({"files_id": file_id}).sort("n")  # Sort by chunk index 'n'
#     file_data = b"".join(chunk["data"] for chunk in chunks)  # Concatenate binary data
    
#     # Encode binary data to base64
#     file_document["base64_data"] = base64.b64encode(file_data).decode("utf-8")
    
#     output.append(file_document)

# # Step 4: Save to JSON
# output_file = "output_with_base64.json"
# with open(output_file, "w", encoding="utf-8") as f:
#     json.dump(output, f, ensure_ascii=False, indent=4, default=custom_json_serializer)

# print(f"Data with base64 content has been saved to {output_file}")





import json
from pymongo import MongoClient
from bson.objectid import ObjectId
import base64

# Step 1: Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Replace with your MongoDB connection string
db = client["Anime-OTT"]  # Replace with your database name
files_collection = db["fs.files"]
chunks_collection = db["fs.chunks"]

# Step 2: Custom serialization for JSON
def custom_json_serializer(obj):
    if isinstance(obj, ObjectId):
        return str(obj)  # Convert ObjectId to string
    raise TypeError(f"Object of type {obj.__class__.__name__} is not JSON serializable")

# Step 3: Fetch files and their data
output = []

for file_document in files_collection.find():  # Iterate over all files
    file_id = file_document["_id"]
    file_document["_id"] = str(file_id)  # Convert ObjectId to string
    
    # Fetch chunks associated with this file
    chunks = chunks_collection.find({"files_id": file_id}).sort("n")  # Sort by chunk index 'n'
    file_data = b"".join(chunk["data"] for chunk in chunks)  # Concatenate binary data
    
    # Encode binary data to base64
    file_document["base64_data"] = base64.b64encode(file_data).decode("utf-8")
    
    output.append(file_document)

# Step 4: Save to JSON
output_file = "output_with_base64.json"
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=4, default=custom_json_serializer)

print(f"Data with base64 content has been saved to {output_file}")
