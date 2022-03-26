const mongoose = require("mongoose");

const markedQuestionSchema = new mongoose.Schema({
    user:String,
    user_id : String,
    marked_questions:[]
})

module.exports = mongoose.model("markedQuestion",markedQuestionSchema)
// topicName,topicIndex,topicLength,questionNumber