import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiPencilSquare } from "react-icons/hi2";

const ManageUsers = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [allusers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch(`${base_url}/users`)
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, []);

  return (
    <div className="w-full ">
      <h1 className="text-center text-red-500 text-2xl">Manage User</h1>
      <div className="flex justify-end md:mr-5 md:p-3 ">
        <Link to="/dashboard/signup">
          <button className="btn btn-neutral btn-sm">Create User</button>
        </Link>
      </div>

      <div className="">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="md:text-[20px] bg-[#1653B2] text-white ">
              <th>#</th>
              <th>Mail</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allusers?.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>
                  <p>{user?.email}</p>
                </td>
                <td>
                  <p>{user?.name}</p>
                </td>
                <td>{user?.role}</td>
                <td>{user?.status}</td>
                <th>
                  <Link to={`/dashboard/manageuser/${user?._id}`}>
                    <button className="btn btn-outline btn-success ">
                      <HiPencilSquare />{" "}
                    </button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
