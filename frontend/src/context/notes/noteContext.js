
import { createContext } from "react";

//It will hold all the states realated to notes
// it will help all the componets of rreact to acess all the states of the notes
// Avoids props driling
//Syntax:
const noteContext=createContext();

export default noteContext;