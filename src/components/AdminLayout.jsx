import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const AdminLayout = ({ handleLogout }) => {
  return (
    <div className="flex">
      <Sidebar handleLogout={handleLogout} />
      <div className="ml-64 p-6 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
