const mongoose = require("mongoose");

const hintSchema = new mongoose.Schema({
    user_id : String,
    Hints:[]
})

module.exports = mongoose.model("hint",hintSchema)
// topicName,topicIndex,topicLength,questionNumber