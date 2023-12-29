import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/Main";
import Home from "../pages/homes/Home/Home";
import Login from "../component/Login/Login";
import Dashboard from "../Dashboard/Dashboard";
import ManageUsers from "../Dashboard/ManageUser/ManageUsers";
import ManageDoctors from "../Dashboard/ManageDoctors/ManageDoctors";
import ManageServices from "../Dashboard/Manageservice/ManageServices";
import SignUp from "../component/SignUp/SignUp";

import PrivateRoutes from "./PrivateRoutes";
import IncomeLedger from "../Dashboard/IncomeLedger";
import Services from "../pages/homes/services/Services";
import Doctors from "../pages/homes/DoctorCorner/Doctors";
import ReceiptTabs from "../pages/homes/Receipt/ReceiptTabs";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "receipt",
        element: (
          <PrivateRoutes>
            <ReceiptTabs />
          </PrivateRoutes>
        ),
      },

      {
        path: "service",
        element: <Services />,
      },
      {
        path: "doctor",
        element: <Doctors />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "manageuser",
        element: (
          <PrivateRoutes>
            <ManageUsers />
          </PrivateRoutes>
        ),
      },
      {
        path: "managedoctor",
        element: (
          <PrivateRoutes>
            <ManageDoctors />
          </PrivateRoutes>
        ),
      },
      {
        path: "manageservice",
        element: (
          <PrivateRoutes>
            <ManageServices />
          </PrivateRoutes>
        ),
      },
      {
        path: "signup",
        element: (
          <PrivateRoutes>
            <SignUp></SignUp>
          </PrivateRoutes>
        ),
      },
      {
        path: "incomeledger",
        element: (
          <PrivateRoutes>
            {" "}
            <IncomeLedger />{" "}
          </PrivateRoutes>
        ),
        loader: () => fetch("https://dream-four-server.vercel.app/users"),
      },
    ],
  },
]);

export default routes;
