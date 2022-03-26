const mongoose = require("mongoose");


const questionSchema = new mongoose.Schema({
    user:String,
    user_id : String,
    dsa : {
        default:0,
        type: Number
    },
    questions : [],
    quantity : {
        type:Number,
        default : 4
    },
    queNumber:[],
    date :{
        type : String,
        default : new Date().toDateString()
    },
    len : Number
})

module.exports = mongoose.model("questions",questionSchema)