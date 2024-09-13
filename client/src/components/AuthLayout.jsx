import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
function AuthLayout({ children, authentication = true, token }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    const verifyToken = async () => {
      if (!authentication) {
        setLoader(false);
      } else {
        try {
          const response = await axios.get(
            `http://localhost:5000${location.pathname}`
          );

          if (response.status === 200) {
            setLoader(false);
          } else if (response.status === 400) {
            navigate('/sign-in');
          } else {
            navigate('/sign-in');
          }
        } catch (error) {
          console.error('Error occurred during token verification', error);
          navigate('/sign-in');
        } finally {
          setLoader(false);
        }
      }
    };

    verifyToken();
  }, [authentication, token, navigate, location]);

  return loader ? <div>Loading...</div> : <>{children}</>;
}

export default AuthLayout;
