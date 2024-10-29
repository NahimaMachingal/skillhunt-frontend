// AdminLayout.jsx
import React from 'react';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen"> {/* Added h-screen to make the layout cover the full height */}
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminNavbar /> {/* Ensure Navbar is displayed at the top */}
        <div className="flex-1 container mx-auto mt-8 overflow-y-auto"> {/* Added overflow-y-auto */}
          {children} {/* Render the child components, such as AdminJobList */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
