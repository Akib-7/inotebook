var router=require('express').Router();

var authenticationController=require('../Controller/authenticationController')
var notesController=require('../Controller/notesController')


var verifyToken=require('../Middleware/checkLogin');//MIDDLEWARE
//Authentication Routes

router.post('/signup',authenticationController.postAuth)
router.post('/login',authenticationController.login)
router.post('/fecthUser',verifyToken.checkLogin,authenticationController.fetchUser)


//Notes Routes
router.get('/fetchAllNotes',verifyToken.checkLogin,notesController.fetchAllNotes)
router.post('/addNote',verifyToken.checkLogin,notesController.addNote)
router.put('/updateNote/:id',verifyToken.checkLogin,notesController.updateNote)
router.delete('/deleteNote/:id',verifyToken.checkLogin,notesController.deleteNote)





module.exports=router

