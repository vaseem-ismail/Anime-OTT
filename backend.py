import pymongo
import json

# MongoDB connection details
MONGO_URI = "mongodb://localhost:27017/"  # Change this if your MongoDB URI differs
DB_NAME = "Anime-OTT"
COLLECTION_NAME = "Images"

# Path to save the JSON file
OUTPUT_FILE = "images.json"

def fetch_and_save_images():
    # Connect to MongoDB
    client = pymongo.MongoClient(MONGO_URI)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]

    try:
        # Fetch all documents from the collection
        images = list(collection.find({}))

        # Convert MongoDB ObjectId to string for JSON compatibility
        for image in images:
            if "_id" in image:
                image["_id"] = str(image["_id"])

        # Save to JSON file
        with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
            json.dump(images, f, indent=2)

        print(f"Data successfully saved to {OUTPUT_FILE}")

    except Exception as e:
        print(f"Error: {e}")

    finally:
        # Close the MongoDB connection
        client.close()

if __name__ == "__main__":
    fetch_and_save_images()
