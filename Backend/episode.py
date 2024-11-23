from flask import Flask, request, jsonify
from pymongo import MongoClient

app = Flask(__name__)

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['anime_galaxy']
anime_collection = db['anime_videos']

@app.route('/get_episode', methods=['POST'])
def get_episode():
    data = request.json
    anime_name = data.get('anime_name')
    episode_number = data.get('episode_number', 1)  # Default to episode 1

    anime = anime_collection.find_one({"name": anime_name})
    if not anime:
        return jsonify({"error": "Anime not found"}), 404

    episodes = anime.get('episodes', [])
    if episode_number > len(episodes):
        return jsonify({"error": "Episode not found"}), 404

    return jsonify({"episode_url": episodes[episode_number - 1]})

if __name__ == '__main__':
    app.run(debug=True)
