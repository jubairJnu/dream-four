import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../Provider/AuthProvider";

import Swal from "sweetalert2";

const Header = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const { user, logOut, userInfo } = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  const handleDue = () => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      html: '<p class="text-red-500 text-xl font-bold">Please Pay Your Due Amount!</p>',
      footer: '<p class="text-warning">Pay within 2 April 2024</p>',
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

  const handleLogOut = () => {
    logOut();
  };

  return (
    <div className="navbar  bg-[#1653B2] fixed top-0 z-20 text-[16px] text-white ">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[#1653B2] rounded-box w-52"
          >
            <li>
              <Link to="/service">Our Service</Link>
            </li>
            <li>
              {" "}
              <Link to="/doctor">Doctor Corner</Link>{" "}
            </li>
            <li>
              {" "}
              <Link> About Us </Link>{" "}
            </li>
            {user?.isAuthenticated && userInfo?.email && (
              <>
                <li className=" hover:bg-white rounded-md hover:font-semibold ">
                  <Link onClick={handleDue} to="/dashboard">
                    {" "}
                    Dashboard{" "}
                  </Link>{" "}
                </li>
                <li className="mr-3 hover:bg-white rounded-md hover:font-semibold "></li>
              </>
            )}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case md:text-xl">
          Dream Four Hospital{" "}
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex ">
        <ul className="menu menu-horizontal px-1 text-[20px] ">
          <li className="hover:bg-white rounded-md hover:font-semibold">
            <Link to="/service">Our Service</Link>
          </li>

          <li className="hover:bg-white rounded-md hover:font-semibold">
            <Link to="/doctor">Doctor Corner</Link>{" "}
          </li>
          <li className="hover:bg-white rounded-md hover:font-semibold ">
            {" "}
            <Link> About Us </Link>{" "}
          </li>

          {user?.isAuthenticated && userInfo?.email && (
            <>
              <li className=" hover:bg-white rounded-md hover:font-semibold ">
                <Link onClick={handleDue} to="/dashboard">
                  {" "}
                  Dashboard{" "}
                </Link>{" "}
              </li>
              {/* receipt entry can see only staff */}
              {currentUser && currentUser.role === "staff" && (
                <div>
                  <li className="mr-3 hover:bg-white rounded-md hover:font-semibold ">
                    <Link  to="/receipt">
                     
                      Receipt Entry{" "}
                    </Link>{" "}
                  </li>
                </div>
              )}
              {/* only shopkeeper */}
              {currentUser && currentUser.role === "shopkeeper" && (
                <div>
                  <li className="mr-3 hover:bg-white rounded-md hover:font-semibold ">
                    <Link  to="/medicine_receipt">
                      {" "}
                      Receipt Entry{" "}
                    </Link>{" "}
                  </li>
                </div>
              )}
            </>
          )}
        </ul>
      </div>
      {/* condition for users login */}

      <div className="navbar-end">
        <div>
          {user?.isAuthenticated && userInfo?.email ? (
            <button onClick={handleLogOut} className="btn btn-ghost">
              Log Out
            </button>
          ) : (
            <>
              <Link className="pe-5" to="/login">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
