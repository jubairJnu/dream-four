import { FaHome } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>

      {/* drawerr */}

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <h1 className="text-2xl font-semibold text-start">Admin Dashboard</h1>
          <hr />
            <Outlet/>
          <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <div>
            <li><NavLink to='/dashboard/manageuser'>Manage User</NavLink>  </li>
            <li> <NavLink to="/dashboard/managedoctor"> Manage Doctor </NavLink> </li>
            <li> <NavLink to="/dashboard/manageservice"> Manage Service </NavLink> </li>
            </div>

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