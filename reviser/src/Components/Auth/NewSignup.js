import React, { useState, useEffect } from 'react'
// import image from './Images/amazon.png'
import Zoom from "react-reveal/Zoom"
import { Link, useNavigate } from 'react-router-dom'
const url = "http://localhost:5000/api/auth"
function Signup () {
    const [user, setUser] = useState({ name: "", email: "", password: "" })
    const [fillOtp, setFillotp] = useState(0);
    const [OTP, setOTP] = useState("");
    const [myOTP, setmyOTP] = useState("");
    const [finalUserData, setUserData] = useState({});
    const history = useNavigate();
    const fillOTP = (e) => {
        setOTP(e.target.value);

    }
    const onchange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const signup = async (e) => {
        e.preventDefault();

        const response = await fetch(`${url}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({ name: user.name, email: user.email, password: user.password })
        });

        const data = await response.json();
        setUserData(data);
        console.log(data);

        if (data.success === false) {
            alert(data.mes);
            history('/login')
        }

        else {
            setFillotp(1);
            const otp_from_server = await fetch(`${url}/getotp`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({ name: data.user.name, to: data.user.email })
            });

            const otp = await otp_from_server.json();
            setmyOTP(otp.otp);
        }

    }
    const submitotp = async (e) => {
        e.preventDefault();

        if (myOTP === parseFloat(OTP)) {
            await fetch(`${url}/saveuser`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({ name: finalUserData.user.name, email: finalUserData.user.email, password: finalUserData.user.password })
            });
            history("/login");
        } else {
            alert('wrong otp')
        }
    }

    useEffect(() => {
        if (localStorage.getItem('dsa_token')) history.push('/');
    }, [])

    return (
        <Zoom top>
            <div className="login__card" style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",boxShadow: "1px 3px 11px 2px grey",
                width: "max-content", margin: "auto",marginTop:"40px",borderRadius:"13px"
            }}>
                <form onSubmit={signup} style={{ boxShadow: "none", position: 'unset', paddingBottom: "0px" }} className="login signup-form my-1">
                    <h3>Register hear!</h3>
                    <div className="my-1">
                        <label htmlFor="exampleInputEmail1" className="form-label">name</label>
                        <input style={{ color: "black" }} value={user.name} name="name" onChange={onchange} type="text" className="formcontrol" id="exampleInputEmail1" aria-describedby="emailHelp" required={true} />
                    </div>
                    <div className="my-1">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input style={{ color: "black" }} value={user.email} name="email" onChange={onchange} type="email" className="formcontrol" id="exampleInputEmail1" aria-describedby="emailHelp" required={true} />
                    </div>
                    <div className="my-1">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input style={{ color: "black" }} value={user.password} name="password" onChange={onchange} type="password" className="formcontrol" id="exampleInputPassword1" />
                    </div>

                    {fillOtp === 0 && <button type="submit" className="btn mt-1 btn-primary">SignUp</button>}
                </form>
                <form onSubmit={submitotp} style={{
                    width: "40vw",
                    paddingInline: "30px"
                    ,paddingBlock:"20px"
                }} >
                    {fillOtp === 1 && <><div className="my-1">
                        <div className="my-1">
                            <input className='formcontrol' type="number" name="otp" placeholder='Enter OTP' required={true} id="otp" value={OTP} onChange={fillOTP} />
                        </div>
                    </div>
                        <button type='submit' className='btn mt-1 btn-primary'>Submit</button></>
                    }
                    <p className="note">*If already have account <Link className="auth" to="/login" role="button">login</Link> </p>
                </form>

            </div>
        </Zoom>
    )
}

export default Signup
