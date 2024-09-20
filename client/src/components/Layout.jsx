import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '@fontsource/poppins';
import { useDispatch } from 'react-redux';
import {
  toggleIconVisibility,
  toggleSideBar,
} from '../redux/slice/SideDashSlice';
const isFooter = ['/my-rooms'];
import { useEffect } from 'react';
const Layout = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const isIcon = isFooter.includes(location.pathname);

  useEffect(() => {
    if (isIcon) {
      dispatch(toggleIconVisibility(true));
    } else {
      dispatch(toggleIconVisibility(false));
    }
  }, [isIcon, dispatch]);

  const isAuthPage =
    location.pathname === '/sign-in' || location.pathname === '/sign-up';

  return (
    <div className="flex flex-col min-h-screen font-content">
      {!isAuthPage && <Header />}

      <div className={`flex-grow ${!isAuthPage ? 'mt-[70px]' : ''}`}>
        <Outlet />
      </div>

      {!isAuthPage && isFooter.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default Layout;
