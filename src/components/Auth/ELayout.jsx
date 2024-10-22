// src/components/Admin/AdminLayout.jsx
import React from 'react';
import ENavbar from './ENavbar'

const Layout = ({ children }) => {
  return (
    <>
      <ENavbar />
      <div className="container mx-auto mt-8">
        {children} {/* Render the child components, such as AdminHome */}
      </div>
    </>
  );
};

export default Layout;
