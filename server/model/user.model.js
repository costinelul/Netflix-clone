const mongoose = require("mongoose");

const User = new mongoose.Schema(
    {
        _id: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    { collection: "user-data" }
);

const model = mongoose.model("Users", User);

module.exports = model;
