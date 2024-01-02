const express = require("express");
const User = require("../models/User")
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const fetchUser = require("../middlewear/jwtVerify")
const nodemailer = require('nodemailer');
router.post("/signup", async (req, res) => {
    const { email, name, password } = req.body;

    try {
        success = false;

        if (!name || !email || !password) 
            return res.status(400).json({ success, msg: "all fiels require" })
        
        const olduser = await User.findOne({email});
        if(olduser) return res.status(422).json({success,mes:"user already exist"});
        
        encryptedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: encryptedPassword
        })
        await user.save();
        success = true
        res.status(201).json({ success, user });
    } catch (error) {
        console.log(error);
        res.json({ error });

    }

})

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            success = false
            return res.status(400).json("all field require");
        }

        const user = await User.findOne({ email });

        if (!user) {
            success = false
            return res.status(400).json("Please try to login with valid details");
        }

        const comparepass = await bcrypt.compare(password, user.password)

        if (!comparepass) {
            success = false
            return res.status(401).json({ success, mes: "invalid details" });
        }
        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                email: user.email
            },
            process.env.SECRET_KEY
        )
        success = true
        res.status(201).json({ success, token });

    } catch (error) {
        console.log(error);
        res.json({ error });

    }

})

router.post("/getotp",(req,res) => {

    const {to,name} = req.body;

    const otp = Math.floor(Math.random()*(99999-10000)-10000);
const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"solve.dsa.questions@gmail.com",
        pass:"DSAsolverwithyourself"
    }
});

const options = {
    from:'solve.dsa.questions@gmail.com',
    to:to,
    subject:"OTP to sing_up into DSA-solver",
    html: `<h1>Hello ${name} <h2>welcome to DSA-solver</h2></h1> <br> <h3> your otp is :<h2> ${otp}</h2></h3>`
};

transporter.sendMail(options,(err,info) => {
    if(err){
        console.log(err);
        return res.status(401).json({err});
        }
    else return res.status(201).json({otp});
})
}
)

router.post("/getuser", fetchUser, async (req, res) => {
    console.log(req.user)
    res.status(201).json({ user: req.user });
})

router.post('/saveuser',async(req,res) => {
    const {name,email,password} = req.body;

    try {
        
        const user = new User({
            name,email,password
        })
        await user.save();
        return res.status(201).json({success:true,mes:user});
    } catch (error) {
        console.log(error)
        return res.json({error});
    }
})


module.exports = router