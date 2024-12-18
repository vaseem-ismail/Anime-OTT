from flask import Flask, request, Response, jsonify,redirect
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

@app.route('/')
def home():
    """
    Home endpoint providing available routes.
    """
    return jsonify({
        "message": "Welcome to the Anime OTT Backend!",
        "routes": {
            "/": "API Home",
            "/discover-backend": "Fetch backend IP and port",
            "/stream-video": "Stream video endpoint (GET: requires 'filename' query parameter)"
        }
    })
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
        logging.info(f"Streaming file: {filename} (ID: {file_id})")

        # Fetch video chunks
        chunks = fs_chunks.find({"files_id": file_id}).sort("n", 1)

        def generate():
            for chunk in chunks:
                yield chunk["data"]

        return Response(generate(), content_type="video/mp4")
    except Exception as e:
        logging.error(f"Error streaming video: {e}")
        return jsonify({"error": str(e)}), 500


@app.route('/stream-video', methods=['GET'])
def stream_video():
    """
    Endpoint to stream video using an HTML page with styled <video> tag.
    """
    try:
        filename = request.args.get('filename')
        if not filename:
            return jsonify({"error": "Filename not provided"}), 400

        # Generate the raw video stream URL
        raw_video_url = f"/video-stream?filename={filename}"

        # HTML response with CSS to style the video tag and JavaScript for button functionality
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
                    background-color: #000000;
                    display: flex;
                    justify-content: flex-end;
                    align-items: flex-start;
                    height: 100vh;
                }}
                video {{
                    position: absolute;
                    top: 0;
                    right: 0;
                    width: 99%;
                    height: auto;
                    border: 2px solid #ccc;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                }}
                .controls {{
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    display: none;
                    gap: 10px;
                }}
                button {{
                    padding: 10px;
                    font-size: 16px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    background-color: #444;
                    color: white;
                }}
                button:hover {{
                    background-color: #666;
                }}
            </style>
        </head>
        <body>
            <video id="videoPlayer" controls autoplay>
                <source src="{raw_video_url}" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="controls">
                <button id="backwardButton">⏪ Backward</button>
                <button id="forwardButton">Forward ⏩</button>
            </div>
            <script>
                // Wait for the DOM to load before adding event listeners
                document.addEventListener('DOMContentLoaded', function () {{
                    const video = document.getElementById('videoPlayer');
                    
                    // Get the control buttons
                    const backwardButton = document.getElementById('backwardButton');
                    const forwardButton = document.getElementById('forwardButton');

                    // Add click event listeners
                    backwardButton.addEventListener('click', function () {{
                        // Seek backward by 10 seconds
                        video.currentTime = Math.max(0, video.currentTime - 10);
                    }});

                    forwardButton.addEventListener('click', function () {{
                        // Seek forward by 10 seconds
                        video.currentTime = Math.min(video.duration, video.currentTime + 10);
                    }});
                }});
            </script>
        </body>
        </html>
        """
        return Response(html_content, content_type="text/html")
    except Exception as e:
        logging.error(f"Error rendering video page: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
