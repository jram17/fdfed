import React from 'react';
import { Button, ConfigProvider, Flex, Tooltip } from 'antd';
import { TbHomeShare } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import DashBoardSideDash from '../components/DashBoardSideDash';
import { DataTableDisplay } from '../components/ApartmentsTable';

function DashBoard() {
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
        <DataTableDisplay />
      </div>
    </div>
  );
}

export default DashBoard;
