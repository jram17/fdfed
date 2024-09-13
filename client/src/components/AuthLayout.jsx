import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';

function AuthLayout({ children, authentication = true }) {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [cookies] = useCookies();

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
        navigate('/sign-in');
      }
    };

    verifyToken();
  }, [authentication, navigate, location]);

  return loader ? <div>Loading...</div> : <>{children}</>;
}

export default AuthLayout;
