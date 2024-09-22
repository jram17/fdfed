import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchRoomDetails, fetchData } from '../utils/Roomutils';
import { useDispatch } from 'react-redux';
import { setApartmentDetails } from '../redux/slice/userSlice';

function RoomDetails({ apartment_id }) {
  const dispatch = useDispatch();
  const {
    data: roomData,
    isError: roomerr,
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
  const {
    data: roomdetailsData,
    isError: detailserror,
    isLoading: detailsloading,
  } = useQuery({
    queryKey: ['details', `${apartment_id}`],
    queryFn: () => {
      return fetchRoomDetails(apartment_id);
    },
  });

  return <div></div>;
}

export default RoomDetails;
