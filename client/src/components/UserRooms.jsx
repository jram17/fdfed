import React from 'react';
import RoomCard from './RoomCard';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const UserRooms = ({ data, setModal, isModal }) => {
  console.log(data);
  return (
    <div className="min-w-[75%] w-[75%] flex mt-7 flex-col items-center justify-center gap-6">
      <div className="flex w-full flex-row-reverse mr-20 cursor-pointer">
        <div
          className="btn bg-[#333] flex items-center justify-center gap-2 hover:bg-[#444] text-white"
          onClick={() => setModal(true)}
        >
          <FaPlus size={15} />
          <span>Join Room</span>
        </div>
      </div>
      <div className="w-full flex items-start justify-start">
        <div className="grid grid-cols-2 w-fit gap-9 mx-5">
          {data.map((room, i) => {
            console.log(room);
            return (
              <Link key={i} to={`/room/${room.apartment_id}`}>
                <RoomCard roomData={room} id={i} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserRooms;
