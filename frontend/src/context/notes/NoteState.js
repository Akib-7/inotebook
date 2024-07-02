import React, { useState } from "react";
import noteContext from "./noteContext";


const NoteState=(props)=>{
    var host="http://localhost:5000"
  

    const [notes, setNotes] = useState([]);


// Fetch all notes

const getAllNotes= async ()=>{
  
    const response = await fetch(`${host}/api/fetchAllNotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "authentication": localStorage.getItem("authentication")
        //"Authorization": `Bearer ${localStorage.getItem("authentication")}`
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    var json = await response.json();
    
    //  console.log("Value from Fetch Notes API: "+JSON.stringify((json)))
   // setNotes(json)// THIS IS THE ISSUE : notes is no longer an array thats why notes.map is not working

   // console.log("This is Notes Value after Fetch API Call: "+notes)
   if (Array.isArray(json)) {
    setNotes(json);
} else {
    const token=localStorage.getItem('authentication')
    console.log('This is the token' + token)
    console.error('Invalid format received:', json);
    // Optionally, set notes to an empty array or handle error appropriately.
}
}




// Add a note

const addNote= async (title,description,tag)=>{

    const response = await fetch(`${host}/api/addNote`, {
        method: "POST",
      
        headers: {
          "Content-Type": "application/json",
          "authentication":localStorage.getItem("authentication")
        },
        body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
      });
      const note= await response.json(); 
      setNotes(notes.concat(note))
}







// Delete a note
const deleteNote= async (id)=>{


    const response = await fetch(`${host}/api/deleteNote/${id}`, {
        method: "DELETE",
      
        headers: {
          "Content-Type": "application/json",
          "authentication":localStorage.getItem("authentication")
        },
      });
      // eslint-disable-next-line
      const json= await response.json(); 

    


var newNoteArray=notes.filter((item)=>{
 return item._id!==id
})
setNotes(newNoteArray)
}











// Edit a note
const updateNote= async(id,title,description,tag)=>{


//fetch Api call
const response = await fetch(`${host}/api/updateNote/${id}`, {
    method: "PUT",
  
    headers: {
      "Content-Type": "application/json",
      "authentication":localStorage.getItem("authentication")
    },
    body: JSON.stringify({title,description,tag}), // body data type must match "Content-Type" header
  });
  // eslint-disable-next-line
  const json= await response.json(); 


//Logic to Edit on Frontend
let newNotes= JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id){
            newNotes[index].title=title;
            newNotes[index].description=description;
            newNotes[index].tag=tag;
            break;
        }
        
    }
    setNotes(newNotes);
}




        return(
           
        
    <noteContext.Provider value={{notes,setNotes,addNote,updateNote,deleteNote,getAllNotes}}>
            {props.children}
    </noteContext.Provider>
        )
        }

export default NoteState



// Below is the demo of how context api works

// const NoteState=(props)=>{
//     const s1={
//         "name":"Akib",
//         "degree":"BSCS"   
//     }
//     //this is a sample state 
//     const [state,setState]=useState(s1);
    
//     //This is a sample method
    
//     const updateState=()=>{
//         setTimeout(() => {
            
//             setState({
//                 "name":"Ali",
//                  "degree":"Software Enginnering"
//             })
//         }, 1000);
//     }
//         return(
//             //Javascript is written in curly braces {}
//             // We are importing state and the updateState method/funtion to every component so
//             // that they can directly access these states and methods. It solves props drilling
        
//     <noteContext.Provider value={{state,updateState}}>
//             {props.children}
//     </noteContext.Provider>
//         )
//         }