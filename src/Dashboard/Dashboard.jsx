import { useContext, useEffect, useState } from "react";
import { FaHome, FaUserCog } from "react-icons/fa";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Balance from "./Balance/Balance";
import Swal from "sweetalert2";

const Dashboard = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [users, setUsers] = useState([]);
  const { userInfo, logOut } = useContext(AuthContext);
  const location = useLocation();

  const handleLogOut = () => {
    logOut()
      .then({})
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDue = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      html: '<p class="text-red-500 text-xl font-bold">Please Pay Your Due Amount!</p>',
      footer: '<p class="text-warning">Pay within 2 March 2024</p>',
    });
  };

  useEffect(() => {
    fetch(`${base_url}/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  }, []);

  const currentUserEmail = userInfo?.email;

  const currentUser = users.find((user) => user.email === currentUserEmail);

  return (
    <div>
      {/* drawerr */}

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-start w-full   ">
          {/* Page content here */}
          <div className=" bg-blue-200 p-2 py-8 w-full "></div>

          <div className="absolute left-5 dropdown">
            <div className="flex justify-between items-center gap-64">
              <div>
                <label
                  tabIndex={0}
                  className="btn btn-ghost lg:hidden text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </label>
              </div>

              {/* image here */}
              <div>
                <img
                  className="mask mask-circle w-7 h-7 border-4 border-purple-500 rounded-full "
                  src={currentUser?.image}
                  alt="Image"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-blue-500 rounded-box w-52 text-white"
            >
              {currentUser && currentUser.role == "admin" && (
                <div>
                  <li>
                    <NavLink to="/dashboard/manageuser">Manage User</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/managedoctor">
                      Manage Doctor
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/manageservice">
                      Manage Service
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={handleDue} to="/dashboard/incomeledger">
                      Income Ledger
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/expenditure">
                      Expenditure List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/due_list">
                      Due List
                      <span className="indicator-item badge badge-secondary">
                        New
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/appointment">
                      Appointment List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/reportlist">
                      Customer Report Entry
                    </NavLink>
                  </li>
                  <li>
                    {" "}
                    <NavLink to="/dashboard/medicinelist">
                      Medicine Entry
                    </NavLink>
                  </li>
                </div>
              )}
              {/* for owner */}
              {currentUser && currentUser.role === "owner" && (
                <div>
                  <li>
                    <NavLink onClick={handleDue} to="/dashboard/incomeledger">
                      Income Ledger
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/expenditure">
                      Expenditure List
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/due_list">
                      Due List
                      <span className="indicator-item badge badge-secondary">
                        New
                      </span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/appointment">
                      Appointment List
                    </NavLink>
                  </li>
                </div>
              )}
              {currentUser && currentUser.role === "staff" && (
                <div>
                  <li>
                    <NavLink onClick={handleDue} to="/dashboard/incomeledger">
                      Income Ledger
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/appointment">
                      Appointment List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/expenditure_entry">
                      Expenditure Entry
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/due_list">
                      Due List
                      <span className="indicator-item badge badge-secondary">
                        New
                      </span>
                    </NavLink>
                  </li>
                </div>
              )}
              {/* shopkeeper */}
              {currentUser && currentUser.role === "shopkeeper" && (
                <div>
                  <li>
                    <NavLink to="/dashboard/incomeledger">
                      Income Ledger
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to="/dashboard/reportlist">
                      Customer Report Entry
                    </NavLink>
                  </li>
                </div>
              )}
              {/* divider */}
              <div className="divider"></div>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <NavLink to="/">
                  <FaHome />
                  Home
                </NavLink>
              </li>
              <li>
                <details className="dropdown">
                  <summary className="m-1 flex items-center gap-2">
                    <FaUserCog /> Profile
                  </summary>

                  <ul
                    tabIndex={0}
                    className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
                  >
                    <li className="bg-[#2048ca] rounded-md text-white">
                      <Link to="/dashboard/change_password">
                        Change Password
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>
              <li className="bg-[#b2163d] w-24 rounded-md text-white mt-2">
                <button onClick={handleLogOut}>Log Out</button>
              </li>
            </ul>
          </div>
          {currentUser &&
            (currentUser.role === "admin" || currentUser.role === "owner") && (
              <>{location.pathname === "/dashboard" && <Balance />}</>
            )}

          <Outlet />
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-blue-200 text-base-content">
            {/* Sidebar content here */}
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-semibold py-4">Dashboard</h1>
              <img
                className="mask mask-circle w-24 h-24 border-4 border-purple-500 rounded-full "
                src={currentUser?.image}
                alt="Image"
              />

              <div className="indicator mt-5">
                <span className="indicator-item badge badge-secondary">
                  {currentUser?.role}
                </span>
                <h3 className="mt-1 mr-5 text-[20px]"> {currentUser?.name} </h3>
              </div>
            </div>

            <div className="divider"></div>
            {currentUser && currentUser.role == "admin" && (
              <div>
                <li>
                  <NavLink to="/dashboard/manageuser">Manage User</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/managedoctor">Manage Doctor</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manageservice">
                    Manage Service
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={handleDue} to="/dashboard/expenditure">
                    Expenditure List
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/due_list">
                    Due List
                    <span className="indicator-item badge badge-secondary">
                      New
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink onClick={handleDue} to="/dashboard/incomeledger">
                    Income Ledger
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/appointment">
                    Appointment List
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/reportlist">
                    Customer Report Entry
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/medicinelist">Medicine Entry</NavLink>
                </li>
              </div>
            )}

            {/* for owner */}

            {currentUser && currentUser.role === "owner" && (
              <div>
                <li>
                  <NavLink onClick={handleDue} to="/dashboard/incomeledger">
                    Income Ledger
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/expenditure">
                    Expenditure List
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/due_list">
                    Due List
                    <span className="indicator-item badge badge-secondary">
                      New
                    </span>
                  </NavLink>
                </li>
                <NavLink to="/dashboard/appointment">Appointment List</NavLink>
              </div>
            )}
            {currentUser && currentUser.role === "staff" && (
              <div>
                <li>
                  <NavLink onClick={handleDue} to="/dashboard/incomeledger">
                    Income Ledger
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/appointment">
                    Appointment List
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/reportlist">
                    Customer Report Entry
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/expenditure_entry">
                    Expenditure Entry
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/due_list">
                    Due List
                    <span className="indicator-item badge badge-secondary">
                      New
                    </span>
                  </NavLink>
                </li>
              </div>
            )}

            {/* shopkeeper */}
            {currentUser && currentUser.role === "shopkeeper" && (
              <div>
                <li>
                  <NavLink to="/dashboard/incomeledger">Income Ledger</NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/reportlist">
                    Customer Report Entry
                  </NavLink>
                </li>
              </div>
            )}

            {/* divider */}

            <div className="divider"></div>
            <li>
              <Link onClick={handleDue} to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li>
              <NavLink to="/">
                <FaHome />
                Home
              </NavLink>
            </li>
            <li>
              <details className="dropdown">
                <summary className="m-1 flex items-center gap-2">
                  <FaUserCog /> Profile
                </summary>

                <ul
                  tabIndex={0}
                  className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
                >
                  <li className="bg-[#2048ca] rounded-md text-white">
                    <Link to="/dashboard/change_password">Change Password</Link>
                  </li>
                </ul>
              </details>
            </li>
            <li className="bg-[#b2163d] w-24 rounded-md text-white mt-2">
              <button onClick={handleLogOut}>Log Out</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
