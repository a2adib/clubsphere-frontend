import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { 
        index: true, 
        element: <Home/>  
      },   
      { 
        path: "login", 
        element: <Login/>  
      },
      { 
        path: "signup", 
        element: <Register/>  
      }

]},
]);

export default router;