import RoomHeadingCard from './RoomHeadingCard';
import { MdAnnouncement } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiLoader5Line } from 'react-icons/ri';
import { FaArrowLeftLong } from 'react-icons/fa6';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '../utils/Roomutils';
import { useDispatch } from 'react-redux';
import { setApartmentDetails } from '../redux/slice/userSlice';
function AnnouncementForm() {
  const [isForm, setIsForm] = useState(false);
  const [isFormLoading, setFormLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const AnnouncementSchema = z.object({
    annoucement: z.string().min(1, 'Announcement cannot be empty'),
  });

  const AnnoucementSubmit = () => {};
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(AnnouncementSchema) });

  return !isForm ? (
    <div
      className="max-w-[70vw] mt-5 min-w-[70vw] h-[8vh] flex items-center justify-center bg-card cursor-pointer !shadow-2xl"
      onClick={() => setIsForm(true)}
    >
      <div className="text-xl w-full flex items-center justify-center gap-2">
        <MdAnnouncement size={35} />
        <span>Announce Something To Your Apartment</span>
      </div>
    </div>
  ) : (
    <div className="min-w-[70vw] p-6 card !shadow-2xl bg-white relative">
      <form
        className="space-y-6 mt-5"
        onSubmit={handleSubmit(AnnoucementSubmit)}
      >
        <div className="form-item">
          <input
            autoFocus
            placeholder="Enter Your Announcement"
            {...register('announcement', { required: true })}
            className={`textarea w-full h-16 px-4 py-2 border rounded-md focus:outline-none border-style border-b-[1px] ${
              errors.announcement ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.announcement && (
            <p className="text-red-500 text-sm mt-1">
              {errors.announcement.message}
            </p>
          )}
        </div>

        {isError && <p className="text-red-500">{errorMsg}</p>}

        <div className="w-full flex justify-end items-center gap-5">
          <div
            className="btn text-lg py-2 cursor-pointer px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-md flex items-center justify-center"
            onClick={() => {
              setIsForm(false);
              reset();
            }}
          >
            Cancel
          </div>

          <button
            className="btn text-lg py-2 px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-md flex items-center justify-center"
            disabled={isFormLoading}
          >
            {isFormLoading ? (
              <RiLoader5Line className="animate-spin text-2xl" />
            ) : (
              'Announce It'
            )}
          </button>
        </div>
      </form>

      <span
        className="absolute top-0 right-2 p-2 pt-1 cursor-pointer"
        onClick={() => {
          setIsForm(false);
          reset();
          setError(false);
          setErrorMsg('');
        }}
      >
        <FaArrowLeftLong size={20} />
      </span>
    </div>
  );
}

function AnnoucementDetails({ apartment_id }) {
  const dispatch = useDispatch();
  const {
    data: roomData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['room', `${apartment_id}`],
    queryFn: () => {
      return fetchData(apartment_id);
    },
  });
  useEffect(() => {
    if (roomData) {
      dispatch(setApartmentDetails(roomData));
    }
  }, [roomData]);
  return (
    <div className=" flex flex-col w-full gap-5 items-center justify-center p-6 ">
      <div className=" max-w-[70vw] w-[70vw] flex items-center justify-center">
        {roomData ? (
          <RoomHeadingCard
            apartment_name={roomData.apartment_name}
            owner_name={roomData.ownername}
          />
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <AnnouncementForm />
    </div>
  );
}

export default AnnoucementDetails;
