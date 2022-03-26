const mongoose  = require("mongoose");

const userSchema = mongoose.Schema({
    name :{
        type : String,
        // required :true
    },
    email :{
        type :String,
        // required :true,
    },
    password :{
        type :String,
        // required :true
    },
    data :{
        type :Date,
        default : Date.now
    },
    // token :String
})
module.exports = mongoose.model("user",userSchema);