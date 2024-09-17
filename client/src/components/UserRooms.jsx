import React from 'react';
import RoomCard from './RoomCard';
import { Link } from 'react-router-dom';
const UserRooms = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-2 w-fit  gap-9 m-5">
      {data.map((room, i) => {
        return (
          <Link key={i} to={`/room/${room.apartment_id}`}>
            <RoomCard roomdata={room} id={i} />
          </Link>
        );
      })}
    </div>
  );
};

export default UserRooms;
