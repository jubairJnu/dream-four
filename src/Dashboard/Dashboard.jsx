import { useContext, useEffect, useState } from "react";
import { FaHome, FaUserCog } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { user, userInfo, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then({})
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetch("https://dream-four-server.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          welcome to your dashboard
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-blue-200 text-base-content">
            {/* Sidebar content here */}
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-semibold py-4">Dashboard</h1>
              <img
                className="mask mask-circle w-24 h-24 border-4 border-purple-500 rounded-full "
                src={user?.photoURL}
                alt="Image"
              />

              <div className="indicator mt-5">
                <span className="indicator-item badge badge-secondary">
                  {currentUser?.role}
                </span>
                <h3 className="mt-1 mr-5 text-[20px]"> {user?.displayName} </h3>
              </div>
            </div>

            <div className="divider"></div>
            {currentUser && currentUser.role == "admin" && (
              <div>
                <li>
                  <NavLink to="/dashboard/manageuser">Manage User</NavLink>{" "}
                </li>
                <li>
                  {" "}
                  <NavLink to="/dashboard/managedoctor">
                    {" "}
                    Manage Doctor{" "}
                  </NavLink>{" "}
                </li>
                <li>
                  {" "}
                  <NavLink to="/dashboard/manageservice">
                    {" "}
                    Manage Service{" "}
                  </NavLink>{" "}
                </li>
                <li>
                  {" "}
                  <NavLink to="/dashboard/incomeledger">
                    {" "}
                    Income Ledger
                  </NavLink>{" "}
                </li>
              </div>
            )}
            {currentUser && currentUser.role === "owner" && (
              <div>
                <li>
                  {" "}
                  <NavLink to="/dashboard/managedoctor">
                    {" "}
                    Manage Doctor{" "}
                  </NavLink>{" "}
                </li>
                <li>
                  {" "}
                  <NavLink to="/dashboard/incomeledger">
                    {" "}
                    Income Ledger
                  </NavLink>{" "}
                </li>
              </div>
            )}
            {currentUser && currentUser.role === "staff" && (
              <div>
                <li>
                  {" "}
                  <NavLink to="/dashboard/incomeledger">
                    {" "}
                    Income Ledger
                  </NavLink>{" "}
                </li>
              </div>
            )}

            {/* divider */}

            <div className="divider"></div>
            <li>
              <NavLink to="/">
                <FaHome />
                Home
              </NavLink>
            </li>
            <div className="dropdown dropdown-bottom">
              <li>
                <Link className="flex">
                  <FaUserCog /> Profile
                </Link>{" "}
              </li>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="bg-[#2048ca] rounded-md text-white">
                  <a>Change Password</a>
                </li>
                <li className="bg-[#b2163d] rounded-md text-white mt-2">
                  <button onClick={handleLogOut}>Log Out</button>
                </li>
              </ul>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
