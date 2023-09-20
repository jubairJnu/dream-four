import { useEffect, useState } from "react";
import DoctorCards from "./DoctorCards";


const Doctors = () => {
  const [doctrs, setDoctrs] = useState([]);

  useEffect( ()=>{
    fetch('http://localhost:5000/doctors')
    .then(res => res.json())
    .then(data => setDoctrs(data))
  },[])

  return (
    <div className="mt-16">
      <h1 className='text-xl text-center font-bold' >Our Doctor</h1>
      <div className="grid md:grid-cols-2">
    {
      doctrs?.map(doctr => <DoctorCards key={doctr._id}
      doctr={doctr}/> )
    }  
    
      </div>
    </div>
  );
};

export default Doctors;