import LazyLoad from "react-lazy-load";


const ServiceCard = ({service}) => {
  const {  image, name,price } = service;
  return (
    <div className="container mx-auto card w-80 mt-16 bg-base-100 shadow-xl group">
    <figure className="px-10 pt-10">
     <LazyLoad height={200}>
     <img src={image} alt="Shoes" className="group-hover:scale-110 transition" />
     </LazyLoad>
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">Name: {name} </h2>
      <p>{price}</p>
     
    </div>
  </div>
  );
};

export default ServiceCard;