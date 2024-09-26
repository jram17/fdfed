import React, { useState } from 'react';
import { Button, ConfigProvider, Flex, Tooltip } from 'antd';
import { TbHomeShare } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { DataTableDisplay } from '../components/ApartmentsTable';
import { useLocation } from 'react-router-dom';
import AddLog from '../components/Addlog';
import AddParcel from '../components/AddParcel';
import OwnerVerify from '../components/OwnerVerify';
import { EventForm } from '../components/EditResidentDetails';
import { SecurityTabs } from '../components/rsuiteUI/UserDetailsTabs';
function DashBoard() {
  const location = useLocation();
  const [Role, setRole] = useState('Resident');
  console.log(Role);

  return (
    <div className="w-full flex flex-col items-center justify-start relative mt-5 gap-8">
      <div className="form-item flex-col w-[20vw] flex items-center justify-center">
        <label className={` form-label !text-3xl`}>Select Your Role</label>
        <select
          id="role"
          defaultValue={'Resident'}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        >
          <option
            value="Resident"
            selected
            className="bg-background text-muted-foreground"
          >
            Resident
          </option>
          <option
            value="Owner"
            selected
            className="bg-background text-muted-foreground"
          >
            Owner
          </option>
          <option
            value="Security"
            selected
            className="bg-background text-muted-foreground"
          >
            Security
          </option>
        </select>
      </div>{' '}
      {/* Sidebar */}
      {/* <DashBoardSideDash /> */}
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
      {/* <div className="h-full max-h-[100vh] w-[85vw] max-w-[85vw] flex items-top flex-col justify-center">
        {location.pathname === '/dashboard/myapartments' && (
          <DataTableDisplay />
        )}
        {location.pathname === '/dashboard/owner/createevents' && (
          <OwnerVerify>
            <EventForm />
          </OwnerVerify>
        )}
        {location.pathname === '/dashboard'}
        {location.pathname === '/dashboard/security-log' && <AddLog />}
        {location.pathname === '/dashboard/parcel-log' && <AddParcel />}
      </div> */}{' '}
      {Role === 'Resident' && (
        <div className="flex items-center justify-center">
          <DataTableDisplay />
        </div>
      )}
      {Role === 'Security' && (
        <div className="flex items-center justify-center card !border-none p-5">
          <SecurityTabs />
        </div>
      )}
      {Role === 'Owner' && (
        <div className="flex items-center justify-center card !border-none p-5">
          <OwnerVerify />
        </div>
      )}
    </div>
  );
}

export default DashBoard;
