import { useState } from "react";

import {  useNavigate } from 'react-router-dom';


 const Login=(props)=>{
   const[credentials,setCredentials]=useState({email:"",password:""})
   const navigate = useNavigate();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",    
            },

            body: JSON.stringify({email:credentials.email,password:credentials.password}),// body data type must match "Content-Type" header
          });
          const json= await response.json()
          console.log(json)
          if(json.success===true){
            
            //save the authentication token and redirect
            localStorage.setItem("authentication",json.authentication)
            console.log("Authentication Token in Login.js: "+(json.authentication))
            // for Redirect we use useNavigate Hook
// we are redirecting to "/" which is the HomePage url in our case . It can be any url i:e /about, /landingPage etc
            props.showAlert("Logged In Successfully","success")               
            navigate("/")
                
          }
          else{
            props.showAlert("Invalid Credentials","danger")
          }

    }

    const onChangeText=(e)=>{
        
        setCredentials({...credentials,[e.target.name]:e.target.value})
        
    }
     return(
        <div className="container">

<form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email"  value={credentials.email} onChange={onChangeText} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChangeText}  name="password"/>
  </div>

  <button style={{backgroundColor:'#ed7c12',color:'white'}} type="submit"  className="btn btn-md" >Login</button>
  
  <div>
  
  <h6 className="my-3">Don't have an Account <a href="/signup">SignUp</a></h6>

  </div>
</form>
</div>
    )
    
}
export default Login