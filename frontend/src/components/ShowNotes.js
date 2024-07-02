import React,{useContext, useEffect,useRef,useState} from "react";
import { useNavigate } from 'react-router-dom';
import noteContext from "../context/notes/noteContext";
import NotesItem from "./NotesItem";
import AddNote from "./AddNote";

//Component's name always starts with acapital letter
var ShowNotes=(props)=>{
 // localStorage.removeItem('authentication')
    var context=useContext(noteContext);
    var {notes,getAllNotes,updateNote}=context;
    var [note,setNote]=useState({id:" ",etitle:" ",edescription:" ",etag:" "})
    var navigate=useNavigate();
   console.log("Value of Notes in Show Notes: "+notes)
    useEffect(()=>{
      //If a auth token exist then we will show all notes
      var isloggedIn=localStorage.getItem('authentication')
      console.log("Is Logged In Token Value: "+isloggedIn)
      if(isloggedIn!==null){
        getAllNotes();
        console.log("Authentication Token:"+localStorage.getItem('authentication'))   
      }
      //We will redirect it to Login Page
      else{
        props.showAlert("Please Login First","warning");
        
        navigate("/login")

      }
        
        // eslint-disable-next-line 
        },[])
        

        //BELOW is the code for EDITING the Note

        // Creating useRef Hooks
        const ref=useRef(null)//It is used for showing the Modal Form
        const refClose =useRef(null)//It is used to close the modal form on Pressing Update Note Button
        


        // Setting the values of the Modal Form as the values of the Currenty Note 
        const updateNoteModal=(currentNote)=>{
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
        
      }
        //Sending the response to updateNote API
        const handleUpdateNote=(e)=>{
            updateNote(note.id,note.etitle,note.edescription,note.etag)
        refClose.current.click()
        props.showAlert("Updated Successfully","success");
        
        }
        //We are updating the value of the Input field and saving it in [note,setNote] useState Hook
        const onChangeText=(e)=>{
        
            setNote({...note,[e.target.name]:e.target.value})
            
        }

return(
    
    <>
    <AddNote showAlert={props.showAlert}/>


    <button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog modal-dialog-centered" >
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} required={true} minLength={3} aria-describedby="emailHelp" onChange={onChangeText}/>
            
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="edescription" name="edescription" required={true} minLength={5} value={note.edescription}  onChange={onChangeText}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" id="etag" name="etag" value={note.etag} required={true} minLength={3} onChange={onChangeText}/>
          </div>
         
         
        </form>
      </div>
      <div className="modal-footer">
        <button ref={refClose}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<3 && note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleUpdateNote}>Update Note</button>
      </div>
    </div>
  </div>
</div>
<div className="row my-3">
<h2>Your Notes</h2>
<div className="container mx-3">
{notes.length===0 && 'No Notes to display'}
</div>
{notes.map((item)=>{
return  <NotesItem key={item._id} updateNoteModal={updateNoteModal} showAlert={props.showAlert} note={item} />// key is necessary to write in map function?
})}



</div>
</>
) 
}
export default ShowNotes