import React from 'react';
import LeftSideDash from '../components/LeftSideDash';
function Room() {
  return (
    <div className="w-full  h-inherit flex items-center justify-around">
      <LeftSideDash roomData={null} />
    </div>
  );
}

export default Room;
