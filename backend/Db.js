const mongoose=require("mongoose")

// const url ="mongodb+srv://rajulthakur:rajulthakur18@clusterdsa.f9n6h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const url = "mongodb://localhost:27017/DsaReviser";
// mongodb+srv://rajulthakur:<password>@clusterdsa.f9n6h.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// const url ="mongodb+srv://rajul-thakur:mongowithRJ@18@cluster0.2illf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(url,()=>{
        console.log('connected successfull');
    })
}

module.exports = connectToMongo
