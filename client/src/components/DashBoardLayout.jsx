import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './DashBoard/SideBar/SideBar';
import { Box, useMediaQuery, Typography } from '@mui/material';
import { useOutlet } from 'react-router-dom';
const DashBoardLayout = ({ children }) => {
  const isNonMobile = useMediaQuery('(min-width: 600px)');

  return (
    <Box display="flex" width="100vw" height="calc(100vh - 73px)">
      <SideBar drawerWidth="240px" />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 2 }}
        width={'80vw'}
        height={'calc(100vh - 73px)'}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashBoardLayout;
