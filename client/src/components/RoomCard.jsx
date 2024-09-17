import React from 'react';
import {
  backgroundColors,
  getApartmentId,
  getCreatedData,
  toTitleCase,
} from '../utils/Roomutils';
import { Link } from 'react-router-dom';

function RoomCard({ roomdata, id }) {
  const apartment_id = getApartmentId(roomdata.apartment_id);
  const createddate = getCreatedData(roomdata.start_date);
  const { color: backgroundColor, shadow } =
    backgroundColors[id % backgroundColors.length];

  return (
    <div
      className="h-72 w-[360px] flex flex-col p-4 pt-1 rounded-lg cursor-pointer"
      style={{
        background: backgroundColor,
        boxShadow: shadow,
      }}
    >
      <div className="h-1/2 flex items-center justify-center w-full">
        <span className="text-2xl font-semibold text-left">
          {toTitleCase(roomdata.apartment_name)}
        </span>
      </div>
      <div className="flex flex-col items-end justify-end h-1/2 p-2 overflow-hidden text-nowrap w-full">
        <span className="text-lg font-medium">{apartment_id}</span>
        <Link
          to={`/profile/${roomdata.ownername}`}
          className="text-lg w-full truncate"
        >
          <span className="text-lg w-full truncate hover-underline">
            {roomdata.ownername}
          </span>
        </Link>
        <span className="text-base">{createddate}</span>
      </div>
    </div>
  );
}

export default RoomCard;
