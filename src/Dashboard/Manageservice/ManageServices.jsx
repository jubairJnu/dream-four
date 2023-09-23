import { useEffect, useState } from "react";

import AddServiceModal from "./AddServiceModal";


const ManageServices = () => {
  const [totalServices, setTotalServices] = useState([]);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = event => {
    console.log(event);
  }
  const handleAddService = () => {
    openModal();
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
useEffect( () =>{
  fetch('https://dream-four-server.vercel.app/services')
  .then(res => res.json())
  .then(data => {
    console.log(data)
    setTotalServices(data)})
},[])


  return (
    <div className="w-full ">
      <h1 className="text-center text-purple-500 text-2xl">Manage Sevice</h1>
      <div className="flex justify-between md:mr-5 md:p-3 ">
        <div>
          <p className="text-xl font-semibold"> Total Service = {totalServices?.length}</p>
        </div>
        <div>
          <button onClick={handleAddService} className="btn btn-neutral btn-sm">Add Service</button>

          <AddServiceModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleSubmit} />

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
            {
              totalServices.map((tservice, index) =><tr key={tservice._id}>
                <th>
                {index+1}
                </th>
                <td>
  
                  <div className="mask mask-square md:w-16 h-16 rounded-md">
                    <img src={tservice.image} alt="image" />
                  </div>
  
  
                </td>
                <td>
                  <p>{tservice.name}</p>
                </td>
                <td>{tservice.price}</td>
                <th>
                  inactive
                </th>
              </tr> )
            }
            

          </tbody>


        </table>
      </div>

    </div>
  );
};

export default ManageServices;