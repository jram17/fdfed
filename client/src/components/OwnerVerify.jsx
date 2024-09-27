import { fetchisRole } from '../utils/Roomutils';
import React, { useState, useEffect } from 'react';
import { EventForm } from './EditResidentDetails';
import OwnerTable from './OwnerTable';
import ApartmentDetails from './ApartmentDetails';
import { ComplaintDashboardDisplay } from './ComplaintDashboardDisplay';
function OwnerVerify() {
  const [apartmentNames, setApartmentNames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apartment_name, setApartmentName] = useState(null);

  console.log(apartmentNames);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchisRole('Owner');
        if (data?.details) {
          setApartmentNames(data.details);
        } else {
          console.error('You are not authorized as owner.');
        }
      } catch (error) {
        console.error('Error fetching role data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-top min-h-screen">
      {isLoading && <div>Loading...</div>}
      {apartmentNames.length > 0 ? (
        <div className="bg-white  p-8 rounded-lg flex flex-col gap-4  w-full">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-red-700">Owner DashBoard</h2>
          </div>
          <OwnerTable apartmentNames={apartmentNames} />

          {/* Card Header */}

          {/* Card Content */}
          <form className="space-y-4">
            <div className="form-item">
              <label
                htmlFor="apartment_name"
                className="block label !text-lg font-medium text-gray-700"
              >
                Select Apartment:
              </label>
              <select
                id="apartment_name"
                className="mt-1 max-w-[40vw] block w-full rounded-md border-gray-300 shadow-sm focus:ring-red-500 focus:border-red-500 sm:text-sm"
                onChange={(event) => {
                  setApartmentName(event.target.value);
                }}
              >
                {apartmentNames.map((apartment, index) => (
                  <option key={index} value={apartment.apartment_id}>
                    {apartment.apartment_name}
                  </option>
                ))}
              </select>
            </div>
          </form>

          {/* Pass prop to children */}
          <div className="w-full  flex flex-col items-center justify-center gap-6">
            {' '}
            <ApartmentDetails apartment_id={apartment_name} />
            <ComplaintDashboardDisplay apartment_id={apartment_name} />
          </div>
        </div>
      ) : (
        <div className="text-center">
          You cannot access this page as you are not authorized as Owner.
        </div>
      )}
    </div>
  );
}

export default OwnerVerify;
