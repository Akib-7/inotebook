
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const Signup=(props)=> {
 

const[credentials,setCredentials]=useState({email:"",password:"",name:""})

    const navigate = useNavigate();
    const handleSubmit= async (e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",         
            },

            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password}),// body data type must match "Content-Type" header
          });
          const json= await response.json()
          console.log(json)

          if(json.success===true){
            
             //save the authentication token and redirect
            // localStorage.setItem("authentication",json.authentication)
             // for Redirect we use useNavigate Hook
 // we are redirecting to "/" which is the HomePage url in our case . It can be any url i:e /about, /landingPage etc
                 
                 props.showAlert("Account Created Successfully","success")

                 navigate("/login")
          }
          else{
            props.showAlert("Email already registered","danger")
          }
    }




    const onChangeText=(e)=>{ 
        setCredentials({...credentials,[e.target.name]:e.target.value})   
    }



  return (
    <form onSubmit={handleSubmit}>

  
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name"  value={credentials.name} onChange={onChangeText} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email</label>
    <input type="email" className="form-control" id="email" name="email"  value={credentials.email} onChange={onChangeText} aria-describedby="emailHelp"/>
  </div>
 
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} required minLength={5} onChange={onChangeText}  />
  </div>

 

  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
  );
}

export default Signup;
