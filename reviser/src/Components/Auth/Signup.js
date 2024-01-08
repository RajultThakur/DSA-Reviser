import React, { useState } from 'react'
import {Link ,useHistory } from "react-router-dom"
import Zoom from "react-reveal/Zoom"
import { BACKEND_URL } from '../../config/config';
const url = `${BACKEND_URL}/api/auth`;
function Signup() {
    const history = useHistory();
    const [user, setUser] = useState({ name: "", email: "", password: "" });
    const [OTP,setOTP] = useState();
    const [showOtpSection, setshowOtpSection] = useState(1);
    const onchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const submit = async    (e) => {
        e.preventDefault();
        const response = await fetch(`${url}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({ name: user.name, email: user.email, password: user.password })
        });

        const json = await response.json();
        if (json.success === true) {
            // console.log(json.user);
            alert("registred successfull")
            // setshowOtpSection(0);
            history.push("/")
            // const response2 = await fetch(`${url}/getotp`, {
            //     method: 'POST',
            //     headers: {
            //         "Content-Type": 'application/json',
            //     },
            //     body: JSON.stringify({ name: user.name, to: user.email, password: user.password })
            // });
    
            // const otp = await response2.json();
            // console.log(otp.otp); 
            // setOTP(otp.otp);
    
        }else if(json.msg ==="user exist"){
          alert("user already exist. Please try to login")
        //   history.push("/login")
        } else {
            alert( "Invalid details")
        }

        
    }

    const fillotp = async(e) => {
        e.preventDefault();
        // console.log(e.target.otp.value);
        if(OTP.toString() === e.target.otp.value ){
            alert("verified successful")
            history.push("/login");
        }
        else {
            const response = await fetch(`${url}/deleteuser`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({email:user.email})
            })
            const data = await response.json();
            alert("invalid otp try again to signup");
            history.push("/login");
            history.push("/signup");
        }
    }
    
    return (
        <Zoom top>
        <div style={{border:"1px solid"}}>
            {/* {showOtpSection? */}
             <form onSubmit ={submit} className="signup-form my-1">
                 <h3>Register hear!</h3>
            <div className="my-1">
                <label htmlFor="exampleInputEmail1" className="form-label">name</label>
                <input style={{color: "black"}} value={user.name} name="name" onChange={onchange} type="text" className="formcontrol"  id="exampleInputEmail1" aria-describedby="emailHelp" required={true} />
            </div>
            <div className="my-1">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input style={{color: "black"}} value={user.email} name="email" onChange={onchange} type="email" className="formcontrol" id="exampleInputEmail1" aria-describedby="emailHelp" required={true} />
            </div>
            <div className="my-1">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input style={{color: "black"}} value={user.password} name="password" onChange={onchange} type="password" className="formcontrol" id="exampleInputPassword1" />
            </div>
            
            <button type="submit" className="btn mt-1 btn-primary">SignUp</button>
            <p className="note">*If already have account <Link className="auth" to="/login" role="button">login</Link> </p>
        </form>
        {/* :
        <form onSubmit={fillotp}>
        <div className="my-1">
                <label htmlFor="exampleInputEmail1" className="form-label">Enter otp</label>
                <input  name="otp"  type="number" className="formcontrol" id="exampleInputEmail1" aria-describedby="emailHelp" required={true} />
            </div>
            <button type="submit" className="btn mt-1 btn-primary">go</button>
        </form>} */}
        </div>
        </Zoom>
    )
}

export default Signup
