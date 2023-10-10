import { NavLink } from "react-router-dom";

export interface Task {
    id : string;
    title : string ,
    description : string ,
    status: string
}

function TaskItem(props : Task) {
    return (
        <div key={props.id} style={{display:"flex" , alignItems:"center" , gap:"80px"}}>
           <h2>{props.title}</h2>
           <h3>{props.description}</h3>
           <h4>{props.status}</h4>
            <NavLink to="/delete" state={{id : props.id , title : props.title ,
       description : props.description , status: props.status}}>Delete</NavLink>
        </div>
    );
}

export default TaskItem;