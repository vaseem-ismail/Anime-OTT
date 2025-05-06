const jwt = require("jsonwebtoken");
const getDB = require("../db");

const login = async (req, res) => {
    try {
        const db = await getDB.getDatabase();
        const User_collection = db.collection("users");
        const WatchLater_collection = db.collection("watch-later");

        const email = req.body.email;
        const password = req.body.password;

        const user = await User_collection.findOne({'email': email, 'password': password});
        if(!user){
            return res.status(404).json({status: "error", message: "User not found"});
        }

        console.log(user);
        const token  = jwt.sign({"email": email, "username": user.username},"ANIMEGALAXY", {expiresIn:"5h"});

        const watchLater = await WatchLater_collection.findOne({"email": email}, {"_id": 0 ,"watchLaterList": 1});

        return res.status(200).json({"message": "Login successful", "token": token, "watchLaterList": watchLater});
        
    } catch (error) {
        console.log("error :", error);
        return res.status(500).json({"message": error.message});
    }
};

const register = async (req, res) => {
    try {
        const db = await getDB.getDatabase();
        const User_collection = db.collection("users");
        const WatchLater_collection = db.collection("watch-later");

        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;

        const findUser = await User_collection.findOne({"email": email});
        if(findUser){
            return res.status(409).json({status: "error", message: "User already exists"});
        }

        const InsertUser = await User_collection.insertOne({"email": email, "username": username, "password": password});
        if(!InsertUser){
            return res.status(500).json({status: "error", message: "User not created"});
        }
        const InsertUserWatchLater = await WatchLater_collection.insertOne({"email": email, "watchLaterList": []});
        const token = jwt.sign({"email": email, "username": username},"ANIMEGALAXY", {expiresIn:"5h"});
        return res.status(200).json({"message": "User created successfully", "token": token});

    } catch (error) {
        console.log("error :", error);
        return res.status(500).json({"message": error.message});
    }
}

const changePassword = async (req, res) => {
    try {
        const db = await getDB.getDatabase();
        const User_collection = db.collection("users");

        const email = req.body.email;
        const newPassword = req.body.newPassword;

        const updatepass = await User_collection.updateOne({"email": email},{"$set": {"password": newPassword}});
        if(!updatepass){
            return res.status(500).json({status: "error", message: "Password not updated"});
        }
        return res.status(200).json({"message": "Password updated successfully"});
    } catch (error) {
        console.log("error :", error);
        return res.status(500).json({"message": error.message});
    }
}

const store_watch_later = async (req, res) => {
    try {
        const db = await getDB.getDatabase();
        const WatchLater_collection = db.collection("watch-later");
        const email = req.body.email;
        const password = req.body.password;
        const WatchLaterList = req.body.watchLaterList;
        const UserFind = await findUser(email, password);
        if(!UserFind){
            return res.status(404).json({"message": "User not found"});
        }

        const UpdateWatchLater = await WatchLater_collection.updateOne({"email": email},{"$set": {"watchLaterList": WatchLaterList}},{upsert: true});
        if(!UpdateWatchLater){
            return res.status(409).json({"message": "Watch Later list not updated"});
        }
        return res.status(200).json({"message": "Watch Later list updated successfully"});
    } catch (error) {
        console.log("error :", error);
        return res.status(500).json({"message": error.message});
    }
}

async function findUser(email, password) {
    const db = await getDB.getDatabase();
    const User_collection = db.collection("users");
    const Find = await User_collection.findOne({ "email": email, "password": password });
    if (!Find) {
        return false;
    }
    return true;
}

module.exports = {login, register, changePassword, store_watch_later};