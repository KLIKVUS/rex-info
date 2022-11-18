const { Schema, model } = require("mongoose");

const schema = new Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    login: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["Administrator", "Moderator", "Editor"],
        default: "Editor"
    }
}, { versionKey: false })

module.exports = model("User", schema);