const mongoose = require("mongoose");

const UserSettings = new mongoose.Schema(
    {
        _id: {type: String, required: true},
        profilePicture: { type: String, required: true },
        userName: {type: String, required: true},
    },
    { collection: "user-settings" }
);
const settingsModel = mongoose.model("Settings", UserSettings);

module.exports = settingsModel;
