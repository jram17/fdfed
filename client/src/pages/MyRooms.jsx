import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserRooms from '../components/UserRooms';
import { MdCancel } from 'react-icons/md';
import JoinRoomModal from '../components/JoinRoomModal';

function MyRooms() {
  axios.defaults.withCredentials = true;
  const [isLoading, setLoading] = useState(true);
  const [isEmpty, setEmpty] = useState(false);
  const [data, setData] = useState([]);
  const [isModal, setModal] = useState(false);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/my-rooms');
        if (response.status === 200) {
          setEmpty(true);
        } else if (response.status === 201) {
          setData(response.data);
        } else {
          console.log('Error in fetching room data');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoomData();
  }, []);

  return (
    <div>
      <div className="min-w-[100vw] flex items-center justify-around">
        {isLoading ? (
          'Loading...'
        ) : (
          <UserRooms
            data={data.details}
            isModal={isModal}
            setModal={setModal}
          />
        )}
      </div>
      {isModal && (
        <div className="fixed top-1/4 left-0 right-0 flex justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg">
            <span
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => {
                setModal(false);
              }}
            >
              <MdCancel size={20} />
            </span>
            <JoinRoomModal />
          </div>
        </div>
      )}
    </div>
  );
}

export default MyRooms;
