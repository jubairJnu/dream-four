

const DoctorCards = ({doctr}) => {
  const { name,mobile, schedule,education ,time, fees, description, image } = doctr;
  return (
   <div
    
      // data-aos="zoom-in-up"
      // data-aos-duration="1200"
      className=" container mx-auto card w-80 bg-[#0a1049] text-white
       shadow-[#05092d] shadow-lg hover:border border-blue-500 transition group  ">

        
      <figure className="px-10 pt-10">
        <img src={image} alt="Mentors" className="w-full  h-[160px] rounded-xl group-hover:-translate-y-4 transition" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl">{name}</h2>
        <p className="text-lg flex items-center ">মাত্র ‍<span className="text-green-600 text-lg flex items-center">
        {fees}</span> </p>

        <div className="flex item-center justify-between gap-5">
     
        {/* <Link to={`/enroll/${_id}`}><Button buttonText={enroll} /></Link>
        <Link to={`/course/${name}`}> <Button buttonText={details} /> </Link> */}
        </div>

      
    </div>
</div>

  );
};

export default DoctorCards;