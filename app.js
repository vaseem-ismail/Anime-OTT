const express = require('express');
const cors = require('cors');
const Service = require("./services/service");

const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/register", Service.register);
app.post("/login", Service.login);
app.post("/change-password", Service.changePassword);
app.post("/storeWatchLater", Service.store_watch_later);

app.listen(PORT, () => {
    console.log(`Server is Running at ${PORT}`);
})
