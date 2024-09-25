import React, { useEffect, useState } from 'react';
import { fetchisRole, fetchRoomDetails } from '../utils/Roomutils';
import { useQuery } from '@tanstack/react-query';

const ResidentTable = () => {
  const [apartmentId, setApartmentId] = useState(null);
  const [name, setName] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const [apartmentUsers, setApartmentUsers] = useState([]);

  // Fetch room details only when apartmentId is available
  const {
    data: roomdetailsData,
    isError: detailserror,
    isLoading: detailsloading,
  } = useQuery({
    queryKey: ['details', apartmentId],
    queryFn: () => fetchRoomDetails(apartmentId),
    enabled: !!apartmentId, // Only run query when apartmentId exists
  });

  // Update apartmentUsers only when roomdetailsData is available and has apartment_users
  useEffect(() => {
    if (roomdetailsData?.apartment_users) {
      setApartmentUsers(roomdetailsData.apartment_users);
    } else {
      setApartmentUsers([]); // Ensure it resets if roomdetailsData is undefined
    }
  }, [roomdetailsData]);

  // Fetch security role details and apartmentId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchisRole('Security');
        if (data?.details?.apartment_id) {
          setApartmentId(data.details.apartment_id);
        } else {
          console.error('You are not authorized as security.');
        }
      } catch (error) {
        console.error('Error fetching role data:', error);
      }
    };
    fetchData();
  }, []);

  // Log function for adding resident logs
  const addLog = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/residents/add-log`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // Ensures that cookies are sent with the request
          body: JSON.stringify({
            apartment_id: apartmentId,
            name,
            entry_time: entryTime,
            exit_time: exitTime,
          }),
        }
      );

      if (!response.ok) {
        // If the response is not okay (status not in the range 200-299)
        const errorData = await response.json();
        console.error('Error:', errorData);
        throw new Error(
          `Failed to add log: ${errorData.error || 'Unknown error'}`
        );
      }

      // If the request was successful
      const responseData = await response.json();
      console.log('Log added successfully:', responseData);

      // Clear the input fields after successful submission
      setName('');
      setEntryTime('');
      setExitTime('');
    } catch (error) {
      console.error('Error adding log:', error.message);
    }

    //To clear up the fields
    setName('');
    setEntryTime('');
    setExitTime('');
    // Your log logic here
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg shadow-md">
      {apartmentId != null ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Add Log for Resident ID:</h2>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name:</label>
            <select
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            >
              <option value="" disabled>
                Select a name
              </option>
              {apartmentUsers.length > 0 ? (
                apartmentUsers.map((ele) => (
                  <option key={ele.apartment_id} value={ele.apartment_name}>
                    {ele.apartment_name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  No users available
                </option>
              )}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Entry Time:</label>
            <input
              type="datetime-local"
              value={entryTime}
              onChange={(e) => setEntryTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Exit Time:</label>
            <input
              type="datetime-local"
              value={exitTime}
              onChange={(e) => setExitTime(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <button
            onClick={addLog}
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Log
          </button>
        </div>
      ) : (
        <div className="text-center">
          You cannot access this page as you are not authorized as security.
        </div>
      )}
    </div>
  );
};

export default ResidentTable;
