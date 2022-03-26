const mongoose = require("mongoose");


const solvedQuestionSchema = new mongoose.Schema({
    user:String,
    user_id : String,
    topicName:String,
    topicIndex:Number,
    topicLength:Number,
    solvedQuestion:[]
})

module.exports = mongoose.model("solvedQuestions",solvedQuestionSchema)
// topicName,topicIndex,topicLength,questionNumber