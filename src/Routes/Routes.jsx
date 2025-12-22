import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home";
import Register from "../Pages/Register";
import Login from "../Pages/Login";
import MainDashboard from "../Pages/Dashboard/MainDashboard";
import ManageClub from "../Pages/Dashboard/ManageClub";
import AddRequest from "../Pages/Dashboard/AddRequest";
import AllUsers from "../Pages/Dashboard/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequest from "../Pages/Dashboard/MyRequest";
import Donate from "../Pages/Donate";
import PaymentFailed from "../Pages/PaymentFailed";
import PaymentSuccess from "../Pages/PaymentSuccess";
import DashboardLayout from "../components/DashboardLayout";
import Blog from "../Pages/Blog";
import BloodDonationRequests from "../Pages/BloodDonationRequests";
import Search from "../Pages/Search";
import Profile from "../Pages/Dashboard/Profile";
import AllBloodDonationRequest from "../Pages/Dashboard/AllBloodDonationRequest";
import RequestDetails from "../Pages/RequestDetails";
import Funding from "../Pages/Funding"; // Import the new component

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
        path: "register", 
        element: <Register/>  
      },
      {
        path: "donate",
        element: <PrivateRoute><Donate/></PrivateRoute>
      },
      {
        path: "payment-success",
        element: <PaymentSuccess/>
      },
      {
        path: "payment-failed",
        element: <PaymentFailed/>
      },
      {
        path: "requests",
        element: <BloodDonationRequests/>
      },
      {
        path: "blog",
        element: <Blog/>
      },
      {
        path: "search",
        element: <Search/>
      },
      {
        path: "request-details/:id",
        element: <PrivateRoute><RequestDetails/></PrivateRoute>
      },
      {
        path: "funding", // New route for the Funding page
        element: <PrivateRoute><Funding/></PrivateRoute>
      }
    ]
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashboardLayout/></PrivateRoute>,
    children: [
      {
        path: "",
        element: <MainDashboard/>
      },
      {
        path: "profile",
        element: <Profile/>
      },
      {
        path: "add-request",
        element: <AddRequest/>
      },
      {
        path: "all-users",
        element: <AllUsers/>
      },
      {
        path: "my-requests",
        element: <MyRequest/>
      },
      {
        path: "manage-club",
        element: <ManageClub/>
      },
      {
        path: "all-blood-donation-request",
        element: <AllBloodDonationRequest/>
      }
    ]
  }
]);

export default router;