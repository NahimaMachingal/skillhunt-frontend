import React from 'react';
import ENavbar from './ENavbar';
import EmployeeSidebar from '../employer/EmployeeSidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Main Layout with Sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <EmployeeSidebar className="h-screen" />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <ENavbar />
          <div className="flex-1 container mx-auto mt-8">{children}</div>
        </div>
      </div>

      {/* Footer */}
      <Footer className="w-full" />
    </div>
  );
};

export default Layout;
