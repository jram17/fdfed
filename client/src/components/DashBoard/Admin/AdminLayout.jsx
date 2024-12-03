import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
const AdminLayout = ({ children }) => {
  const email = useSelector((state) => state.user.userDetails.email);
  if (email === 'adminsl@gmail.com') {
    return children;
  }

  return (
    <Box>
      <Typography variant="h4">
        You are not authorized to view this page.
      </Typography>
      <Typography variant="h5">
        Please contact admin@gmail.com to access.
      </Typography>
    </Box>
  );
};

export default AdminLayout;
