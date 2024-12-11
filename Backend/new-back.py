
from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import logging
import os
import socket

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

logging.basicConfig(level=logging.INFO)

# MongoDB configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
DB_NAME = "Anime-OTT"
COLLECTION_FILES = "fs.files"
COLLECTION_CHUNKS = "fs.chunks"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
fs_files = db[COLLECTION_FILES]
fs_chunks = db[COLLECTION_CHUNKS]

# Get the local IP address of the server
def get_local_ip():
    hostname = socket.gethostname()
    return socket.gethostbyname(hostname)

@app.route('/')
def home():
    return jsonify({
        "message": "Welcome to the Anime OTT Backend!",
        "routes": {
            "/": "API Home",
            "/discover-backend": "Fetch backend IP and port",
            "/stream-video": "Stream video endpoint (GET: requires 'filename' query parameter)"
        }
    })

@app.route('/discover-backend', methods=['GET'])
def discover_backend():
    """
    Endpoint to provide the backend's current IP and port.
    """
    try:
        local_ip = get_local_ip()
        port = 5000  # Default port used by the application
        return jsonify({"ip": local_ip, "port": port}), 200
    except Exception as e:
        logging.error(f"Error discovering backend: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/stream-video', methods=['GET'])
def stream_video():
    """
    Endpoint to stream video chunks from MongoDB using GridFS.
    """
    try:
        filename = request.args.get('filename')
        if not filename:
            return jsonify({"error": "Filename not provided"}), 400

        # Find file metadata
        file_metadata = fs_files.find_one({"filename": filename})
        if not file_metadata:
            return jsonify({"error": "File not found"}), 404

        file_id = file_metadata["_id"]
        logging.info(f"Streaming file: {filename} (ID: {file_id})")

        # Find and stream chunks
        chunks = fs_chunks.find({"files_id": file_id}).sort("n", 1)

        def generate():
            for chunk in chunks:
                yield chunk["data"]

        return Response(generate(), content_type="video/mp4")
    except Exception as e:
        logging.error(f"Error streaming video: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Start the Flask application
    app.run(host='0.0.0.0', port=5000, debug=True)
