import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingLayout from '../layouts/LandingLayout';
import Home from '../pages/Home';
import Setting from '../pages/Setting';
import LoginForm from '../features/authenticate/components/LoginForm';
import FileViewer from '../features/file/components/FileViewer';
import LandingPage from '../pages/LandingPage';
import RegisterForm from '../features/authenticate/components/RegisterForm';
import PrivateRoute from './private-route';
import MainLayout from '../layouts/MainLayout';
import Logout from '../features/authenticate/pages/Logout';
import { LoginGoogle } from '../features/authenticate/components/LoginGoogle';
import { RootFolderViewer } from '../features/folder/components/RootFolderViewer';
import { FolderViewer } from '../features/folder/components/FolderViewer';

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
      { path: 'login', element: <LoginForm /> }
    ]
  },
  {
    path: '/',
    element: <PrivateRoute><MainLayout /></PrivateRoute>,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'setting', element: <Setting /> },
      { path: 'file/:fileID', element: <FileViewer /> },
      { path: 'logout', element: <Logout /> },
      { path: 'login-google', element: <LoginGoogle /> },
      { path: 'folder', element: <RootFolderViewer/>},
      { path: 'folder/:folderID', element: <FolderViewer/>}
      
      
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