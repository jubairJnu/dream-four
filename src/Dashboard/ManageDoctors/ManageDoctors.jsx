import { useEffect, useState } from "react";
import AddDoctModal from "./AddDoctModal";
import './table.css'

const ManageDoctors = () => {
  const [totalDoctors, setTotalDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = event => {
    console.log(event);
  }
  const handleAddDoct = () => {
    openModal();
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetch('http://localhost:5000/doctors')
      .then(res => res.json())
      .then(data => setTotalDoctors(data))
  }, [])

  return (
    <div className="w-full ">
      <h1 className="text-center text-purple-500 text-2xl">Manage Doctor</h1>
      <div className="flex justify-between md:mr-5 md:p-3 ">
        <div>
          <p className="text-xl font-semibold"> Total Doctor = {totalDoctors?.length}</p>
        </div>
        <div>

          <button onClick={handleAddDoct} className="btn btn-neutral btn-sm">Add Doctor</button>
          <AddDoctModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />
        </div>

      </div>

      <div className="">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="md:text-[15px] text-center bg-[#1653B2] text-white ">
              <th>
                #
              </th>
              <th >Image</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Schedule</th>
              <th>Fees</th>
              <th>Time</th>
              <th >Education</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {
              totalDoctors?.map((doct, index) => <tr key={doct._id}>
                <th>
                  {index + 1}
                </th>
                <td>

                  <div className="mask mask-squircle md:w-12 h-12">
                    <img src={doct.image} alt="image" />
                  </div>


                </td>
                <td>
                  <p>{doct?.name}  </p>
                </td>
                <td>{doct?.mobile} </td>
                <th>
                  {doct?.schedule}
                </th>
                <th>
                  {doct?.fees} tk
                </th>
                <th>
                  {doct?.time}
                </th>
                <th >
                  {doct?.education}
                </th>
                <th>
                  inactive
                </th>
              </tr>)
            }

          </tbody>


        </table>
      </div>

    </div>
  );
};

export default ManageDoctors;