import { useState } from "react";
import axios from "axios";


function AddTask({}) {
    const [title ,setTitle] = useState<string>("");
    const [description ,setDescription] = useState<string>("");
    const [responseMsg , setResponseMsg] =useState("");

    const handleAddTask=async()=>{
       const response = await axios.post("http://localhost:3000/tasks/create", {
        title : title ,
        description : description
       });

       if(response.status==201) {
          setResponseMsg("Added Task Successfully!");
       }
    };

    return (
        <div style={{display:"flex" , flexDirection:"column" , alignItems:"center"
         , gap:"20px" , marginTop:"50px"}}>
            
             <input type="text" placeholder="title" value={title} 
             onChange={(e)=>setTitle(e.target.value)}/>
               <input type="text" placeholder="description" value={description} 
             onChange={(e)=>setDescription(e.target.value)}/>

             <button onClick={handleAddTask}>Add</button>

              {responseMsg!=="" ?  <h3>{responseMsg}</h3> : null}
        </div>
    );
}

export default AddTask;