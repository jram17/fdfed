import React from 'react';
import { Button, ConfigProvider, Flex, Tooltip } from 'antd';
import { TbHomeShare } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import DashBoardSideDash from '../components/DashBoardSideDash';
import { DataTableDisplay } from '../components/ApartmentsTable';
import { useLocation } from 'react-router-dom';
import AddLog from '../components/Addlog';

function DashBoard() {
  const location = useLocation();
  return (
    <div className="w-full flex flex-col items-end justify-start relative">
      {/* Sidebar */}
      <DashBoardSideDash />

      {/* Floating Go Back Button */}
      <Link to={'/'}>
        <span className="fixed bottom-8 right-5">
          <Tooltip title="Go back to Homepage">
            <Button
              type="primary"
              shape="circle"
              icon={<TbHomeShare size={20} />}
            />
          </Tooltip>
        </span>
      </Link>

      {/* Main Content Area */}
      <div className="h-screen max-h-[100vh] w-[85vw] max-w-[85vw] flex items-center justify-center">
        {location.pathname === '/dashboard/myapartments' && (
          <DataTableDisplay />
        )}
        {location.pathname === '/dashboard' && <AddLog />}
        {location.pathname === '/dashboard/security-log' && <AddLog />}
        {location.pathname === '/dashboard/parcel-log'}
      </div>
    </div>
  );
}

export default DashBoard;
