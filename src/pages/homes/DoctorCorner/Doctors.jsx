import DoctorCards from "./DoctorCards";


const Doctors = () => {
  return (
    <div className="mt-16">
      <h1 className='text-xl text-center font-bold' >Our Doctor</h1>
      <div className="md:grid grid-cols-2">
    <DoctorCards/>   
    {/* **Todo */}
      </div>
    </div>
  );
};

export default Doctors;