import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/slice/authSlice';
import { setUserDetails } from '../redux/slice/userSlice';
function AuthLayout({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [cookies] = useCookies();
  axios.defaults.withCredentials = true;

  const isAuthPage =
    location.pathname === '/sign-in' || location.pathname === '/sign-up';
  const isVerify = useSelector((state) => state.auth.status);
  useEffect(() => {
    const verifyToken = async () => {
      if (isAuthPage && isVerify) {
        navigate('/');
      }

      if (!authentication) {
        setLoader(false);
        return;
      } else if (isVerify) {
        setLoader(false);
        return;
      } else {
        try {
          const response = await axios.get(`http://localhost:5000/jwtVerify`);

          if (response.status === 200) {
            dispatch(login());
            dispatch(setUserDetails(response.data));
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
  }, [authentication, navigate, location]);

  return loader ? <div>Loading...</div> : <>{children}</>;
}

export default AuthLayout;
