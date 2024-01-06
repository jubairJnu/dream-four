import { useEffect, useState } from "react";
import { HiChevronDown, HiPencilSquare, HiTrash } from "react-icons/hi2";
import { Link } from "react-router-dom";
import AddMedicineModal from "./AddMedicineModal";

const MedicineList = () => {
  const base_url = import.meta.env.VITE_BASE_URL;
  const [totalMedicine, setTotalMedicine] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${base_url}/all_medicines`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTotalMedicine(data);
      });
  }, []);

  // handler
  const handleSubmit = (event) => {
    console.log(event);
  };

  const handleAddMedicine = (event) => {
    openModal();
  };

  const handleServiceDelte = (id) => {};

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full md:px-10">
      <h1 className="text-center">Manage Medicine</h1>

      <div className="flex justify-end py-3">
        <button onClick={handleAddMedicine} className="btn btn-neutral btn-sm ">
          Add Medicine
        </button>

        <AddMedicineModal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />
      </div>
      {/* table */}
      <div className="">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="md:text-[20px] bg-[#1653B2] text-white text-center ">
              <th>#</th>

              <th>Name</th>
              <th>Buy Price</th>
              <th>Sell Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {totalMedicine.map((tservice, index) => (
              <tr key={tservice._id}>
                <th>{index + 1}</th>

                <td>
                  <p>{tservice.name}</p>
                </td>
                <td>{tservice.buy}</td>
                <td>{tservice.sell}</td>
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
                        <Link to={`/dashboard/medicinelist/${tservice._id}`}>
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

export default MedicineList;
