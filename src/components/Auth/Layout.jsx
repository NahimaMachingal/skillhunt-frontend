// src/components/Admin/AdminLayout.jsx
import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        {children} {/* Render the child components, such as AdminHome */}
      </div>
    </>
  );
};

export default Layout;
