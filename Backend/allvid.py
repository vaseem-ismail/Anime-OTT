import pymongo
import base64
import json

# Connect to MongoDB
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client['Anime-OTT']
fs_files = db['fs.files']
fs_chunks = db['fs.chunks']

def fetch_all_files_to_json(json_filename):
    # Find all files in fs.files
    files = fs_files.find()

    # Initialize a list to hold file data
    all_files_data = []

    for file_data in files:
        file_id = file_data['_id']
        filename = file_data['filename']

        # Fetch all chunks for the file
        chunks = fs_chunks.find({"files_id": file_id}).sort("n", 1)

        # Concatenate binary data
        video_data = b''.join(chunk['data'] for chunk in chunks)

        # Convert binary data to Base64
        video_base64 = base64.b64encode(video_data).decode('utf-8')

        # Append file data to the list
        all_files_data.append({
            "filename": filename,
            "base64": f"data:video/mp4;base64,{video_base64}"  # Adjust MIME type as needed
        })

    # Save all data to a JSON file
    with open(json_filename, 'w') as json_file:
        json.dump(all_files_data, json_file, indent=4)

    return f"All files saved to {json_filename}"

# Example usage
json_filename = "all_videos.json"
result = fetch_all_files_to_json(json_filename)
print(result)
