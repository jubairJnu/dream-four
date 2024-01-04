import React, { useState, useEffect } from 'react';
import SelectSearch from 'react-select-search';
import axios from 'axios';

const MyForm = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalFee, setTotalFee] = useState(0);

  useEffect(() => {
    // Fetch services from the server
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []); // Run only once when the component mounts

  const handleServiceChange = (values) => {
    const selectedServiceObjs = services.filter((service) => values.includes(service.value));
    setSelectedServices(selectedServiceObjs);

    // Calculate total fee
    const total = selectedServiceObjs.reduce((acc, service) => acc + parseInt(service.fee, 10), 0);
    setTotalFee(total);
  };

  return (
    <div>
      <label>Select Services:</label>
      <SelectSearch
        options={services.map((service) => ({ name: service.name, value: service.value }))}
        multiple
        value={selectedServices.map((service) => service.value)}
        name="services"
        placeholder="Select services"
        onChange={handleServiceChange}
      />

      <br />

      <label>Total Fee:</label>
      <input type="text" value={totalFee} readOnly />

      {/* Add other form fields as needed */}
    </div>
  );
};

export default MyForm;
// -----
import React, { useState, useEffect } from 'react';
import SelectSearch from 'react-select-search';
import axios from 'axios';

const MyForm = () => {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalFee, setTotalFee] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState('flat'); // 'flat' or 'percentage'

  useEffect(() => {
    // Fetch services from the server
    const fetchServices = async () => {
      try {
        const response = await axios.get('/api/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []); // Run only once when the component mounts

  const handleServiceChange = (values) => {
    const selectedServiceObjs = services.filter((service) => values.includes(service.value));
    setSelectedServices(selectedServiceObjs);

    // Calculate total fee
    const total = selectedServiceObjs.reduce((acc, service) => acc + parseInt(service.fee, 10), 0);

    // Apply discount
    const discountedTotal = applyDiscount(total);
    setTotalFee(discountedTotal);
  };

  const handleDiscountValueChange = (event) => {
    const value = event.target.value;
    setDiscountValue(value);

    // Recalculate total fee when discount value changes
    const discountedTotal = applyDiscount(totalFee);
    setTotalFee(discountedTotal);
  };

  const handleDiscountTypeChange = (event) => {
    const type = event.target.value;
    setDiscountType(type);

    // Recalculate total fee when discount type changes
    const discountedTotal = applyDiscount(totalFee);
    setTotalFee(discountedTotal);
  };

  const applyDiscount = (total) => {
    if (discountType === 'flat') {
      return total - parseFloat(discountValue);
    } else if (discountType === 'percentage') {
      const discountPercentage = parseFloat(discountValue) / 100;
      return total - total * discountPercentage;
    }
    return total;
  };

  return (
    <div>
      <label>Select Services:</label>
      <SelectSearch
        options={services.map((service) => ({ name: service.name, value: service.value }))}
        multiple
        value={selectedServices.map((service) => service.value)}
        name="services"
        placeholder="Select services"
        onChange={handleServiceChange}
      />

      <br />

      <label>Discount Type:</label>
      <select value={discountType} onChange={handleDiscountTypeChange}>
        <option value="flat">Flat</option>
        <option value="percentage">Percentage</option>
      </select>

      <br />

      <label>Discount Value:</label>
      <input
        type="number"
        value={discountValue}
        onChange={handleDiscountValueChange}
        step={discountType === 'percentage' ? '0.01' : '1'}
      />

      <br />

      <label>Total Fee:</label>
      <input type="text" value={totalFee} readOnly />

      {/* Add other form fields as needed */}
    </div>
  );
};

export default MyForm;