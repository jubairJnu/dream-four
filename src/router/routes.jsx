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
import AppointmentList from "../Dashboard/AppointmentList";
import ExpenditureList from "../Dashboard/Expenditure/ExpenditureList";
import EditDoctors from "../Dashboard/ManageDoctors/EditDoctors";
import EditService from "../Dashboard/Manageservice/EditService";

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
        path: "managedoctor/:id",
        element: (
          <PrivateRoutes>
            <EditDoctors />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`https://dream-four-hospital-4c43bb12e925.herokuapp.com/doctor/${params.id}`),
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
        path: "manageservice/:id",
        element: (
          <PrivateRoutes>
            <EditService />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(`https://dream-four-hospital-4c43bb12e925.herokuapp.com/service/${params.id}`),
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
        path: "expenditure",
        element: (
          <PrivateRoutes>
            <ExpenditureList />
          </PrivateRoutes>
        ),
      },
      {
        path: "appointment",
        element: (
          <PrivateRoutes>
            <AppointmentList />
          </PrivateRoutes>
        ),
        loader: () => fetch("https://dream-four-hospital-4c43bb12e925.herokuapp.com/doctors"),
      },
      {
        path: "incomeledger",
        element: (
          <PrivateRoutes>
            <IncomeLedger />
          </PrivateRoutes>
        ),
        loader: () => fetch("https://dream-four-hospital-4c43bb12e925.herokuapp.com/users"),
      },
    ],
  },
]);

export default routes;
