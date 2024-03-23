const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
        name: {
            type: String,
            required: [true, "Please provide full name"]
        },
        email: {
            type: String,
            required: [true, "Please provide email"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Please provide password"],
        },
        balance: {
            type: Number,
            default: 0
        },
        reset_code: {
            type: Number
        }
    },
    {
        timestamps: true
    }
);

const usersModel = mongoose.model("users", usersSchema);

module.exports = usersModel;