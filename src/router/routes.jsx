import {
  createBrowserRouter,
  
} from "react-router-dom";
import Main from "../pages/Main";
import Home from "../pages/homes/Home/Home";
import Login from "../component/Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import ManageUsers from "../Dashboard/ManageUser/ManageUsers";
import ManageDoctors from "../Dashboard/ManageDoctors/ManageDoctors";
import ManageServices from "../Dashboard/Manageservice/ManageServices";
import SignUp from "../component/SignUp/SignUp";


const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:'login',
        element:<Login></Login>
      }
    ]
  },
  {
    path:'dashboard',
    element:<Dashboard/>,
    children:[
      {
        path:"manageuser",
        element:<ManageUsers/>
      },
      {
        path:"managedoctor",
        element:<ManageDoctors/>
      },
      {
        path:'manageservice',
        element:<ManageServices/>
      },
      {
        path:'signup',
        element:<SignUp></SignUp>
      }
    ]
  }
]);

export default routes;