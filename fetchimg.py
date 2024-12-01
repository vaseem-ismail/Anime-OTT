import pymongo
import json
from collections import defaultdict

# MongoDB connection details
MONGO_URI = "mongodb://localhost:27017/"
DB_NAME = "Anime-OTT"
COLLECTION_NAME = "Images"

# Path to save the JSON file
OUTPUT_FILE = "images_by_genre.json"

def fetch_and_group_by_genre():
    # Connect to MongoDB
    client = pymongo.MongoClient(MONGO_URI)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]

    try:
        # Fetch all documents
        images = list(collection.find({}))

        # Convert MongoDB ObjectId to string for JSON compatibility
        for image in images:
            if "_id" in image:
                image["_id"] = str(image["_id"])

        # Group images by genre
        grouped_data = defaultdict(list)
        for image in images:
            genre = image.get("genre", "Unknown")  # Default to "Unknown" if genre is missing
            grouped_data[genre].append(image)

        # Save grouped data to a JSON file
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(grouped_data, f, indent=2)

        print(f"Data successfully saved to {OUTPUT_FILE}")

    except Exception as e:
        print(f"Error: {e}")

    finally:
        # Close the MongoDB connection
        client.close()

if __name__ == "__main__":
    fetch_and_group_by_genre()
