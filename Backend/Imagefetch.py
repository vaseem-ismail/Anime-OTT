from flask import Flask, Response
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')  # Update connection string if needed
db = client['Anime-OTT']
collection = db['Images']

@app.route('/image/<filename>')
def get_image(filename):
    try:
        # Fetch image by filename from MongoDB
        image_data = collection.find_one({"filename": filename})
        if not image_data:
            return Response("Image not found", status=404)

        # Serve the binary data as an image response
        return Response(image_data['image'], content_type=image_data['content_type'])
    except Exception as e:
        return Response(f"Error: {str(e)}", status=500)

if __name__ == '__main__':
    app.run(debug=True)
