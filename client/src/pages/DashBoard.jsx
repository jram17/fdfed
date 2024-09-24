import React from 'react';
import { Button, ConfigProvider, Flex, Tooltip } from 'antd';
import { TbHomeShare } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import DashBoardSideDash from '../components/DashBoardSideDash';
import ApartmentTable from '../components/ApartmentsTable';

function DashBoard() {
  return (
    <div className="w-full flex items-end justify-end">
      <DashBoardSideDash />
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
      <div className="h-screen max-h-[100vh] w-[70vw]">
        <ApartmentTable />
      </div>
    </div>
  );
}

export default DashBoard;
