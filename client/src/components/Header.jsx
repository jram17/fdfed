import React from 'react';
import '../index.css';
import { NavLink } from 'react-router-dom';
import '@fontsource-variable/public-sans';
import { FaHandshake, FaHome } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import { IoIosPricetag } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slice/authSlice';
import { setUserDetails } from '../redux/slice/userSlice';
import { FaArrowRightLong } from 'react-icons/fa6';
import axios from 'axios';
function Header() {
  axios.defaults.withCredentials = true;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Logout = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/logout`);
      if (response.status === 200) {
        dispatch(logout());
        dispatch(setUserDetails(null));
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };
  const isLoggedIn = useSelector((state) => state.auth.status);
  return (
    <div className="header font-header font-normal">
      <div className="left-header"></div>
      <div className="right-header">
        <NavLink to={'/my-rooms'}>
          <div className="header-link">
            <span>
              <FaHome size={20} />
            </span>
            <p>My Abodes</p>
          </div>
        </NavLink>
        <NavLink to={'/create-room'}>
          <div className="header-link">
            <span>
              <FaHandshake size={20} />
            </span>
            <p>Join Us</p>
          </div>
        </NavLink>
        <NavLink to={'/dashboard'}>
          <div className="header-link">
            <span>
              <MdDashboard size={20} />
            </span>
            <p>DashBoard</p>
          </div>
        </NavLink>
        <NavLink to={'/pricing'}>
          <div className="header-link">
            <span>
              <IoIosPricetag size={20} />
            </span>
            <p>Pricing</p>
          </div>
        </NavLink>
        {isLoggedIn ? (
          <div className="btn text-sm bg-slate-900 text-white hover:cursor-pointer">
            <NavLink
              onClick={() => {
                Logout();
              }}
              className=" flex gap-2 items-center justify-center"
            >
              Logout <FaArrowRightLong />
            </NavLink>
          </div>
        ) : (
          <div className="btn text-sm bg-slate-900 text-white hover:cursor-pointer">
            <NavLink
              to={'/sign-in'}
              className=" flex gap-2 items-center justify-center"
            >
              Login
              <FaArrowRightLong />
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
