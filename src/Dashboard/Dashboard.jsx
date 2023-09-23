import { useContext, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch('https://dream-four-server.vercel.app/users')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  const currentUserEmail = user?.email;

  const currentUser = users.find(user => user.email === currentUserEmail);

  return (
    <div>

      {/* drawerr */}

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <Outlet />

          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-blue-200 text-base-content">
            {/* Sidebar content here */}
            <div className="flex flex-col items-center">
              <h1 className="text-xl font-semibold py-4">Dashboard</h1>
              <img className="mask mask-circle w-24 h-24" src={user?.photoURL} alt="" />

              <div className="indicator mt-5">
                <span className="indicator-item badge badge-secondary">{currentUser?.role}</span>
                <h3 className="mt-1 mr-5 text-[20px]"> {user?.displayName} </h3>
              </div>

            </div>

            <div className="divider"></div>
            {
              currentUser && currentUser.role == 'admin' &&
              <div>
                <li><NavLink to='/dashboard/manageuser'>Manage User</NavLink>  </li>
                <li> <NavLink to="/dashboard/managedoctor"> Manage Doctor </NavLink> </li>
                <li> <NavLink to="/dashboard/manageservice"> Manage Service </NavLink> </li>
                <li> <NavLink to="/dashboard/incomeledger"> Income Ledger
                </NavLink> </li>
              </div>}
            {
              currentUser && currentUser.role === 'owner' &&
              <div>
                <li> <NavLink to="/dashboard/managedoctor"> Manage Doctor </NavLink> </li>
                <li> <NavLink to="/dashboard/incomeledger"> Income Ledger
                </NavLink> </li>
              </div>
            }
            {
              currentUser && currentUser.role === 'staff' &&
              <div>

                <li> <NavLink to="/dashboard/incomeledger"> Income Ledger
                </NavLink> </li>
              </div>
            }


            {/* divider */}

            <div className="divider"></div>
            <li><NavLink to='/'><FaHome />Home</NavLink></li>
          </ul>



        </div>
      </div>

    </div>
  );
};

export default Dashboard;