import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
  const [Ourservices, setOurservices] = useState([]);

  useEffect(()=>{
    fetch('http://localhost:5000/services')
    .then(res => res.json())
    .then(data => setOurservices(data))
  },[])
  return (
    <div className='mt-24'>
      <h1 className='text-2xl text-center font-bold'>Our Services</h1>
      <div className='grid md:grid-cols-3 xl:grid-cols-4 gap-4'>
      {
        Ourservices?.map(service=> <ServiceCard key={service._id} service={service} />)
      }
      </div>
    </div>
  );
};

export default Services;