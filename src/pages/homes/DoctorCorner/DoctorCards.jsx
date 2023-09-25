

const DoctorCards = ({doctr}) => {
  const { name,mobile, schedule,education ,time, fees, description, image } = doctr;
  return (
    <div className="card w-80 bg-base-100 shadow-xl group">
  <figure className="px-10 pt-10">
    <img  src={image} alt="Shoes" className="mask mask-circle h-40 w-40 group-hover:scale-110 transition " />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="card-title">Name: {name} </h2>
    <p>{description}</p>
   
  </div>
</div>
  );
};

export default DoctorCards;