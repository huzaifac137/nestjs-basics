import { useEffect, useState } from "react";
import axios from "axios" ;
import TaskItem, { Task } from "../components/TaskItem";


function GetAllTasks({}) {
     const [tasks , setTasks] =useState<Task[] | []>([]);
      
     const fetchTasks=async()=>{
         const response = await axios.get("http://localhost:3000/tasks" , {
            headers : {
                "Content-Type" :"application/json"
            }
         });
          
         setTasks(response.data.tasks);
     };

     useEffect(()=>{
          fetchTasks();
     },[]);

    return (
        <div style={{display:"flex" , flexDirection:"column" , alignItems:"center" , gap:"30px"}}>
             All Tasks

             {tasks.map((task: Task)=> <TaskItem key={task.id} id={task.id} title={task.title} 
             description={task.description} status={task.status} />)}
        </div>
    );
}

export default GetAllTasks;