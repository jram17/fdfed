import { useState } from 'react';
import LeftSideDash from '../components/LeftSideDash';

function ComplaintForm({ apartment_id }) {
  const [complaintTitle, setComplaintTitle] = useState('');
  const [complaintType, setComplaintType] = useState('');
  const [complaintDetail, setComplaintDetail] = useState('');
  const [anonymous, setAnonymous] = useState(false); // Default to false (not anonymous)
  const [error, setError] = useState('');

  const roomData = []; // or fetch it from an API or state management

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation logic here

    const complaintData = {
      complaintTitle,
      complaintType,
      complaintDetail,
      apartment_id,
      anonymous, 
    };
    console.log(complaintData);
    setError(''); 

    fetch('http://localhost:5000/complaints', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(complaintData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setComplaintTitle('');
        setComplaintType('');
        setComplaintDetail('');
        alert('Complaint registered successfully');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="flex justify-center mt-10">
      <LeftSideDash roomData={roomData} />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-10 !flex flex-col !items-center !justify-center bg-white rounded-lg shadow-md border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Submit a Complaint
        </h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-5 w-full">
          <label className="block text-sm font-medium text-gray-700">
            Complaint Title
          </label>
          <input
            type="text"
            value={complaintTitle}
            onChange={(e) => setComplaintTitle(e.target.value)}
            className={`mt-1 block w-full p-3 border ${
              error && !complaintTitle ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-black`}
            required
          />
        </div>
        <div className="mb-5 w-full">
          <label className="block text-sm font-medium text-gray-700">
            Complaint Type
          </label>
          <select
            value={complaintType}
            onChange={(e) => setComplaintType(e.target.value)}
            className={`mt-1 block w-full p-3 border ${
              error && !complaintType ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-black`}
            required
          >
            <option value="">Select a type</option>
            <option value="Apartment Issue">Apartment Issue</option>
            <option value="Resident Issue">Resident Issue</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-5 w-full">
          <label className="block text-sm font-medium text-gray-700">
            Complaint Detail
          </label>
          <textarea
            value={complaintDetail}
            onChange={(e) => setComplaintDetail(e.target.value)}
            className={`mt-1 block w-full p-3 border ${
              error && !complaintDetail ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:ring-2 focus:ring-black`}
            rows="4"
            required
          ></textarea>
        </div>

        {/* Anonymous radio buttons */}
        <div className="mb-5 w-full">
          <label className="block text-sm font-medium text-gray-700">
            Do you want to submit this complaint anonymously?
          </label>
          <div className="flex items-center">
            <input
              type="radio"
              name="anonymous"
              value="true"
              checked={anonymous === true}
              onChange={() => setAnonymous(true)}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">
              Yes
            </label>
          </div>
          <div className="flex items-center mt-2">
            <input
              type="radio"
              name="anonymous"
              value="false"
              checked={anonymous === false}
              onChange={() => setAnonymous(false)}
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">
              No
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}

export default ComplaintForm;
