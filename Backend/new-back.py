# from flask import Flask, request, Response, jsonify
# from pymongo import MongoClient
import logging
import os
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")


# app = Flask(__name__)
from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes


# Set up logging
logging.basicConfig(level=logging.INFO)

# MongoDB configuration
MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "Anime-OTT"
COLLECTION_FILES = "fs.files"
COLLECTION_CHUNKS = "fs.chunks"

# Initialize MongoDB client
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
fs_files = db[COLLECTION_FILES]
fs_chunks = db[COLLECTION_CHUNKS]


@app.route('/')
def home():
    """
    Default route to check if the server is running.
    """
    return jsonify({
        "message": "Welcome to the Anime OTT Backend!",
        "routes": {
            "/": "API Home",
            "/stream-video": "Stream video endpoint (GET: requires 'filename' query parameter)"
        }
    })


@app.route('/stream-video', methods=['GET'])
def stream_video():
    """
    Stream video chunks from MongoDB GridFS based on the provided filename.
    """
    try:
        # Extract the filename from query parameters
        filename = request.args.get('filename')
        if not filename:
            return jsonify({"error": "Filename not provided"}), 400

        # Retrieve file metadata from GridFS
        file_metadata = fs_files.find_one({"filename": filename})
        if not file_metadata:
            return jsonify({"error": "File not found"}), 404

        file_id = file_metadata["_id"]
        logging.info(f"Streaming file: {filename} (ID: {file_id})")

        # Retrieve file chunks
        chunks = fs_chunks.find({"files_id": file_id}).sort("n", 1)

        # Streaming generator for sending binary data
        def generate():
            for chunk in chunks:
                yield chunk["data"]

        # Respond with the video stream
        return Response(generate(), content_type="video/mp4")
    except Exception as e:
        logging.error(f"Error streaming video: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    # Run the Flask app on all network interfaces
    app.run(host='0.0.0.0', port=5000, debug=True)
