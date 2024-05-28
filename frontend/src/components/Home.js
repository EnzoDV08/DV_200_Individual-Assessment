import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import Footer from './Footer';
import '../styles.css';

const Home = ({ user, setUser }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 4;

  const properties = [
    { _id: '1', title: 'Modern Family Home', price: 350000, location: 'Los Angeles, CA', image: 'https://barcarchitects.com/wp-content/uploads/2019/12/1-White-Oaks.jpg' },
    { _id: '2', title: 'Luxury Villa', price: 1200000, location: 'Beverly Hills, CA', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSceSS-VJQQKiSM8ZekjJwAaadk9GArld51Jw&s' },
    { _id: '3', title: 'Cozy Cottage', price: 250000, location: 'Austin, TX', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLfc8YJfH_4g984RGrqyXp6QZyxU_cktD_KQ&s' },
    { _id: '4', title: 'Downtown Apartment', price: 450000, location: 'New York, NY', image: 'https://cdn.vox-cdn.com/thumbor/M1xjj9faNgp9YKQcY-EUt6zlcm4=/0x0:1921x1081/1200x800/filters:focal(808x388:1114x694)/cdn.vox-cdn.com/uploads/chorus_image/image/54665147/Broadway_and_Magnolia_apartments_1.0.jpg' },
    { _id: '5', title: 'Suburban House', price: 300000, location: 'Seattle, WA', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn-JnGAyas_wNrl1g1cjix6D4luT6maTx0bQ&s' },
    { _id: '6', title: 'Beachfront Property', price: 800000, location: 'Miami, FL', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa5BxYW0s1clLCo_E0fZV4kNEaKduUwArB2Q&s' },
    { _id: '7', title: 'Mountain Retreat', price: 500000, location: 'Denver, CO', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQhp1_NwtBy-uC9-Ux1N02VHe95OApx2AZmiwFdTrxQw&s' },
    { _id: '8', title: 'Country Estate', price: 750000, location: 'Nashville, TN', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmms0wtZiP8IeMW37QCxIdIyX35c-B2Dbv9oyF3Fko-A&s' },
    { _id: '9', title: 'Urban Loft', price: 400000, location: 'San Francisco, CA', image: 'https://i.ytimg.com/vi/CLJ7CgqwBvA/maxresdefault.jpg' },
    { _id: '10', title: 'Historic Mansion', price: 1500000, location: 'Savannah, GA', image: 'https://hips.hearstapps.com/veranda/assets/16/19/1462910738-dielmann-wcsqe6.jpg' },
    { _id: '11', title: 'Eco-friendly Home', price: 600000, location: 'Portland, OR', image: 'https://www.christiesrealestate.com/blog/wp-content/uploads/2022/03/eco-friendly-luxury-villa-jpg.webp' },
    { _id: '12', title: 'Penthouse Suite', price: 2000000, location: 'Chicago, IL', image: 'https://media.cnn.com/api/v1/images/stellar/prod/171011145822-penthouse-suites-william-vale-terrace.jpg?q=w_3019,h_2012,x_0,y_0,c_fill' },
    { _id: '13', title: 'Modern Townhouse', price: 500000, location: 'San Diego, CA', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_VFgl7y0g5ARDFr9oix8gVQXzONdbinRAPnN2iYAQKQ&s' },
    { _id: '14', title: 'Luxury Condo', price: 700000, location: 'Las Vegas, NV', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCADLBvscohUTMYxOnwHakQWt9bfukFuh-8SlSlzoEZg&s' },
    { _id: '15', title: 'Riverside Cottage', price: 450000, location: 'Sacramento, CA', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLqr8E3fxkh4Qwbe5aAdzng3ouadJEfW5tyXWftja_bg&s' },
    { _id: '16', title: 'Studio Apartment', price: 200000, location: 'Boston, MA', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa2FNTdHSivY4PwUWajrf8xOgGM4e-fVGXFA&s' }
  ];

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(search.toLowerCase()) ||
    property.location.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home-container">
      <div className="hero-section bg-primary text-white text-center py-5">
        <div className="container">
          <h1>Find Your Dream Home</h1>
          <p>Explore the best properties in your area</p>
          <input
            type="text"
            className="form-control mt-3"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="featured-section container my-5">
        <h2>Featured Properties</h2>
        <div className="properties-container">
          {currentProperties.map((property) => (
            <div key={property._id}>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
        <nav>
          <ul className="pagination justify-content-center">
            {[...Array(Math.ceil(filteredProperties.length / propertiesPerPage)).keys()].map(number => (
              <li key={number + 1} className="page-item">
                <button onClick={() => paginate(number + 1)} className="page-link">
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Footer />
    </div>
  );
};

export default Home;














