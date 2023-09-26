import { useEffect, useState } from "react";
import DoctorCards from "./DoctorCards";


const Doctors = () => {
  const [doctrs, setDoctrs] = useState([]);

  useEffect( ()=>{
    fetch('https://dream-four-server.vercel.app/doctors')
    .then(res => res.json())
    .then(data => setDoctrs(data))
  },[])

  return (
    <div className="mt-24 md:px-6">
      <h1 className='text-xl text-center font-bold ' >Our Doctor</h1>
    
   <div className="grid md:grid-cols-3 xl:grid-cols-4 gap-4 mt-6"> 
   {
      doctrs?.map(doctr => <DoctorCards key={doctr._id}
      doctr={doctr}/> )
    } 
    </div> 
    
      </div>
   
  );
};

export default Doctors;