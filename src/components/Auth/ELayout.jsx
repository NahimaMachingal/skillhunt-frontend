// src/components/Admin/AdminLayout.jsx
import React from 'react';
import ENavbar from './ENavbar'
import EmployeeSidebar from '../employer/EmployeeSidebar';

const Layout = ({ children }) => {
  return (
    
      <div className="flex">
      <EmployeeSidebar /> {/* Include the EmployeeSidebar */}
      <div className="flex-1">
      <ENavbar />
      <div className="container mx-auto mt-8">
        {children} {/* Render the child components, such as AdminHome */}
      </div>
      </div>
    </div>
  );
};

export default Layout;
