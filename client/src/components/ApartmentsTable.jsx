import React from 'react';
import { getApartmentDetails } from '../utils/DashBoardUtils';
import { useQuery } from '@tanstack/react-query';

function DataTable({ columns }) {
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

  return (
    <div className="rounded-md border">
      {/* <table className="min-w-full">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.accessor}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {apartment_details?.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={column.accessor}>{row[column.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
}

export default DataTable;
