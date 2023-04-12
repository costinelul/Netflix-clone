require("dotenv").config();
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./model/user.model");
const UserSettings = require("./model/userSettings.model");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log("Connected to Mongo"))
    .catch((err) => console.log(`Could not connect to Mongo: ${err}`));

app.post("/register", async (req, res) => {
    const { email, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    try {
        await User.create({
            _id: new Date(),
            email,
            password: hashedPassword,
        });
        UserSettings.create({
            _id: email,
            profilePicture: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png",
        });
        res.send({ status: "Success" });
    } catch (err) {
        res.send({ status: "User already exists" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({
        email,
    });
    const checkPassword = await bcrypt.compare(password, user.password);

    if (user && checkPassword) res.send({ user: true, email });
    else res.send({ user: false, message: "User not found" });
});

app.get("/settings/user:id", async (req, res) => {
    const settings = await UserSettings.findById(req.params.id);
    res.send({ settings });
});

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});
