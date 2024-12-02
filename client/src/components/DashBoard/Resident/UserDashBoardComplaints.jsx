import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserDetailsforApartment } from '../../../utils/DashBoardUtils';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import { UserComplaintsPie } from '../../nivocharts/PieChart';
import { DataGrid } from '@mui/x-data-grid';
import MyResponsiveBar from '../../nivocharts/BarChart';
import { format } from 'date-fns';
import { Tag } from 'antd';
const UserComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [lineData, setLineData] = useState([]);
  const { username } = useSelector((state) => state.user.userDetails);
  const columns = [
    {
      field: 'complaints',
      headerName: 'Complaints',
      renderCell: (params) => {
        return toTitleCase(params.row.complaints);
      },
      flex: 1,
    },
    {
      field: 'createdAt',
      headerName: 'Started At',
      flex: 0.5,
      renderCell: (params) => {
        const date = new Date(params.row.createdAt);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      },
    },
    {
      field: 'severity',
      headerName: 'Severity',
      flex: 0.5,
      renderCell: (params) => {
        let color = params.row.designation === 'severe' ? 'red' : 'green';
        return (
          <Tag color={color} key={params.row.severity}>
            {params.row.designation?.toUpperCase()}
          </Tag>
        );
      },
    },
  ];
  const {
    data: user_details,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['apartment_details', username],
    queryFn: UserDetailsforApartment,
  });
  console.log(user_details);
  useEffect(() => {
    let severe = 0;
    let warning = 0;
    const monthlyData = {};

    // Initialize data for all 12 months with default values
    const months = Array.from({ length: 12 }, (_, i) =>
      format(new Date(2024, i), 'MMMM yyyy')
    );
    months.forEach((month) => {
      monthlyData[month] = { severe: 0, warning: 0 };
    });

    if (user_details && user_details.length > 0) {
      user_details.forEach((ele) => {
        const createdAt = new Date(ele.createdAt);
        const month = format(createdAt, 'MMMM yyyy');

        if (ele.severity === 'warning') {
          warning++;
          monthlyData[month].warning++;
        } else if (ele.severity === 'severe') {
          severe++;
          monthlyData[month].severe++;
        }
      });

      const arr = user_details.map((ele) => ({
        apartment_name: ele.apartment_name,
        complaints: ele.complaints,
        severity: ele.severity,
        createdAt: format(new Date(ele.createdAt), 'MMMM dd, yyyy'),
      }));
      setComplaints(arr);
    } else {
      setComplaints([]);
    }

    const formattedLineData = months.map((month) => ({
      month: month,
      sever: monthlyData[month].severe,
      warning: monthlyData[month].warning,
    }));
    setLineData(formattedLineData);

    setPieData([
      {
        id: 'severe',
        label: 'Severe',
        value: severe,
        color: 'hsl(210, 70%, 50%)',
      },
      {
        id: 'warning',
        label: 'Warning',
        value: warning,
        color: 'hsl(350, 70%, 50%)',
      },
    ]);
  }, [user_details]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!user_details) {
    return <div>User not found.</div>;
  }
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        padding: '1rem',
        borderRadius: '0.5rem',
      }}
    >
      <Typography
        width={'100%'}
        textAlign={'left'}
        component={'h1'}
        variant="h4"
        fontWeight={'bold'}
        sx={{ mb: '1rem' }}
      >
        Complaints Over Me
      </Typography>
      <PieAndLineGraphComponent data={lineData} />
      <Box
        sx={{
          width: '100%',
          height: '600px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          gap: '1rem',
        }}
      >
        <Typography
          width={'100%'}
          textAlign={'left'}
          component={'h1'}
          variant="h4"
          fontWeight={'bold'}
          sx={{ mb: '1rem' }}
        >
          Details and BreakDown
        </Typography>
        <Box
          sx={{
            width: '100%',
            height: '50%',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#ffffff',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
              transition: 'box-shadow 0.3s ease, transform 0.3s ease',
              '&:hover': {
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
                transform: 'translateY(-4px)',
              },
              display: 'flex',
              width: '30%',
              height: '400px',
              padding: '0.5rem',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '0.5rem',
              gap: '1rem',
            }}
          >
            <UserComplaintsPie data={pieData} />
            <Typography
              width={'100%'}
              textAlign={'left'}
              component={'h1'}
              variant="p"
              WordWrap={false}
            >
              Breakdown Of Complaints Based On Severity
            </Typography>
          </Box>
          <DataGrid
            rowsPerPageOptions={[10, 20, 50]}
            rows={user_details?.complaints || []}
            loading={isLoading || !user_details.complaints}
            columns={columns}
            getRowId={(row) =>
              `${row.complaints}-${row.createdAt.toISOString()}`
            }
            sx={{
              height: '400px',
              width: '60%',
              bgcolor: 'background.paper',
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

const PieAndLineGraphComponent = ({ data }) => {
  return (
    <Box
      sx={{
        padding: '1rem',
        width: '100%',
        height: '900px',
        minHeight: '400px',
        borderRadius: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#ffffff',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
        '&:hover': {
          boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.3)',
          transform: 'translateY(-4px)',
        },
      }}
    >
      <MyResponsiveBar data={data} />
      <Typography
        width={'100%'}
        textAlign={'left'}
        component={'h1'}
        variant="p"
      >
        Complaints Over Time
      </Typography>
    </Box>
  );
};

export default UserComplaints;
