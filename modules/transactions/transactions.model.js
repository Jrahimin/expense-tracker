const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        type: {
            type: String,
            required: true,
            enum: ['income', 'expense']
        },
        amount: {
            type: Number,
            required: true
        },
        remark: {
            type: String
        },
    },
    {
        timestamps: true
    }
);

const transactionsModel = mongoose.model("transactions", transactionsSchema);

module.exports = transactionsModel;