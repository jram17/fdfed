import React from 'react';
import CreateRoomForm from '../components/CreateRoomForm';
import { Carousel, RightBar } from '../components/CreateRoomComponents';
import { GiTakeMyMoney, GiSecurityGate } from 'react-icons/gi';
function CreateApartmentRoom() {
  return (
    <div className="flex gap-2 items-center justify-between flex-col">
      <div className="flex items-baseline gap-4 justify-center h-full">
        <div className="text-7xl break-words text-red-700 h-full flex items-center justify-center tracking-wide">
          Door To Sophistication
        </div>
        <div className="text-5xl h-full flex items-center justify-center underline">
          Minus Apartment Chaos
        </div>
      </div>
      <div className="flex items-start justify-between gap-2 mt-7">
        <CreateRoomForm />
        <RightBar />
      </div>
      <div className="flex items-center justify-center mt-4">
        <Carousel />
      </div>
      <div className="flex items-center justify-center mt-10">
        <div className="flex flex-col gap-12 items-center justify-around">
          <div className="text-5xl font-bold tracking-wide">
            Know Our Features
          </div>
          <div className="flex  gap-6">
            <div className="flex flex-col gap-8 items-center justify-start">
              <GiTakeMyMoney size={50} />
              <span className="text-3xl">Integrated Payment Gateway</span>
            </div>
            <div className="flex flex-col gap-8 items-center justify-start">
              <GiSecurityGate size={50} />
              <span className="text-3xl">Instant Responses for Problems</span>
            </div>
            <div className="flex flex-col gap-8 items-center justify-start">
              <GiTakeMyMoney size={50} />
              <span className="text-3xl">Rent Payment Integration</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateApartmentRoom;
