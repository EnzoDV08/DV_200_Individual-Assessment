import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles.css';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/properties');
        const hardcodedProperties = [
          { _id: '1', title: 'Modern Family Home', price: 350000, location: 'Los Angeles, CA', imageUrl: 'https://barcarchitects.com/wp-content/uploads/2019/12/1-White-Oaks.jpg' },
          { _id: '2', title: 'Luxury Villa', price: 1200000, location: 'Beverly Hills, CA', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSceSS-VJQQKiSM8ZekjJwAaadk9GArld51Jw&s' },
          { _id: '3', title: 'Cozy Cottage', price: 250000, location: 'Austin, TX', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLfc8YJfH_4g984RGrqyXp6QZyxU_cktD_KQ&s' },
          { _id: '4', title: 'Downtown Apartment', price: 450000, location: 'New York, NY', imageUrl: 'https://cdn.vox-cdn.com/thumbor/M1xjj9faNgp9YKQcY-EUt6zlcm4=/0x0:1921x1081/1200x800/filters:focal(808x388:1114x694)/cdn.vox-cdn.com/uploads/chorus_image/image/54665147/Broadway_and_Magnolia_apartments_1.0.jpg' },
          { _id: '5', title: 'Suburban House', price: 300000, location: 'Seattle, WA', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn-JnGAyas_wNrl1g1cjix6D4luT6maTx0bQ&s' },
          { _id: '6', title: 'Beachfront Property', price: 800000, location: 'Miami, FL', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa5BxYW0s1clLCo_E0fZV4kNEaKduUwArB2Q&s' },
          { _id: '7', title: 'Mountain Retreat', price: 500000, location: 'Denver, CO', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQhp1_NwtBy-uC9-Ux1N02VHe95OApx2AZmiwFdTrxQw&s' },
          { _id: '8', title: 'Country Estate', price: 750000, location: 'Nashville, TN', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmms0wtZiP8IeMW37QCxIdIyX35c-B2Dbv9oyF3Fko-A&s' },
          { _id: '9', title: 'Urban Loft', price: 400000, location: 'San Francisco, CA', imageUrl: 'https://i.ytimg.com/vi/CLJ7CgqwBvA/maxresdefault.jpg' },
          { _id: '10', title: 'Historic Mansion', price: 1500000, location: 'Savannah, GA', imageUrl: 'https://hips.hearstapps.com/veranda/assets/16/19/1462910738-dielmann-wcsqe6.jpg' },
          { _id: '11', title: 'Eco-friendly Home', price: 600000, location: 'Portland, OR', imageUrl: 'https://www.christiesrealestate.com/blog/wp-content/uploads/2022/03/eco-friendly-luxury-villa-jpg.webp' },
          { _id: '12', title: 'Penthouse Suite', price: 2000000, location: 'Chicago, IL', imageUrl: 'https://media.cnn.com/api/v1/images/stellar/prod/171011145822-penthouse-suites-william-vale-terrace.jpg?q=w_3019,h_2012,x_0,y_0,c_fill' },
          { _id: '13', title: 'Modern Townhouse', price: 500000, location: 'San Diego, CA', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VFgl7y0g5ARDFr9oix8gVQXzONdbinRAPnN2iYAQKQ&s' },
          { _id: '14', title: 'Luxury Condo', price: 700000, location: 'Las Vegas, NV', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCADLBvscohUTMYxOnwHakQWt9bfukFuh-8SlSlzoEZg&s' },
          { _id: '15', title: 'Riverside Cottage', price: 450000, location: 'Sacramento, CA', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLqr8E3fxkh4Qwbe5aAdzng3ouadJEfW5tyXWftja_bg&s' },
          { _id: '16', title: 'Studio Apartment', price: 200000, location: 'Boston, MA', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa2FNTdHSivY4PwUWajrf8xOgGM4e-fVGXFA&s' },
          { _id: '17', title: 'Rustic Cabin', price: 350000, location: 'Asheville, NC', imageUrl: 'https://cdn.onekindesign.com/wp-content/uploads/2019/08/Cozy-Rustic-Cabin-Yellowstone-Traditions-03-1-Kindesign.jpg' },
          { _id: '18', title: 'Countryside Bungalow', price: 400000, location: 'Burlington, VT', imageUrl: 'https://via.placeholder.com/400x300' },
          { _id: '19', title: 'Urban Loft', price: 380000, location: 'Philadelphia, PA', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeZ5l4dl1MZzaFyoYOQexFHoCxoIO_vbINhQ&s' },
          { _id: '20', title: 'Lake House', price: 950000, location: 'Lake Tahoe, CA', imageUrl: 'https://dropinblog.net/34246798/files/featured/Lake_House.jpg' }
        ];
        setProperties([...response.data, ...hardcodedProperties]);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(search.toLowerCase()) ||
    property.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="property-list container">
      <h2 className="text-center my-5">Available Properties</h2>
      <div className="search-bar-container mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search properties..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredProperties.map((property) => (
          <div key={property._id} className="col-md-4 mb-4">
            <div className="property-item card">
              <img src={property.imageUrl || property.imageUrls[0]} className="card-img-top" alt={property.title} />
              <div className="card-body">
                <h5 className="card-title">{property.title}</h5>
                <p className="card-text">${property.price.toLocaleString()}</p>
                <p className="card-text">{property.location}</p>
                <Link to={`/properties/${property._id}`} className="btn btn-primary">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyList;





