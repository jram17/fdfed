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
import { useDispatch, useSelector } from 'react-redux';
import { setApartmentDetails } from '../redux/slice/userSlice';
import { io } from 'socket.io-client';




function AnnouncementForm({ socket, role, apartment_id, apartment_username }) {
    const [isForm, setIsForm] = useState(false);
    const [isFormLoading, setFormLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');



    const AnnouncementSchema = z.object({
        announcement: z.string().min(1, 'Announcement cannot be empty'),
    });



    const AnnouncementSubmit = async (formdata) => {
        try {
          setFormLoading(true); // Set loading state
          setError(false); // Clear error
    
          // Emit the announcement message through socket.io
          socket.emit('announcement-messages', {
            username: apartment_username,
            aptId: apartment_id,
            role: role,
            msg: formdata.announcement,
          });
    
          // Reset the form and close it after submission
          reset(); // Reset form fields
          setIsForm(false); // Close the form
        } catch (error) {
          setError(true); // Set error state if something goes wrong
          setErrorMsg('Failed to submit announcement'); // Set error message
        } finally {
          setFormLoading(false); // Stop loading after submission
        }
      };

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
                onSubmit={handleSubmit(AnnouncementSubmit)}
            >
                <div className="form-item">
                    <textarea
                        autoFocus
                        placeholder="Enter Your Announcement"
                        {...register('announcement', { required: true })}
                        className={`textarea w-full h-16 px-4 py-2 border rounded-md focus:outline-none border-style border-b-[1px] ${errors.announcement ? 'border-red-500' : 'border-gray-300'
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

function Announcement({ apartment_id, isRole, Role, apartment_username }) {

    //   const dispatch = useDispatch();
    //   const { Role } = useSelector((state) => state.user);
    //   const isRole = Role === 'Owner' || Role === 'Authority';
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null)
    //   const {
    //     data: roomData,
    //     isError: roomerr,
    //     isLoading,
    //   } = useQuery({
    //     queryKey: ['room', `${apartment_id}`],
    //     queryFn: () => fetchData(apartment_id),
    //   });

    //   useEffect(() => {
    //     if (roomData) {
    //       dispatch(setApartmentDetails(roomData));
    //     }
    //   }, [roomData]);

    useEffect(() => {
        const newSocket = io('http://localhost:5000');
        setSocket(newSocket);
        return () => {
            newSocket.disconnect()
        }
    }, []);

    useEffect(() => {
        if (socket) {
            socket.emit('get-announcement-messages-history', { aptId: apartment_id });
            socket.on('announcement-messages-history', (msg) => {
                setMessages(msg);
            });

            socket.on('announcement-messages', (msg) => {
                // console.log(msg.apartment_username)
                setMessages((prev) => [msg, ...prev]);
            })

            return () => {
                socket.off('announcement-messages-history');
                socket.off('announcement-messages');
                socket.disconnect();
            };
        }

    }, [apartment_id, socket]);

    return (
        <div className="flex flex-col w-full gap-5 items-center justify-center p-6">

            {isRole && socket && <AnnouncementForm messages={messages} socket={socket} setMessages={setMessages} role={Role} apartment_id={apartment_id} apartment_username={apartment_username} />}

            <div className="announcement-container">
                <div className='announcement-something'>something</div>
                <div className='announcement-messages-container' >
                    {messages.map((msg, index) => {
                        console.log('in ')
                        return (
                            <div key={index}>
                                <div className='announcement-messages'><div id='announcement-msg-header'><strong>{msg.apartment_username}</strong></div><div id='announcement-msg-body'>{msg.announcement_msg} </div></div>
                            </div>
                        )
                    })}
                </div>
            </div>

        </div>
    );
}

export default Announcement;
