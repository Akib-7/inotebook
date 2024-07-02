

import ShowNotes from "./ShowNotes";

export const Home=(props)=>{
var {showAlert}=props;

    return(
        
<div>
        <ShowNotes showAlert={showAlert}></ShowNotes>    
</div>
    )
    
}
export default Home