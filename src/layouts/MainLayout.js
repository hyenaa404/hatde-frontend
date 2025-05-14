
import React from 'react';
import {Link, Outlet } from 'react-router-dom';
import {HomeNavbar} from '../components/common/Navbar';

const MainLayout = () => {
  return (
    <div>
      <HomeNavbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
