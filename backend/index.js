require("dotenv").config();
const connect = require("./Db")();  
const cors = require("cors")
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth",require("./routes/auth"));
app.use("/api/question",require("./routes/questions"));
app.use("/api/task",require("./routes/task"));


// if(process.env.NODE_ENV === "production")
//    app.use(express.static("reviser/build"))

app.listen(process.env.PORT||4000,() => {
    console.log(`app is running on port ${process.env.PORT}`);
})
