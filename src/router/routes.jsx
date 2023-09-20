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
import Receipt from "../pages/homes/Receipt/Receipt";
import PrivateRoutes from "./PrivateRoutes";
import IncomeLedger from "../Dashboard/IncomeLedger";
import Services from "../pages/homes/services/Services";



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
      },
      {
        path:'receipt',
        element:<PrivateRoutes><Receipt></Receipt></PrivateRoutes>
      },
      {
        path:'service',
        element:<Services/>
      }
    ]
  },
  {
    path:'dashboard',
    element:<PrivateRoutes><Dashboard/></PrivateRoutes>,
    children:[
      {
        path:"manageuser",
        element:<PrivateRoutes><ManageUsers/></PrivateRoutes>
      },
      {
        path:"managedoctor",
        element:<PrivateRoutes><ManageDoctors/></PrivateRoutes>
      },
      {
        path:'manageservice',
        element:<PrivateRoutes><ManageServices/></PrivateRoutes>
      },
      {
        path:'signup',
        element:<PrivateRoutes><SignUp></SignUp></PrivateRoutes>
      },
      {
        path:'incomeledger',
        element:<PrivateRoutes> <IncomeLedger/> </PrivateRoutes>
      }
    ]
  }
]);

export default routes;