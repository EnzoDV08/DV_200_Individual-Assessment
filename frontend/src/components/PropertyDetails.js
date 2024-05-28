import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import '../styles.css';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [contactDate, setContactDate] = useState(new Date());
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      const properties = [
        { _id: '1', title: 'Modern Family Home', price: 350000, location: 'Los Angeles, CA', imageUrls: ['https://barcarchitects.com/wp-content/uploads/2019/12/1-White-Oaks.jpg', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'John Doe', phone: '123-456-7890', email: 'enzo.devittorio5@gmail.com' }},
        { _id: '2', title: 'Luxury Villa', price: 1200000, location: 'Beverly Hills, CA', imageUrls: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSceSS-VJQQKiSM8ZekjJwAaadk9GArld51Jw&s', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Jane Smith', phone: '234-567-8901', email: 'jane.smith@example.com' }},
        { _id: '3', title: 'Cozy Cottage', price: 250000, location: 'Austin, TX', imageUrls: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLfc8YJfH_4g984RGrqyXp6QZyxU_cktD_KQ&s', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Emily Johnson', phone: '345-678-9012', email: 'emily.johnson@example.com' }},
        { _id: '4', title: 'Downtown Apartment', price: 450000, location: 'New York, NY', imageUrls: ['https://cdn.vox-cdn.com/thumbor/M1xjj9faNgp9YKQcY-EUt6zlcm4=/0x0:1921x1081/1200x800/filters:focal(808x388:1114x694)/cdn.vox-cdn.com/uploads/chorus_image/image/54665147/Broadway_and_Magnolia_apartments_1.0.jpg', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Michael Brown', phone: '456-789-0123', email: 'michael.brown@example.com' }},
        { _id: '5', title: 'Suburban House', price: 300000, location: 'Seattle, WA', imageUrls: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn-JnGAyas_wNrl1g1cjix6D4luT6maTx0bQ&s', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Sarah Davis', phone: '567-890-1234', email: 'sarah.davis@example.com' }},
        { _id: '6', title: 'Beachfront Property', price: 800000, location: 'Miami, FL', imageUrls: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa5BxYW0s1clLCo_E0fZV4kNEaKduUwArB2Q&s', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'David Wilson', phone: '678-901-2345', email: 'david.wilson@example.com' }},
        { _id: '7', title: 'Mountain Retreat', price: 500000, location: 'Denver, CO', imageUrls: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQhp1_NwtBy-uC9-Ux1N02VHe95OApx2AZmiwFdTrxQw&s', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Laura Martinez', phone: '789-012-3456', email: 'laura.martinez@example.com' }},
        { _id: '8', title: 'Country Estate', price: 750000, location: 'Nashville, TN', imageUrls: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmms0wtZiP8IeMW37QCxIdIyX35c-B2Dbv9oyF3Fko-A&s', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'James Anderson', phone: '890-123-4567', email: 'james.anderson@example.com' }},
        { _id: '9', title: 'Urban Loft', price: 400000, location: 'San Francisco, CA', imageUrls: ['https://i.ytimg.com/vi/CLJ7CgqwBvA/maxresdefault.jpg', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Patricia Thomas', phone: '901-234-5678', email: 'patricia.thomas@example.com' }},
        { _id: '10', title: 'Historic Mansion', price: 1500000, location: 'Savannah, GA', imageUrls: ['https://hips.hearstapps.com/veranda/assets/16/19/1462910738-dielmann-wcsqe6.jpg', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Robert Jackson', phone: '012-345-6789', email: 'robert.jackson@example.com' }},
        { _id: '11', title: 'Eco-friendly Home', price: 600000, location: 'Portland, OR', imageUrls: ['https://www.christiesrealestate.com/blog/wp-content/uploads/2022/03/eco-friendly-luxury-villa-jpg.webp', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Linda White', phone: '123-456-7890', email: 'linda.white@example.com' }},
        { _id: '12', title: 'Penthouse Suite', price: 2000000, location: 'Chicago, IL', imageUrls: ['https://media.cnn.com/api/v1/images/stellar/prod/171011145822-penthouse-suites-william-vale-terrace.jpg?q=w_3019,h_2012,x_0,y_0,c_fill', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Mark Harris', phone: '234-567-8901', email: 'mark.harris@example.com' }},
        { _id: '13', title: 'Modern Townhouse', price: 500000, location: 'San Diego, CA', imageUrls: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VFgl7y0g5ARDFr9oix8gVQXzONdbinRAPnN2iYAQKQ&s', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Barbara Clark', phone: '345-678-9012', email: 'barbara.clark@example.com' }},
        { _id: '14', title: 'Luxury Condo', price: 700000, location: 'Las Vegas, NV', imageUrls: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCADLBvscohUTMYxOnwHakQWt9bfukFuh-8SlSlzoEZg&s', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Steven Lewis', phone: '456-789-0123', email: 'steven.lewis@example.com' }},
        { _id: '15', title: 'Riverside Cottage', price: 450000, location: 'Sacramento, CA', imageUrls: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLqr8E3fxkh4Qwbe5aAdzng3ouadJEfW5tyXWftja_bg&s', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Susan Young', phone: '567-890-1234', email: 'susan.young@example.com' }},
        { _id: '16', title: 'Studio Apartment', price: 200000, location: 'Boston, MA', imageUrls: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa2FNTdHSivY4PwUWajrf8xOgGM4e-fVGXFA&s', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Paul Allen', phone: '678-901-2345', email: 'paul.allen@example.com' }},
        { _id: '17', title: 'Rustic Cabin', price: 350000, location: 'Asheville, NC', imageUrls: ['https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Donna King', phone: '789-012-3456', email: 'donna.king@example.com' }},
        { _id: '18', title: 'Countryside Bungalow', price: 400000, location: 'Burlington, VT', imageUrls: ['https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Daniel Wright', phone: '890-123-4567', email: 'daniel.wright@example.com' }},
        { _id: '19', title: 'Urban Loft', price: 380000, location: 'Philadelphia, PA', imageUrls: ['https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Nancy Scott', phone: '901-234-5678', email: 'nancy.scott@example.com' }},
        { _id: '20', title: 'Lake House', price: 950000, location: 'Lake Tahoe, CA', imageUrls: ['https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Gary Lopez', phone: '012-345-6789', email: 'gary.lopez@example.com' }},
        { _id: '21', title: 'Beach House', price: 1250000, location: 'Malibu, CA', imageUrls: ['https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Alice Johnson', phone: '345-678-9012', email: 'alice.johnson@example.com' }},
        { _id: '22', title: 'Luxury Apartment', price: 800000, location: 'Manhattan, NY', imageUrls: ['https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'David Brown', phone: '456-789-0123', email: 'david.brown@example.com' }},
        { _id: '23', title: 'Suburban Home', price: 450000, location: 'Orlando, FL', imageUrls: ['https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Eve Davis', phone: '567-890-1234', email: 'eve.davis@example.com' }},
        { _id: '24', title: 'Penthouse', price: 1500000, location: 'Seattle, WA', imageUrls: ['https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Frank White', phone: '678-901-2345', email: 'frank.white@example.com' }},
        { _id: '25', title: 'Countryside Villa', price: 900000, location: 'Boulder, CO', imageUrls: ['https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300', 'https://via.placeholder.com/400x300'], agent: { name: 'Grace Lee', phone: '789-012-3456', email: 'grace.lee@example.com' }},
      ];
      const property = properties.find((prop) => prop._id === id);
      setProperty(property);
    };
    fetchProperty();
  }, [id]);

  const handleContactAgent = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to sign in to contact the agent.');
      navigate('/signin');
      return;
    }

    setShowAlert(true);
  };

  const handleAlertResponse = async (response) => {
    setShowAlert(false);
    if (response === 'continue') {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:5000/contact/contact-agent', {
          propertyId: property._id,
          agentId: property.agent.email,
          date: contactDate,
        }, {
          headers: {
            'x-auth-token': token,
          },
        });
        alert('Contact request submitted successfully');
        navigate('/home');
      } catch (error) {
        alert('Failed to submit contact request');
        console.error(error);
      }
    }
  };

  if (!property) return <p>Loading...</p>;

  return (
    <div className="property-details">
      <Carousel>
        {property.imageUrls && property.imageUrls.map((url, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100" src={url} alt={`Slide ${index}`} />
          </Carousel.Item>
        ))}
      </Carousel>
      <h2>{property.title}</h2>
      <p>{property.description}</p>
      <p>{property.location}</p>
      <p className="property-price">${property.price.toLocaleString()}</p>

      {property.agent && (
        <div className="agent-details">
          <h3>Contact Agent</h3>
          <p>Name: {property.agent.name}</p>
          <p>Phone: {property.agent.phone}</p>
          <p>Email: {property.agent.email}</p>
          <DatePicker
            selected={contactDate}
            onChange={(date) => setContactDate(date)}
            className="form-control"
          />
          <button onClick={handleContactAgent} className="btn btn-primary mt-2">
            Contact Agent
          </button>
        </div>
      )}

      {showAlert && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h4 style={{ color: 'white' }}>Confirm Contact</h4>
            <p style={{ color: 'white' }}>Do you want to continue contacting the agent?</p>
            <div className="modal-buttons">
              <button onClick={() => handleAlertResponse('continue')} className="btn btn-primary">Continue</button>
              <button onClick={() => handleAlertResponse('cancel')} className="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
