import { useState } from "react";
import { Link } from "react-router-dom";
import AddDoctModal from "./AddDoctModal";


const ManageDoctors = () => {
  const [totalDoctors, setTotalDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = event =>{
    console.log(event);
  }
  const handleAddDoct =() =>{
    openModal();
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full ">
      <h1 className="text-center text-purple-500 text-2xl">Manage Doctor</h1>
      <div className="flex justify-between md:mr-5 md:p-3 ">
        <div>
          <p className="text-xl font-semibold"> Total Doctor = {totalDoctors?.length}</p>
        </div>
        <div>
        
          <button onClick={handleAddDoct} className="btn btn-neutral btn-sm">Add Doctor</button>
          <AddDoctModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit}  />
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
              <th>Schedule</th>
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

export default ManageDoctors;