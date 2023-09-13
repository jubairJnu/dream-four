import { useState } from "react";
import { Link } from "react-router-dom";


const ManageServices = () => {
  const [totalServices, setTotalServices] = useState([]);
  return (
    <div className="w-full ">
    <h1 className="text-center text-purple-500 text-2xl">Manage Sevice</h1>
    <div className="flex justify-between md:mr-5 md:p-3 ">
      <div>
        <p className="text-xl font-semibold"> Total Service = {totalServices?.length}</p>
      </div>
      <div>
      <Link to="/dashboard/signup">
        <button className="btn btn-neutral btn-sm">Add Service</button></Link>
      </div>

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
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>

            </th>
            <td>

              <div className="mask mask-squircle md:w-12 h-12">
                <img src="/tailwind-css-component-profile-2@56w.png" alt="image" />
              </div>


            </td>
            <td>
              <p>Name</p>
            </td>
            <td>Purple</td>
            <th>
              inactive
            </th>
          </tr>

        </tbody>


      </table>
    </div>

  </div>
  );
};

export default ManageServices;