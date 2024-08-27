const mongoose = require("mongoose");

const { Schema } = mongoose;

const TodolistSchema = new Schema({
   
    description: {
        type: String,
        required: true
    },

    userRef:{
        type:Schema.ObjectId,
        ref: "User"
    },
   
}, {
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    }
});

module.exports = mongoose.model("Todolist", TodolistSchema);
