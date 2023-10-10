import { useState } from "react";
import { Task } from "../components/TaskItem";
import axios from "axios";
import { useLocation } from "react-router-dom";


function RemoveTask() {
    const [responseMsg , setResponseMsg] =useState("");

    const location = useLocation();
     const state: Task = location.state;

       const handleDeleteTask=async()=>{
        const response = await  axios.delete(`http://localhost:3000/tasks/${state.id}`);

        if(response.status===201)
        {
         setResponseMsg(response.data?.message);
        }
    }
    return (
        <div style={{display:"flex" , flexDirection:"column" , alignItems:"center" , gap:"20px"}}>
             <h3>Title : {state.title}</h3>
             <h4>Desc: {state.description}</h4>
             <h5>Status: {state.status}</h5>

             <button onClick={handleDeleteTask}>Delete</button>
             {responseMsg!=="" ?  <h3>{responseMsg}</h3> : null}
        </div>
    );
}

export default RemoveTask;