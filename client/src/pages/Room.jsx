import React, { useEffect, useState, Suspense } from 'react';
const LeftSideDash = React.lazy(() => import('../components/LeftSideDash'));
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { NavLink, Link } from 'react-router-dom';
import { IoIosChatbubbles } from 'react-icons/io';
import { setApartmentDetails } from '../redux/slice/userSlice';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import RoomHeadingCard from '../components/RoomHeadingCard';
import { MdAnnouncement } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RiLoader5Line } from 'react-icons/ri';
import { FaArrowLeftLong } from 'react-icons/fa6';
function Room() {
  const AnnouncementSchema = z.object({
    annoucement: z.string().min(1, 'Announcement cannot be empty'),
  });
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(AnnouncementSchema) });
  const location = useLocation();
  const { apartment_id } = useParams();
  const params = useParams();
  const dispatch = useDispatch();
  axios.defaults.withCredentials = true;
  const [roomData, setRoomData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isForm, setisForm] = useState(false);
  const [isFormLoading, setFormLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/room-details/${apartment_id}`
        );
        const { data } = response;
        if (response.status === 200) {
          console.log(data.details);
          setRoomData(data.details);
          dispatch(
            setApartmentDetails({
              role: data.details.isAuthority,
              apartment_username: data.details.username,
            })
          );

          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="w-full h-inherit flex items-center justify-end">
      <Suspense fallback={<div>.............</div>}>
        <LeftSideDash />
      </Suspense>
      <div
        className="min-h-screen flex items-start justify-center"
        style={{ width: `calc(100vw - 275px)` }}
      >
        <div
          className="fixed top-[69px] border-t-[0.8px] border-style border-b-[0.8px] z-10 bg-white h-[60px] flex items-center justify-start"
          style={{ width: `calc(100vw - 275px)` }}
        >
          <div className="h-full w-full flex items-center pl-5 gap-8">
            <div className="h-full flex items-center">
              <NavLink
                to={`/room/${apartment_id}`}
                className={
                  location.pathname === `/room/${apartment_id}`
                    ? 'text-red-600'
                    : ''
                }
              >
                <span>Announcements</span>
              </NavLink>
            </div>

            <div className="h-full flex items-center">
              <NavLink
                to={`/room/${apartment_id}/details`}
                className={({ isActive }) => (isActive ? 'text-red-600' : '')}
              >
                <span>Details</span>
              </NavLink>
            </div>

            <div className="h-full  flex items-center">
              <NavLink
                to={`/room/${apartment_id}/parcel`}
                className={({ isActive }) => (isActive ? 'text-red-600' : '')}
              >
                <span>Parcel</span>
              </NavLink>
            </div>
            <div className="h-full  flex items-center">
              <NavLink
                to={`/room/${apartment_id}/log`}
                className={({ isActive }) => (isActive ? 'text-red-600' : '')}
              >
                <span>Log</span>
              </NavLink>
            </div>
            <div className="h-full  flex items-center">
              <NavLink
                to={`/room/${apartment_id}/complaints`}
                className={({ isActive }) => (isActive ? 'text-red-600' : '')}
              >
                <span>Complaints</span>
              </NavLink>
            </div>
          </div>
          <Link to={`/room/${apartment_id}/chat`}>
            <div className="mr-6 btn bg-[#333] flex items-center justify-center gap-2 hover:bg-[#444] text-white cursor-pointer">
              <IoIosChatbubbles size={15} />
              <span>Chat</span>
            </div>
          </Link>
        </div>

        <div className="mt-[69px] w-full p-6 pt-6 flex flex-col items-center justify-center gap-5">
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
          {!isForm ? (
            <div
              className="max-w-[70vw] mt-5 min-w-[70vw]  h-[8vh] flex items-center justify-center bg-card  cursor-pointer !shadow-2xl"
              onClick={() => {
                setisForm(true);
              }}
            >
              <div className="text-xl  w-full flex items-center justify-center gap-2">
                <span>
                  <MdAnnouncement size={35} />
                </span>
                <span>Announce Something To Your Apartment</span>
              </div>
            </div>
          ) : (
            <div className="min-w-[70vw] p-6 card !shadow-2xl bg-white relative">
              <form className="space-y-6 mt-5">
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

                <div className="w-full flex justify-end items-center  gap-5">
                  <div
                    className="btn text-lg py-2 cursor-pointer px-8 bg-slate-900 hover:bg-slate-800 text-white rounded-md flex items-center justify-center"
                    onClick={() => {
                      setisForm(false);
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
                className="absolute top-0 right-2 p-2 pt-1 cursor-pointer "
                onClick={() => {
                  setisForm(false);
                  reset();
                  setError(false);
                  setErrorMsg('');
                }}
              >
                <FaArrowLeftLong size={20} />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Room;
