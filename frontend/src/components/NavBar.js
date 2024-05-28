import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles.css';

const NavBar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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

  const handleToggle = () => {
    setMenuOpen(!menuOpen);
  };

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










