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
import MedicineReceipt from "../pages/homes/Receipt/MedicineReceipt";
import EditUser from "../Dashboard/ManageUser/EditUser";
import ChangePassword from "../component/ChangePassword";
import MedicineList from "../Dashboard/ManageMedicine/MedicineList";
import UpdateReport from "../component/UpdateReport";
import EditMedicine from "../Dashboard/ManageMedicine/EditMedicine";
import BookDoctor from "../pages/homes/DoctorCorner/BookDoctor";
import BalanceList from "../Dashboard/Balance/BalanceList";
import ExpenditureAdd from "../Dashboard/Expenditure/ExpenditureAdd";
import DueList from "../Dashboard/dueLIst/DueList";

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
        path: "doctor_appointment/:id",
        element: <BookDoctor />,
        loader: ({ params }) =>
          fetch(
            `https://dream-four-hospital-4c43bb12e925.herokuapp.com/doctor/${params.id}`
          ),
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
        path: "medicine_receipt",
        element: (
          <PrivateRoutes>
            <MedicineReceipt />
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
        path: "change_password",
        element: (
          <PrivateRoutes>
            <ChangePassword />
          </PrivateRoutes>
        ),
      },
      {
        path: "manageuser/:id",
        element: (
          <PrivateRoutes>
            <EditUser />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://dream-four-hospital-4c43bb12e925.herokuapp.com/user/${params.id}`
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
          fetch(
            `https://dream-four-hospital-4c43bb12e925.herokuapp.com/doctor/${params.id}`
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
        path: "manageservice/:id",
        element: (
          <PrivateRoutes>
            <EditService />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://dream-four-hospital-4c43bb12e925.herokuapp.com/service/${params.id}`
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
        path: "expenditure",
        element: (
          <PrivateRoutes>
            <ExpenditureList />
          </PrivateRoutes>
        ),
      },
      {
        path: "due_list",
        element: (
          <PrivateRoutes>
            <DueList />
          </PrivateRoutes>
        ),
      },
      {
        path: "expenditure_entry",
        element: (
          <PrivateRoutes>
            <ExpenditureAdd />
          </PrivateRoutes>
        ),
      },
      {
        path: "balance",
        element: (
          <PrivateRoutes>
            <BalanceList />
          </PrivateRoutes>
        ),
      },
      {
        path: "reportlist",
        element: (
          <PrivateRoutes>
            <UpdateReport />
          </PrivateRoutes>
        ),
      },
      {
        path: "medicinelist",
        element: (
          <PrivateRoutes>
            <MedicineList />
          </PrivateRoutes>
        ),
      },
      {
        path: "medicinelist/:id",
        element: (
          <PrivateRoutes>
            <EditMedicine />
          </PrivateRoutes>
        ),
        loader: ({ params }) =>
          fetch(
            `https://dream-four-hospital-4c43bb12e925.herokuapp.com/medicine/${params.id}`
          ),
      },
      {
        path: "appointment",
        element: (
          <PrivateRoutes>
            <AppointmentList />
          </PrivateRoutes>
        ),
        loader: () =>
          fetch(
            "https://dream-four-hospital-4c43bb12e925.herokuapp.com/doctors"
          ),
      },
      {
        path: "incomeledger",
        element: (
          <PrivateRoutes>
            <IncomeLedger />
          </PrivateRoutes>
        ),
        loader: () =>
          fetch("https://dream-four-hospital-4c43bb12e925.herokuapp.com/users"),
      },
    ],
  },
]);

export default routes;
