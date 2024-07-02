var notesModel=require('../Models/NotesModel')
var checkLogin=require('../Middleware/checkLogin')//MIDDLEWARE


// GET ALL NOTES OF THE LOGGED IN USER

// Function using asysnc await
var fetchAllNotes= async (req,res)=>{
// const _id=req.user._id
// console.log("USER ID"+ _id)
try {
    const notes= await notesModel.find({user:req.user._id})
    res.json(notes)
    console.log(Array.isArray(notes));
} catch (error) {
    res.json(error)
}
    
    //res.send('You are in NOTES')
}





// ADD A NEW NOTE

var addNote=  async(req,res)=>{

const {title,description,tag} =req.body;
   var note= await notesModel.create({title,description,tag,user:req.user._id})
res.json(note);
}






// UPDATE A NOTE
var updateNote= async(req,res)=>{
const {title,description,tag}=req.body

// Updating the fields of the note that user want to update
// We are building a new note which has the updated values that user entered
try {
    

const newNote={}
if(title){newNote.title=title}
if(description){newNote.description=description}
if(tag){newNote.tag=tag}


// Finding the note to be upated
var note= await notesModel.findById(req.params.id)
    if(!note){return res.status(404).send(" Not Found")}

 // We are checking if:
 // The USER ID associated with this specific note(note.user.toString()) is the same as the 
 //id of the user(req.user._id) who is trying to update it

    if(note.user.toString()!==req.user._id){
        return res.status(401).send("Not allowed")
    }

    note=await notesModel.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
    res.json({note})
//new: true means a new note will be created 
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error")
}
    }


// DELETE A NOTE

// Similar Logic to Update Note
var deleteNote=async (req,res)=>{

try {
var note =await notesModel.findById(req.params.id)
if(!note){
    return res.status(404).send("Not Found")
}

//Allow deletion only if the user owns this note
if(note.user.toString()!==req.user._id){

    return res.status(401).send("Not Allowed")
}

note=await notesModel.findByIdAndDelete(req.params.id)
res.json({"success":"Note Deleted",note})
} catch (error) {
    console.error(error.message)
    res.status(500).send("Internal Server Error")
}

}

    
    

module.exports={fetchAllNotes,addNote,updateNote,deleteNote}