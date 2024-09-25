import React, { useEffect, useState } from 'react';
import {
  getApartmentDetails,
  UserDetailsforApartment,
} from '../utils/DashBoardUtils';
import { useQuery } from '@tanstack/react-query';
import { DataTable, UserApartments_table } from './antDesignUI/TableUi';
import { getCreatedData } from '../utils/Roomutils';
function DataTableDisplay() {
  const [tableData, setTableData] = useState([]);
  const [UserApartments, setUserApartments] = useState([]);
  // useQuery hook should be defined at the top level of the component
  const {
    data: apartment_details,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['apartment_details'],
    queryFn: getApartmentDetails,
  });

  useEffect(() => {
    if (apartment_details) {
      const newTableData = [];
      const userApartmentsData = [];

      apartment_details.apartments.forEach((ele) => {
        if (ele._id) {
          // Extracting values for table data
          const {
            apartment_name,
            registration_num,
            state,
            subscription,
            pincode,
            createdAt,
            flat_id,
            ownername,
            username,
            address,
            designation,
          } = ele;

          // Setting the data for the table
          newTableData.push({
            name: apartment_name,
            state: state,
            registration_number: registration_num,
            subscription: subscription,
            started_at: getCreatedData(createdAt),
            address: pincode,
          });

          // Setting the data for user apartments
          userApartmentsData.push({
            apt_name: apartment_name,
            name: username,
            owner_name: ownername,
            flat_id: flat_id,
            address: address,
            designation: designation,
          });
        }
      });

      // Set the optimized data to state
      setTableData(newTableData);
      setUserApartments(userApartmentsData);
    }
  }, [apartment_details]);
  console.log(UserApartments, tableData);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  return (
    <div className="rounded-md flex flex-col w-full items-center justify-center">
      {/* Title Section */}
      <div className="text-red-700 text-5xl w-full text-center mb-4">
        Apartment Details
      </div>

      {/* DataTable Section */}
      <div className="flex flex-col items-center justify-center max-w-[75vw] w-full mb-6">
        <DataTable data={tableData} />
      </div>

      {/* UserApartments Table Section */}
      <div className="flex flex-col items-center justify-center max-w-[75vw] w-full">
        <UserApartments_table data={UserApartments} />
      </div>
    </div>
  );
}

export { DataTableDisplay };
