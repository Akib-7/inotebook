const connectToMongo=require('./db')
var cors = require('cors')
connectToMongo();
var port=5000;
const express=require('express')

var app =express();
app.use(cors())

//Middleware for using req.body
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


// app.get('/',(req,res)=>{
//     res.end('Welcome to inotebook')
// })
// app.get('/login',(req,res)=>{
//     res.end('Welcome to Login')
// })



var userRouter=require('./MVC/Routes/userRouter')
app.use('/api',userRouter)
//  /api/auth      /api/notes 
app.listen(port,()=>{
    console.log('iNoteBook backend listening at port '+ port)
})

