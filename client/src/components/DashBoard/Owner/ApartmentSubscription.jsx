import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { SubscriptionDetails } from '../../../utils/DashBoardUtils';
import { Box, Typography } from '@mui/material';
const ApartmentSubscription = () => {
  const { apartment_id } = useParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: ['subscription_details', apartment_id],
    queryFn: () => SubscriptionDetails(apartment_id),
    enabled: !!apartment_id,
  });
  console.log(data);
  return <Box></Box>;
};

export default ApartmentSubscription;
