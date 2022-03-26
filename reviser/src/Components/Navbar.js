import React, { useContext } from 'react'
import LightSpeed from 'react-reveal/LightSpeed';
import { Link,useHistory } from "react-router-dom"
import DsaContext from '../Context/DsaContext';
function Navbar () {
  const context = useContext(DsaContext)
  const {IsLogin,setIsLogin} = context;
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("token");
    history.push('/login')
    setIsLogin(false);
  }
  return (
    <>
      <nav style={{background:"#2b2b4c"}} className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <LightSpeed right>
          <Link className="navbar-brand " to="/">Data-structure & Algorithm</Link>
          </LightSpeed>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            </ul>
            <LightSpeed right>
            {IsLogin&&<p style={{color:'red',cursor:"pointer"}} className="mx-2" onClick ={logout}>Log-out</p>}
            </LightSpeed>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar