import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiPencilSquare, HiTrash , HiChevronDown } from "react-icons/hi2";
import { AiOutlineStop } from "react-icons/ai";

const ManageUsers = () => {
  const [allusers, setAllUsers] = useState([]);

  useEffect(() => {
    fetch('https://dream-four-server.vercel.app/users')
      .then(res => res.json())
      .then(data => setAllUsers(data))
  }, [])

  return (
    <div className="w-full ">
      <h1 className="text-center text-red-500 text-2xl">Manage User</h1>
      <div className="flex justify-end md:mr-5 md:p-3 ">
        <Link to="/dashboard/signup">
          <button className="btn btn-neutral btn-sm">Create User</button></Link>

      </div>

      <div className="">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="md:text-[20px] bg-[#1653B2] text-white ">
              <th>
                #
              </th>
              <th>Image</th>
              <th>Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allusers?.map((user, index) => <tr key={user._id}>
              <th>
                {index + 1}
              </th>
              <td>

                <div className="mask mask-squircle md:w-12 h-12">
                  <img src={user?.image} alt="image" />
                </div>


              </td>
              <td>
                <p>{user?.name}</p>
              </td>
              <td>{user?.role}</td>
              <th>
                <div className="dropdown dropdown-bottom">
                  <label tabIndex={0} className="btn m-1 bg-[#1653B2]
                   text-white">Action <HiChevronDown/> </label>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-1 shadow rounded-box w-32 h-10  bg-base-100">
                    <li><button title="Update" className="text-[16px] hover:scale-110 hover:bg-green-500 hover:text-white text-green-600"> <HiPencilSquare/> </button></li>
                    <li>
                      <button title="Delete" className="text-[16px] hover:scale-110 hover:bg-red-500 hover:text-white text-red-600"> <HiTrash/> </button></li>
                    
                    <li>
                      <button title="inactive" className="text-[16px] hover:scale-110 hover:bg-red-500 hover:text-white text-red-600"> <AiOutlineStop/> </button></li>
                    
                  </ul>
                </div>
              </th>
            </tr>)}


          </tbody>


        </table>
      </div>

    </div>
  );
};

export default ManageUsers;