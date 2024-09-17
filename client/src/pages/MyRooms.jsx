import React, { useState, useEffect } from 'react';
import axios from 'axios';

import UserRooms from '../components/UserRooms';
function MyRooms() {
  axios.defaults.withCredentials = true;
  const [isloading, setLoading] = useState(true);
  const [isEmpty, setEmpty] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchRoomdata = async () => {
      let response;
      try {
        response = await axios.get('http://localhost:5000/my-rooms');
        if (response.status === 200) {
          setEmpty(true);
        } else if (response.status === 201) {
          setData(response.data);
        } else {
          console.log('error in fetching the room data');
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoomdata();
  }, []);

  return <div>{isloading ? 'loading' : <UserRooms data={data.details} />}</div>;
}

export default MyRooms;
