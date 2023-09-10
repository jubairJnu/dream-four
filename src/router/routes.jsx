import {
  createBrowserRouter,
  
} from "react-router-dom";
import Main from "../pages/Main";
import Home from "../pages/homes/Home/Home";
import Login from "../component/Login/Login";


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
]);

export default routes;