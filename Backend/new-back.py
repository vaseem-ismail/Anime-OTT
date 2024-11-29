from flask import Flask, request, Response
from pymongo import MongoClient

app = Flask(__name__)

# MongoDB setup
client = MongoClient("mongodb://localhost:27017/")
db = client["Anime-OTT"]
fs_files = db["fs.files"]
fs_chunks = db["fs.chunks"]

@app.route('/stream-video', methods=['GET'])
def stream_video():
    try:
        # Get filename from query parameters
        filename = request.args.get('filename')
        if not filename:
            return "Filename not provided", 400

        # Find the file metadata
        file_metadata = fs_files.find_one({"filename": filename})
        if not file_metadata:
            return "File not found", 404

        file_id = file_metadata["_id"]
        # Fetch and sort the chunks
        chunks = fs_chunks.find({"files_id": file_id}).sort("n", 1)

        # Streaming generator
        def generate():
            for chunk in chunks:
                yield chunk["data"]  # Yield each chunk's binary data

        # Return response as a stream
        return Response(generate(), content_type="video/mp4")
    except Exception as e:
        return str(e), 500

if __name__ == '__main__':
    # Make app accessible on all network interfaces
    app.run(host='0.0.0.0', port=5000, debug=True)
