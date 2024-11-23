import pymongo
import base64
import json

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['Anime-OTT']
fs_files = db['fs.files']
fs_chunks = db['fs.chunks']

def save_video_base64_to_json(filename, json_filename):
    # Find the file metadata
    file_data = fs_files.find_one({"filename": filename})
    if not file_data:
        return f"File {filename} not found."

    file_id = file_data['_id']

    # Fetch all chunks for the file
    chunks = fs_chunks.find({"files_id": file_id}).sort("n", 1)

    # Concatenate binary data
    video_data = b''.join(chunk['data'] for chunk in chunks)

    # Convert binary data to Base64
    video_base64 = base64.b64encode(video_data).decode('utf-8')

    # Save to JSON file
    data = {
        "filename": filename,
        "base64": f"data:video/mp4;base64,{video_base64}"  # Adjust MIME type if needed
    }

    with open(json_filename, 'w') as json_file:
        json.dump(data, json_file, indent=4)

    return f"Video saved to {json_filename}"

# Example usage
filename = "Jujutsu kaisen S-1 Episode 2"
json_filename = "video_data.json"
result = save_video_base64_to_json(filename, json_filename)
print(result)