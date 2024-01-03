import { useEffect, useState } from "react";

import AddServiceModal from "./AddServiceModal";
import { HiChevronDown, HiPencilSquare, HiTrash } from "react-icons/hi2";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageServices = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [totalServices, setTotalServices] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (event) => {
    console.log(event);
  };
  const handleAddService = () => {
    openModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetch("https://dream-four-server.vercel.app/services")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTotalServices(data);
      });
  }, []);

  // handle delete

  const handleServiceDelte = (id) => {
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
        fetch(`${base_url}/service/${id}`, {
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
              const remainingService = totalServices.filter(
                (service) => service._id !== id
              );
              setTotalServices(remainingService);
            }
          });
      }
    });
  };

  return (
    <div className="w-full ">
      <h1 className="text-center text-purple-500 text-2xl">Manage Sevice</h1>
      <div className="flex justify-between md:mr-5 md:p-3 ">
        <div>
          <p className="text-xl font-semibold">
            Total Service = {totalServices?.length}
          </p>
        </div>
        <div>
          <button onClick={handleAddService} className="btn btn-neutral btn-sm">
            Add Service
          </button>

          <AddServiceModal
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
            <tr className="md:text-[20px] bg-[#1653B2] text-white text-center ">
              <th>#</th>

              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {totalServices.map((tservice, index) => (
              <tr key={tservice._id}>
                <th>{index + 1}</th>

                <td>
                  <p>{tservice.name}</p>
                </td>
                <td>{tservice.price}</td>
                <th>
                  <div className="dropdown dropdown-bottom">
                    <label
                      tabIndex={0}
                      className="btn m-1 bg-[#1653B2]
                   text-white"
                    >
                      Action <HiChevronDown />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-1 shadow rounded-box w-32 h-10  bg-base-100"
                    >
                      <li>
                        <Link to={`/dashboard/manageservice/${tservice._id}`}>
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
                          onClick={() => handleServiceDelte(tservice._id)}
                          title="Delete"
                          className="text-[16px] hover:scale-110 hover:bg-red-500 hover:text-white text-red-600"
                        >
                          <HiTrash />
                        </button>
                      </li>

                      <li>
                        <button
                          title="inactive"
                          className="text-[16px] hover:scale-110 hover:bg-red-500 hover:text-white text-red-600"
                        ></button>
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

export default ManageServices;
