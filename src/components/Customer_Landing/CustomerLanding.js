import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CustomerLanding.css'

export const CustomerLanding = () => {
  const { customerId } = useParams();
  const [ownerName, setOwnerName] = useState('');
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  // Fetch available services from the server
  useEffect(() => {
    axios.get('http://localhost:3001/services')
      .then((response) => {
        const { data } = response;
        setOwnerName(data.ownerName);
        setServices(data.services);
      })
      .catch((error) => {
        console.error('Error fetching services:', error);
      });
  }, []);

  // Function to handle selecting/deselecting services
const handleSelectService = (serviceId) => {
    setSelectedServices((prevSelected) => {
      // Find the selected service object by its ID
      const selectedService = services.find((service) => service._id === serviceId);
      if (!selectedService) return prevSelected;
  
      // Extract the service name
      const serviceName = selectedService.service_name;
      console.log(serviceName);
  
      if (prevSelected.includes(serviceName)) {
        return prevSelected.filter((name) => name !== serviceName);
      } else {
        return [...prevSelected, serviceName];
      }
    });
  };

  const handleBookServices = () => {
    // Create the booking request body with selected services
    const bookingData = {
      customer_id: customerId,
      service: selectedServices,
    };
    console.log(bookingData);
    axios.post('http://localhost:3001/customer/bookingservice', bookingData)
      .then((response) => {
        // Handle the response if needed
        console.log('Booking successful:', response.data);
        alert("Successfully booked your services. We will send you an email when your vehicle is ready.");
        window.location.reload()
      })
      .catch((error) => {
        console.error('Error booking services:', error);
      });
  };

  return (
    <div className='container-fluid customerLanding d-flex justify-content-center align-items-center'>
    <div className=" container text-center bg-white p-2">
      <h2>Services We Offer</h2>
      <table class="table table-dark text-start">
        <thead>
          <tr>
            <th>Owner Name</th>
            <th>Service</th>
            <th>Description</th>
            <th>Price</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowSpan={services.length+1}>{ownerName}</td>
          </tr>
          {services.map((service) => (
            <tr key={service._id}>
              <td>{service.service_name}</td>
              <td>{service.description}</td>
              <td>{service.price}</td>
              <td>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`checkbox-${service._id}`}
                  checked={selectedServices.includes(service._id)}
                  onChange={() => handleSelectService(service._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleBookServices} disabled={selectedServices.length === 0}>
        Book Selected Services
      </button>
    </div>

    </div>
  );
};
