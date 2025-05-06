const { MongoClient } = require('mongodb');

// require('dotenv').config();
async function getDatabase() {
    const client = await MongoClient.connect("mongodb+srv://mohamedvaseem:mohamedvaseem@anime-galaxy.7lnts.mongodb.net/");

    const db = client.db("Anime-Galaxy");
    return db;
}

module.exports = {getDatabase};
