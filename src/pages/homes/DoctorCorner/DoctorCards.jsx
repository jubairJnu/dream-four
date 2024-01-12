import { Link } from "react-router-dom";

const DoctorCards = ({ doctr }) => {
  const {
    name,
    schedule,
    education,
    time,
    fees,
    description,
    image,
    specialist,
  } = doctr;
  return (
    <div
      // data-aos="zoom-in-up"
      // data-aos-duration="1200"
      className=" container mx-auto card w-80 bg-[#2513c9] text-white
       shadow-[#05092d] shadow-lg hover:border border-blue-500 transition group  "
    >
      <figure className="px-10 pt-10">
        <img
          src={image}
          alt="Mentors"
          className="w-full  h-[160px] rounded-xl group-hover:-translate-y-4 transition"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-xl">{name}</h2>
        <p>{education}</p>
        <p>Specialist: {specialist}</p>
        <p>{schedule}বার । {time}</p>
        <p className="text-lg flex items-center ">
          ফি মাত্র ‍
          <span className="text-green-600 text-lg flex items-center">
            {fees}
          </span>{" "}
        </p>

        <div className="flex item-center justify-between gap-5">
          <Link>
            <button className="btn btn-sm btn-warning mt-2">
              Appointment Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DoctorCards;
