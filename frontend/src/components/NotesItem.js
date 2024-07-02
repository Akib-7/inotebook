


import { useContext } from "react"
import noteContext from "../context/notes/noteContext"

const NotesItem=(props)=>{

var context=useContext(noteContext)
var {deleteNote}=context;
var {note,updateNoteModal,showAlert}=props// this note is coming from map function i:e note={item}
return(
    <div className="col-md-3">

<div className="card my-3" >
  
  <div className="card-body">
    <div className="d-flex alignitems-center">
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-circle-minus mx-3" onClick={()=>{deleteNote(note._id);
    showAlert("Deleted Successfully","success");}} style={{color:"#ff4225"}}></i>
    <i className="fa-solid fa-pen-to-square mx-1" onClick={()=>{updateNoteModal(note)}} style={{color:"black"}}></i>
  
    
   
    </div>
    <p className="card-text"> {note.description}</p>
  </div>
</div>
    </div>
)
}
export default NotesItem