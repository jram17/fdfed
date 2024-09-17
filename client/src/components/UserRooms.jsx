import React from 'react';
import RoomCard from './RoomCard';

const UserRooms = ({ data }) => {
  return (
    <div>
      {data.map((room, i) => {
        return <RoomCard roomdata={room} key={i} />;
      })}
    </div>
  );
};

export default UserRooms;
