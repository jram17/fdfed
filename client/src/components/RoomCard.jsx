import React from 'react';
import {
  backgroundColors,
  getApartmentId,
  getCreatedData,
  toTitleCase,
} from '../utils/Roomutils';
import { Link } from 'react-router-dom';

function RoomCard({ roomData, id }) {
  const apartment_id = getApartmentId(roomData.apartment_id);
  const createddate = getCreatedData(roomData.start_date);
  const { color: backgroundColor, shadow } =
    backgroundColors[id % backgroundColors.length];

  return (
    <div
      className="h-64 w-[450px] flex flex-col p-4 pt-1 rounded-lg cursor-pointer"
      style={{
        background: backgroundColor,
        boxShadow: shadow,
      }}
    >
      <div className="h-1/2 flex items-center justify-left w-full">
        <span className="text-2xl font-semibold text-left">
          {toTitleCase(roomData.apartment_name)}
        </span>
      </div>
      <div className="flex flex-col items-end justify-end h-1/2 p-2 overflow-clip text-nowrap w-full">
        <span className="text-lg font-medium">{apartment_id}</span>
        <span className="text-lg w-full truncate hover-underline flex flex-row-reverse">
          {roomData.ownername}
        </span>
        <span className="text-base">{createddate}</span>
      </div>
    </div>
  );
}

export default RoomCard;
