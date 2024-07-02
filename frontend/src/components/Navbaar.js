import React from "react";
import {
    Link,
    useNavigate
  } from "react-router-dom";
  

export const Navbar=()=>{
let navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('authentication')
    navigate('/login')
  }
// useLocation tells about the curremt page/url we are in
// we will use this hook in order to focus/highlight on the tab(eg- Home, about, contact us etc) we are in ..on the navbarf
  //let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname)
  // }, [location]);
    return(
<nav className="navbar  navbar-expand-lg navbar-light bg-light">

  <div className="container-fluid">
    <Link className="navbar-brand" to="/">iNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          
        {/*  eslint-disable-next-line  */}
          <Link className={'nav-link ${location.pathname==="/"? "active":""}'} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
         {/* eslint-disable-next-line  */}
          <Link className={'nav-link ${location.pathname==="/about"? "active":""}'} to="/about">About</Link>
        </li>
      
        
      </ul>
      {!localStorage.getItem('authentication')?
      <form className="d-flex">
        
        <Link style={{backgroundColor:'#0805a8',color:'white'}} className="btn mx-2" to="/signup"  role="button">Signup</Link>
        <Link style={{backgroundColor:'#ed7c12',color:'white'}} className="btn btn-peach" to="/login"role="button">Login</Link>
        
      </form>:
<button className="btn btn-primary" onClick={handleLogout}>Logout</button>}
    </div>
  </div>
</nav>
    )
    
}
export default Navbar