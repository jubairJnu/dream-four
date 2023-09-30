
import { useEffect } from 'react';
import { useState } from 'react';
import ServiceCard from './ServiceCard';
import { Link } from 'react-router-dom';
import Loading from '../../../component/Loading';

const Services = () => {
  const [Ourservices, setOurservices] = useState([]);
  const [showAllServices, setShowAllServices] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate some asynchronous operation (e.g., fetching data)
    setTimeout(() => {
      setLoading(false); // Once the operation is complete, hide the loader
    }, 1500);
  }, []);

// Determine the number of services to display based on the state
const numberOfServicesToShow = showAllServices ? Ourservices.length : 8;

const cardServices = Ourservices.slice(0, numberOfServicesToShow);

// Function to handle "See More" button click
const handleSeeMoreClick = () => {
  // Toggle the state to show all services when the button is clicked
  setShowAllServices(!showAllServices);
};


  useEffect(()=>{
    fetch('https://dream-four-server.vercel.app/services')
    .then(res => res.json())
    .then(data => setOurservices(data))
  },[])
  return (
    <div className='mt-24 mb-4'>
      <h1 className='text-2xl text-center font-bold'>Our Services</h1>
     {
      loading? <Loading/> :
     <>
      <div className='grid md:grid-cols-3 xl:grid-cols-4 gap-4'>
      {
        cardServices?.map(service=> <ServiceCard key={service._id} service={service} />)
      }
     
      </div>
      <section className='flex justify-center mt-6'>
      {
        !showAllServices && <Link to="/service">
        <button onClick={handleSeeMoreClick} className='bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-2 mb-2 rounded-md hover:bg-gradient-to-r hover:from-violet-500 hover:to-fuchsia-500'>see more</button>
        </Link>
      }
      </section>
     </>
     }
    </div>
  );
};

export default Services;