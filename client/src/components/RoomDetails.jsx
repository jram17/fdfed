import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setApartmentDetails } from '../redux/slice/userSlice';
import { fetchData } from '../utils/Roomutils';
function RoomDetails({ apartment_id }) {
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
  return <div></div>;
}

export default RoomDetails;
