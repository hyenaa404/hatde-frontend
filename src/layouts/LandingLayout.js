import React from 'react';
import {Link, Outlet } from 'react-router-dom';
import {HomeNavbar, LandingNavbar} from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useSelector, useDispatch } from 'react-redux';

const LandingLayout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated? <HomeNavbar/>:<LandingNavbar />}
      <main className="main-content flex-1">
        <Outlet />
      </main>
      <Footer/>
    </div>
  );
};

export default LandingLayout;
