import { useEffect, useState } from "react";
import AddDoctModal from "./AddDoctModal";
import "./table.css";
import { HiChevronDown, HiPencilSquare, HiTrash } from "react-icons/hi2";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageDoctors = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [totalDoctors, setTotalDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (event) => {
    console.log(event);
  };
  const handleAddDoct = () => {
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch(`${base_url}/all_doctors`)
      .then((res) => res.json())
      .then((data) => setTotalDoctors(data));
  }, []);

  // handle delete

  const handleDoctorDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You cannot edit it!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Submit",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${base_url}/doctor/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.data.deletedCount > 0) {
              console.log("data", data);
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Deleted Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              const remainingDoctor = totalDoctors.filter(
                (doctor) => doctor._id !== id
              );
              setTotalDoctors(remainingDoctor);
            }
          });
      }
    });
  };

  return (
    <div className="w-full ">
      <h1 className="text-center text-purple-500 text-2xl">Manage Doctor</h1>
      <div className="flex justify-between md:mr-5 md:p-3 ">
        <div>
          <p className="text-xl font-semibold">
            Total Doctor = {totalDoctors?.length}
          </p>
        </div>
        <div>
          <button onClick={handleAddDoct} className="btn btn-neutral btn-sm">
            Add Doctor
          </button>
          <AddDoctModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSubmit={handleSubmit}
          />
        </div>
      </div>

      <div className="">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="md:text-[15px] text-center bg-[#1653B2] text-white ">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Schedule</th>
              <th>Fees</th>
              <th>Time</th>
              <th>Education</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {totalDoctors?.map((doct, index) => (
              <tr key={doct._id}>
                <th>{index + 1}</th>
                <td>
                  <div className="mask mask-squircle md:w-12 h-12">
                    <img src={doct.image} alt="image" />
                  </div>
                </td>
                <td>
                  <p>{doct?.name} </p>
                </td>
                <td>{doct?.mobile} </td>
                <th>{doct?.schedule}</th>
                <th>{doct?.fees} tk</th>
                <th>{doct?.time}</th>
                <th>{doct?.education}</th>
                <th>
                  <div className="dropdown dropdown-bottom">
                    <label
                      tabIndex={0}
                      className="btn  bg-[#1653B2]
                   text-white"
                    >
                      Action <HiChevronDown />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu py-1 shadow rounded-box md:w-32 h-10  bg-base-100"
                    >
                      <li>
                        <Link to={`/dashboard/managedoctor/${doct._id}`}>
                          <button
                            title="Update"
                            className="text-[16px] hover:scale-110 hover:bg-green-500 hover:text-white text-green-600"
                          >
                            <HiPencilSquare />
                          </button>
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => handleDoctorDelete(doct._id)}
                          title="Delete"
                          className="text-[16px] hover:scale-110 hover:bg-red-500 hover:text-white text-red-600"
                        >
                          <HiTrash />
                        </button>
                      </li>
                    </ul>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDoctors;
