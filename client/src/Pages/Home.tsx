import GetAllTasks from "./GetAllTasks";


function Home({}) {
    return (
        <div style={{display:"flex" , flexDirection:"column" , alignItems:"center" , gap:"30px"}}>
        <h2> Task Management</h2>
         <a href="/add">Add a Task </a>
         <a href="/delete">Remove a Task</a>
         <a href="/update">Update Task Status</a>
         <GetAllTasks/>
        </div>
    );
}

export default Home;