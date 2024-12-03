import React from 'react';
import { Box, Typography } from '@mui/material';
import { fetchisRole } from '../../../utils/Roomutils';
import { useQuery } from '@tanstack/react-query';
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
const Subscriptions = () => {
  const { username } = useSelector((state) => state.user.userDetails);
  const {
    data: apartment_details,
    isError,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['owning_apartments', username],
    queryFn: () => fetchisRole('Owner'),
    enabled: !!username,
  });
  console.log(apartment_details);
  return <div></div>;
};

export default Subscriptions;
