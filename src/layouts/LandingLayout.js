
import React from 'react';
import {Link, Outlet } from 'react-router-dom';
import {LandingNavbar} from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const LandingLayout = () => {
  return (
    <div>
      <LandingNavbar />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default LandingLayout;
