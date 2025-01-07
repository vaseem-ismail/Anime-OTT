from flask import Flask, request, Response, jsonify,redirect
from flask_cors import CORS
from pymongo import MongoClient
import logging
import os
import socket
import json

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

JSON_FILE_PATH = os.getenv("JSON_FILE_PATH", "../image.json")

@app.route('/')
def home():
    """
    Home endpoint providing available routes.
    """
    return jsonify({
        "message": "Welcome to the Anime OTT Backend!",
        "routes": {
            "/": "API Home",
            "/video-stream": "Raw video stream endpoint (GET: requires 'filename' query parameter)",
            "/stream-video": "HTML video player endpoint (GET: requires 'filename' query parameter)"
        }
    })

@app.route('/anime-description', methods=['GET'])
def anime_description():
    """
    Fetch and display the description of an anime from the image.json file.
    """
    try:
        # Read the JSON file
        if not os.path.exists(JSON_FILE_PATH):
            return jsonify({"error": "JSON file not found"}), 404

        with open(JSON_FILE_PATH, 'r') as file:
            anime_data = json.load(file)

        # Extract the name of the anime from the query parameter
        anime_name = request.args.get('name')
        if not anime_name:
            return jsonify({"error": "Anime name not provided"}), 400

        # Find the anime by name
        anime = next((item for item in anime_data if item["name"].lower() == anime_name.lower()), None)
        if not anime:
            return jsonify({"error": f"Anime '{anime_name}' not found"}), 404

        # Return the description
        return jsonify({"description": anime.get("description")})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/video-stream', methods=['GET'])
def video_stream():
    """
    Stream raw video chunks from MongoDB GridFS.
    """
    try:
        filename = request.args.get('filename')
        if not filename:
            return jsonify({"error": "Filename not provided"}), 400

        # Check if the file exists
        file_metadata = fs_files.find_one({"filename": filename})
        if not file_metadata:
            return jsonify({"error": "File not found"}), 404

        file_id = file_metadata["_id"]
        file_length = file_metadata["length"]

        # Get the range header
        range_header = request.headers.get("Range", None)
        if not range_header:
            # If no Range header, serve the entire file
            chunks = fs_chunks.find({"files_id": file_id}).sort("n", 1)
            return Response(
                (chunk["data"] for chunk in chunks),
                content_type="video/mp4",
                headers={"Content-Length": str(file_length)}
            )

        # Parse Range header
        range_match = range_header.split("=")[-1].split("-")
        start = int(range_match[0])
        end = int(range_match[1]) if range_match[1] else file_length - 1

        # Validate range
        if start < 0 or end >= file_length or start > end:
            return Response(status=416, headers={"Content-Range": f"bytes */{file_length}"})

        # Calculate the chunks to serve
        response_data = b""
        current_offset = 0
        chunks = fs_chunks.find({"files_id": file_id}).sort("n", 1)

        for chunk in chunks:
            chunk_data = chunk["data"]
            chunk_length = len(chunk_data)

            # If the current chunk overlaps with the requested range
            if current_offset + chunk_length > start and current_offset < end + 1:
                # Calculate the portion of the chunk to include
                chunk_start = max(0, start - current_offset)
                chunk_end = min(chunk_length, end + 1 - current_offset)
                response_data += chunk_data[chunk_start:chunk_end]

            current_offset += chunk_length
            if current_offset > end:
                break

        # Serve partial content
        return Response(
            response_data,
            status=206,
            content_type="video/mp4",
            headers={
                "Content-Range": f"bytes {start}-{end}/{file_length}",
                "Content-Length": str(len(response_data)),
                "Accept-Ranges": "bytes",
            }
        )
    except Exception as e:
        logging.error(f"Error streaming video: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/stream-video', methods=['GET'])
def stream_video():
    """
    Stream video with support for a styled HTML player.
    """
    try:
        filename = request.args.get('filename')
        if not filename:
            return jsonify({"error": "Filename not provided"}), 400

        # Generate the raw video stream URL
        raw_video_url = f"/video-stream?filename={filename}"

        # HTML response with updated width styling
        html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Stream Video</title>
            <style>
                body {{
                    margin: 0;
                    padding: 0;
                    background-color: #000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                }}
                .video-container {{
                    width: 100%; /* Adjust width as needed */
                    max-width: 1000px; /* Max width for the player */
                }}
                video {{
                    width: 90%; /* Ensure video fills the container */
                    height: auto; /* Maintain aspect ratio */
                    border: 2px solid #ccc;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                    position:absolute;
                    top:50px;
                    left:70px;
                }}
            </style>
        </head>
        <body>
            <div class="video-container">
                <video id="videoPlayer" controls autoplay>
                    <source src="{raw_video_url}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>
        </body>
        </html>
        """
        return Response(html_content, content_type="text/html")
    except Exception as e:
        logging.error(f"Error rendering video page: {e}")
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
