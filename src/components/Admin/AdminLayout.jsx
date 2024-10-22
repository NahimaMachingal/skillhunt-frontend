// src/components/Admin/AdminLayout.jsx
import React from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className='flex'>
      <AdminSidebar />
      <div className='flex-1'>
        
      <AdminNavbar /> {/* Display the Navbar on all admin pages */}
      <div className="container mx-auto mt-8">
        {children} {/* Render the child components, such as AdminHome */}
      </div>
    </div>
    </div>
  );
};

export default AdminLayout;
