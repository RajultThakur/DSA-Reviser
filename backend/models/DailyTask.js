const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    user_id:String,
    tasks:[],
    date :{
        type : String,
        default : new Date().toDateString()
    },
})

module.exports = mongoose.model("task",taskSchema);