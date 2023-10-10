import {createBrowserRouter , RouterProvider} from "react-router-dom";
import AddTask from "./Pages/AddTask";
import UpdateTask from "./Pages/UpdateTask";
import RemoveTask from "./Pages/RemoveTask";
import Home from "./Pages/Home";

function App() {

  const router = createBrowserRouter([
       {
         path :"/" ,
         element : <Home/>
       } ,

       {
        path :"/add" ,
        element : <AddTask/>
       } ,
       {
        path :"/update" ,
        element : <UpdateTask/> 
       }, 
       {
        path :"delete" ,
        element : <RemoveTask/>
       } ,
  ]);

   return (
      <RouterProvider router={router} />
  
   )
}

export default App;
