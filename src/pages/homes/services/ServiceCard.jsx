import { FaHandHoldingMedical } from "react-icons/fa";

const ServiceCard = ({ service }) => {
  const { name, price } = service;
  return (
    <div className="container mx-auto card w-80 mt-16 bg-base-100 shadow-xl hover:bg-blue-500 hover:text-white group  ">
      <div className="flex items-center">
        <div className="ps-4 text-[30px] text-blue-500 group-hover:text-white ">
          <FaHandHoldingMedical />
        </div>

        <div className="card-body items-center text-center">
          <h2 className="text-[16px]">
            <span className="font-bold">Name:</span> {name}{" "}
          </h2>
          <p className="text-green-500 group-hover:text-white">Price:{price}</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
