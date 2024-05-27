import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

const NavBar = ({ user, setUser }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/signin');
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user.email }),
      });
      const result = await response.json();
      if (response.ok) {
        setUser(null);
        navigate('/signup');
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Real Estate</h1>
        <ul className="navbar-links">
          <li><Link to="/home">Home</Link></li>
          {user ? (
            <li className="navbar-dropdown">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                Settings
              </button>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleLogout}>Logout</button>
                  <button onClick={handleDeleteAccount}>Delete Account</button>
                </div>
              )}
            </li>
          ) : (
            <>
              <li><Link to="/signin">Sign In</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;


