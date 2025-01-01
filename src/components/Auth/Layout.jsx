// src/components/Auth/Layout.jsx
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8">
        {children} {/* Render the child components, such as AdminHome */}
      </div>
      <Footer /> 
    </>
  );
};

export default Layout;
