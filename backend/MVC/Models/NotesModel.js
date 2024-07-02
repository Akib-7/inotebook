const mongoose =require('mongoose');

const NotesSchema=new mongoose.Schema({

// user : it is a foreign key referencing to the schema of userModel
    user:
        {
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
    ,
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
       
    },
    date:{
        type:Date,
        default:Date.now
    }

    

})

const notesModel=mongoose.model('note',NotesSchema)
module.exports=notesModel;