from flask import Flask, request, Response, jsonify
from flask_cors import CORS
from pymongo import MongoClient, ASCENDING
from gridfs import GridFS
from functools import lru_cache
import logging
import os
import json
import re

app = Flask(__name__)
CORS(app)

logging.basicConfig(level=logging.INFO)

# MongoDB configuration
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
DB_NAME = "Anime-OTT"

client = MongoClient(MONGO_URI)
db = client[DB_NAME]
fs = GridFS(db)

JSON_FILE_PATH = os.getenv("JSON_FILE_PATH", "../image.json")

# Load anime data into memory
@lru_cache(maxsize=1)
def load_anime_data():
    if not os.path.exists(JSON_FILE_PATH):
        raise FileNotFoundError("JSON file not found")
    with open(JSON_FILE_PATH, 'r') as file:
        return json.load(file)

@app.route('/')
def home():
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
    try:
        anime_data = load_anime_data()

        anime_name = request.args.get('name')
        if not anime_name:
            return jsonify({"error": "Anime name not provided"}), 400

        anime = next((item for item in anime_data if item["name"].lower() == anime_name.lower()), None)
        if not anime:
            return jsonify({"error": f"Anime '{anime_name}' not found"}), 404

        return jsonify({"description": anime.get("description")})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/video-stream', methods=['GET'])
def video_stream():
    try:
        filename = request.args.get('filename')
        if not filename:
            return jsonify({"error": "Filename not provided"}), 400

        # Use GridFSBucket for optimized streaming
        grid_out = fs.find_one({"filename": filename})
        if not grid_out:
            return jsonify({"error": "File not found"}), 404

        file_length = grid_out.length

        range_header = request.headers.get("Range", None)
        if not range_header:
            return Response(grid_out.read(), content_type="video/mp4", headers={"Content-Length": str(file_length)})

        # Parse Range header
        range_match = re.match(r"bytes=(\d+)-(\d*)", range_header)
        if not range_match:
            return Response(status=416, headers={"Content-Range": f"bytes */{file_length}"})

        start = int(range_match.group(1))
        end = int(range_match.group(2)) if range_match.group(2) else file_length - 1

        if start >= file_length or start > end:
            return Response(status=416, headers={"Content-Range": f"bytes */{file_length}"})

        grid_out.seek(start)
        partial_data = grid_out.read(end - start + 1)

        return Response(
            partial_data,
            status=206,
            content_type="video/mp4",
            headers={
                "Content-Range": f"bytes {start}-{end}/{file_length}",
                "Content-Length": str(len(partial_data)),
                "Accept-Ranges": "bytes",
            }
        )
    except Exception as e:
        logging.error(f"Error streaming video: {e}")
        return jsonify({"error": str(e)}), 500

@app.route('/stream-video', methods=['GET'])
def stream_video():
    try:
        filename = request.args.get('filename')
        if not filename:
            return jsonify({"error": "Filename not provided"}), 400

        raw_video_url = f"/video-stream?filename={filename}"
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
