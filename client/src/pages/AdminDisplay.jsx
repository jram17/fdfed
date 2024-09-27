import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AdminApartmentsDisplay } from '../components/antDesignUI/TableUi';

function AdminDisplay() {
  axios.defaults.withCredentials = true;
  const [apartments, setApartments] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/details');
        console.log(response.data);
        if (response.status === 200) {
          const apartments_table = response.data.apartments?.map((ele) => {
            return {
              apartment_name: ele.apartment_name,
              ownername: ele.ownername,
              address: ele.address,
              subscription: ele.subscription,
              no_of_residents: ele.resident_id.length, // Assuming resident_id is an array
            };
          });

          setApartments(apartments_table);
        }
      } catch (error) {
        console.error(error);
        alert('Error in fetching details: ' + error.message);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <div className="w-full items-center justify-center">
      <div className="w-full flex flex-col gap-4">
        <p className="text-red-600 text-3xl w-full flex items-center justify-start">
          Apartments
        </p>
        <AdminApartmentsDisplay data={apartments} />
      </div>
    </div>
  );
}

export default AdminDisplay;
