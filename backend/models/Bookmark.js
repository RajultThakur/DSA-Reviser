const mongoose = require("mongoose");

const bookmarkSchema = new mongoose.Schema({
    user_id:String,
    bookMarkQue:[]
})

module.exports = mongoose.model("bookmark",bookmarkSchema);