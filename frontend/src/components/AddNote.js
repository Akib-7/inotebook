import React,{useContext, useState} from "react";
import noteContext from "../context/notes/noteContext";

const AddNote=(props)=>{

    var context=useContext(noteContext);
    var {addNote}=context;
    var [note,setNote]=useState({title:" ",description:" ",tag:""})

const handleAddNote=(e)=>{
    e.preventDefault();
addNote(note.title,note.description,note.tag)
setNote({title:" ",description:" ",tag:""} )
props.showAlert("Added Successfully","success");
}
const onChangeText=(e)=>{

    setNote({...note,[e.target.name]:e.target.value})
    
}
    return(
        <div className="container my-3">
        <h2>Add a Note</h2>
        
        
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" name="title" required minLength={3}   value={note.title}aria-describedby="emailHelp" onChange={onChangeText}/>
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" name="description" required minLength={5}  value={note.description} onChange={onChangeText}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" required minLength={3} value={note.tag} onChange={onChangeText}/>
          </div>
         
          <button disabled={note.title.length<3 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleAddNote}>Add</button>
        </form>
        </div>
        
    )
}
export default AddNote