import React, { useEffect, useState } from 'react';
import { getApartmentDetails } from '../utils/DashBoardUtils';
import { useQuery } from '@tanstack/react-query';
import TableUI from './antDesignUI/TableUi';
import { getCreatedData } from '../utils/Roomutils';
function DataTable() {
  const [tableData, setTableData] = useState([]);
  const {
    data: apartment_details,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['apartment_details'],
    queryFn: getApartmentDetails,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading data.</div>;
  }

  useEffect(() => {
    if (apartment_details) {
      const newTableData = apartment_details.apartments
        .map((ele) => {
          if (ele._id) {
            const {
              address,
              apartment_name,
              emergency_email,
              ownername,
              registration_num,
              state,
              subscription,
              pincode,
            } = ele;

            return {
              name: apartment_name,
              state: state,
              registration_number: registration_num,
              subscription: subscription,
              started_at: getCreatedData(ele.createdAt),
              address: pincode,
            };
          }
          return null;
        })
        .filter(Boolean);

      setTableData((prev) => [...newTableData]);
    }
  }, [apartment_details, isError, isLoading]);

  return (
    <div className="rounded-md ">
      <div>
        <TableUI data={tableData} />
      </div>
    </div>
  );
}

export default DataTable;
