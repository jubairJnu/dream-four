import { useEffect, useState } from "react";
import DoctorCards from "./DoctorCards";
import { Link } from "react-router-dom";


const Doctors = () => {
  const [doctrs, setDoctrs] = useState([]);
  const [showAllDoctors, setShowAllDoctors] = useState(false);

  // Determine the number of services to display based on the state
  const numberOfServicesToShow = showAllDoctors ? doctrs.length : 8;

  const cardDoctor = doctrs.slice(0, numberOfServicesToShow);

  // Function to handle "See More" button click
  const handleSeeMoreClick = () => {
    // Toggle the state to show all services when the button is clicked
    setShowAllDoctors(!showAllDoctors);
  };

  useEffect(() => {
    fetch('https://dream-four-server.vercel.app/doctors')
      .then(res => res.json())
      .then(data => setDoctrs(data))
  }, [])

  return (
    <div className="mt-24 md:px-6">
      <h1 className='text-xl text-center font-bold ' >Our Doctor</h1>

      <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        {
          cardDoctor?.map(doctr => <DoctorCards key={doctr._id}
            doctr={doctr} />)
        }
      </div>
      <div className="flex justify-center mt-6">
        {!
          showAllDoctors && <Link to="/doctor">
            <button onClick={handleSeeMoreClick} className='bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-2 mb-2 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500'>See More</button>
          </Link>
        }
      </div>

    </div>

  );
};

export default Doctors;