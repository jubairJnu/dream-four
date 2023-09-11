import { Link } from "react-router-dom";


const ManageUsers = () => {
  return (
    <div className="w-full ">
      <h1 className="text-center text-red-500 text-2xl">Manage User</h1>
      <div className="flex justify-end mr-5 p-3 ">
        <Link to="/dashboard/signup">
          <button className="btn btn-neutral">Create User</button></Link>

      </div>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="text-[20px] bg-[#1653B2] text-white ">
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
            {/* row 1 */}
            <tr>
              <th>

              </th>
              <td>

                <div className="mask mask-squircle w-12 h-12">
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

export default ManageUsers;