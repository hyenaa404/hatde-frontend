import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingLayout from '../layouts/LandingLayout';
import Setting from '../pages/Setting';
import LoginForm from '../features/authenticate/components/LoginForm';
import LandingPage from '../pages/landing/LandingPage';
import RegisterForm from '../features/authenticate/components/RegisterForm';
import PrivateRoute from './private-route';
import MainLayout from '../layouts/MainLayout';
import Logout from '../features/authenticate/pages/Logout';
import CartForm from '../features/manage-cart/components/CartForm';
import UserProfile from '../features/authenticate/pages/UserProfile';
import BookingForm from '../features/booking/pages/BookingForm';
import AccessoryServices from '../pages/service-listing/AccessoryServices';
import WeddingServices from '../pages/service-listing/WeddingServices';
import ServiceDetail from '../pages/service-listing/ServiceDetail';
import BookingHistory from '../features/booking/pages/BookingHistory';
import PaymentPage from '../features/booking/pages/PaymentPage';

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <LandingLayout />,
//     children: [
//       { index: true, element: <LandingPage /> },           
//       { path: 'register', element: <Register /> },    
//       {path: 'login', element: <LoginForm/>},
//       {path: 'home', element: <PrivateRoute><Home/></PrivateRoute>}
//     ]
//   }
// ]);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingLayout />,
    children: [
      { index: true, element: <LandingPage /> },
      { path: 'register', element: <RegisterForm /> },
      { path: 'login', element: <LoginForm /> },
      { path: 'wedding', element: <WeddingServices/> },
      { path: 'accessory', element: <AccessoryServices/> },
      { path: 'service-detail/:id', element: <ServiceDetail/> }
    ]
  },
  {
    path: '/',
    element: <PrivateRoute><MainLayout /></PrivateRoute>,
    children: [
      { path: 'setting', element: <Setting /> },
      { path: 'booking', element: <BookingForm /> },
      { path: 'logout', element: <Logout /> },
      { path: 'profile', element: <UserProfile /> },
      { path: 'cart', element: <CartForm /> },
      { path: 'booking-history', element: <BookingHistory /> },
      { path: 'payment', element: <PaymentPage /> },
      
      
    ]
  }
]);


const AppRouter = () => <RouterProvider router={router} />;
export default AppRouter;


{/* <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        }
      />
    </Routes> */}