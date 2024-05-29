// frontend/src/components/NavBar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/signin');
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch('http://localhost:5000/users/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      const result = await response.json();
      if (response.ok) {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/signup');
      } else {
        console.error(result.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      // Fetch user profile if token is available and user is not set
      const fetchUserProfile = async () => {
        try {
          const response = await fetch('http://localhost:5000/users/profile', {
            headers: {
              'x-auth-token': token,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUser(data);
          } else {
            localStorage.removeItem('token');
            navigate('/signin');
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
          localStorage.removeItem('token');
          navigate('/signin');
        }
      };
      fetchUserProfile();
    }
  }, [user, setUser, navigate]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link className="navbar-logo" to="/home">Real Estate</Link>
        <button className="navbar-toggle" type="button" onClick={handleToggle}>
          ☰
        </button>
        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <ul>
            <li className="nav-item">
              <Link className="nav-link" to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/properties" onClick={() => setMenuOpen(false)}>Property List</Link>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/sell-property" onClick={() => setMenuOpen(false)}>Sell Property</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/my-properties" onClick={() => setMenuOpen(false)}>My Properties</Link>
                </li>
                <li className="nav-item dropdown">
                  <button className="nav-link dropdown-toggle" onClick={handleToggle}>Account</button>
                  <div className="dropdown-menu">
                    <button className="dropdown-item" onClick={() => { handleLogout(); setMenuOpen(false); }}>Logout</button>
                    <button className="dropdown-item" onClick={() => { handleDeleteAccount(); setMenuOpen(false); }}>Delete Account</button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin" onClick={() => setMenuOpen(false)}>Sign In</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;























