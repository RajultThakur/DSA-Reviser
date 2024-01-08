import React,{useState,useContext} from 'react'
import {Link,useNavigate } from "react-router-dom"
import Zoom from "react-reveal/Zoom"
import DsaContext from '../../Context/DsaContext';
const url = "http://localhost:5000/api/auth";
function Login() {
    const context = useContext(DsaContext);
    const {setIsLogin} = context;
    const history = useNavigate()
    const [user, setUser] = useState({ email: "", password: "" })

    const handleSubmit = async (e) => {
      
        e.preventDefault();
        const response = await fetch(`${url}/login`, {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify({email:user.email,password:user.password})
        });
        const json = await response.json();
        if(json.success===true){
            localStorage.setItem("dsa_token",json.token);
            setUser({ email: "", password: "" });
            history("/");
             
        }else{
            alert("invalid details")
        }
    }
    const onchange = (e) => {
        setUser({...user,[e.target.name] :e.target.value});
    }

    return (
        <Zoom top>
        <form onSubmit={handleSubmit} className="signup-form my-1">
            <h3>Login to continue</h3>
            <div className="my-1">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input style={{color: "black"}} value={user.email} name="email" onChange={onchange} type="email" className="formcontrol" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div className="my-1">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input style={{color: "black"}} value={user.password} name="password" onChange={onchange} type="password" className="formcontrol" id="exampleInputPassword1" />
            </div>
            <button type="submit" className="mt-1 btn btn-primary" >Login</button>
            <p className="note">*Don't have account <Link className="auth" to="/signup" role="button">Sign-up</Link> </p>
        </form>
        </Zoom>
    )
}

export default Login
