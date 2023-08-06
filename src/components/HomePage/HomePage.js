import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export const HomePage = () => {
  return (
    <div className="homepage">
      <header>
        <nav>
          <div className="logo">VPR Motor Service</div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/Login">Log In</Link></li>
            <li><Link to="/Signup">Sign Up</Link></li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to VPR Motor Service</h1>
            <p>Quality bike service and repairs for all types of bikes.</p>
            <Link to="/Login" className="cta-btn">Explore Services</Link>
          </div>
        </section>
        <section className="services">
          <div className="service-card">
            <h2>Regular Maintenance</h2>
            <p>Keep your bike in top condition with our regular maintenance services.</p>
          </div>
          <div className="service-card">
            <h2>Repairs &amp; Upgrades</h2>
            <p>Get your bike fixed or upgrade its components for better performance.</p>
          </div>
        </section>
      </main>
      <footer>
        <p>&copy; {new Date().getFullYear()} Bike Service. All rights reserved.</p>
      </footer>
    </div>
  );
};
