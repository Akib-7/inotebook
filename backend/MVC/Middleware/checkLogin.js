var jwt = require('jsonwebtoken');
//const JWT_Secret='2137y217gdb*hskb@'// This should be placed in an ENVIRONMENT variable
const secretKey='IamAkib'

// var middleware=(req,res,next)=>{

//     var token=req.headers.authorization

//         if(!token){
//             res.json('Login First!')
//         }    
//         else{

//             //Verify the token and send the user data for the next function
//             token=token.split(' ')[1]
//             try {  
//                 var payload =jwt.verify(token,JWT_Secret)
//                 req.user=payload.user
//                 next()     
//             } catch (error) {
//                 res.json('INVALID Token')
//             }
          
//         }   
//     }

    


// var checkLogin=(req,res,next)=>{
//     // if (req.session.user){ next()}   else{res.json(Login First)}
//         var token=req.headers.authentication
//    // console.log("JWT in VERIFY: "+token)
//         if(!token){
//         res.json('Login First')
//         }
        
//         token=token.split(" ")[1]
//             try{
                
//             var payload=jwt.verify(token,JWT_Secret)
//             req.user=payload.user
//             console.log('USER ID'+req.user.id)
            
//             next()
//             }
//             catch(error){
//                // console.log(error)
//                 res.send({message:"Invalid Token"})
//             }
        
        
//     }
var checkLogin=(req,res,next)=>{
    // if (req.session.user){ next()}   else{res.json(Login First)}
        var token=req.headers.authentication
    
   
        if(!token){
            res.json('Login First')
        }
        else{
            //token=token.split(' ')[1]
           

            try{
            var data=jwt.verify(token,secretKey)
            req.user=data.user
            
            next()
            }
            catch(error){
                res.json(error)
              //  console.log("USER DATA IN CATCH BLOCK:  "+req.user.email)
            }
        }
        
    }
    module.exports = {checkLogin}