import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import MainDashboard from "../Pages/Dashboard/mainDashboard";
import Dashboard from "../Dashboard/Dashboard";
import ManageClub from "../Pages/Dashboard/ManageClub";
import AddRequest from "../Pages/Dashboard/AddRequest";
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

    ]
  },
  {
    path: "dashboard",
    element: <Dashboard/>,
    children: [
      {
        path: "/dashboard",
        element: <MainDashboard/>
      },
      {
        path: "add-request",
        element: <AddRequest/>
      },
      {
        path: "manageclubs",
        element: <ManageClub/>
      }
    ]
  }
]);

export default router;