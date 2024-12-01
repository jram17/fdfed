import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './DashBoard/SideBar/SideBar';
const DashBoardLayout = () => {
  return (
    <div>
      <SideBar />
      <Outlet />
    </div>
  );
};

export default DashBoardLayout;
