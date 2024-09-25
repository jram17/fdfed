import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '@fontsource/poppins';
import { useDispatch } from 'react-redux';
import { toggleIconVisibility } from '../redux/slice/SideDashSlice';
import { useEffect } from 'react';
import { setDataReset } from '../redux/slice/userSlice';

// Define the footer routes as regular expressions
const footerRoutes = [/^\/my-rooms(\/.*)?$/, /^\/room\/[^/]+$/];

const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // Check if the current path matches any of the footer routes
  const shouldHideFooter = footerRoutes.some((pattern) =>
    pattern.test(location.pathname)
  );

  // Fix the dashboard regex
  const dash_regex = /^\/dashboard(?:\/.*)?$/;

  useEffect(() => {
    const isChatPage = location.pathname.endsWith('/chat');
    if (!isChatPage) {
      dispatch(setDataReset());
    }
    dispatch(toggleIconVisibility(shouldHideFooter));
  }, [shouldHideFooter, dispatch, location.pathname]);

  // Determine if the current path is an auth route or dashboard
  const isAuth =
    location.pathname === '/sign-in' || location.pathname === '/sign-up';
  const isDashBoard = dash_regex.test(location.pathname);

  return (
    <div className="flex flex-col min-h-screen font-content">
      {/* Show Header unless it's an Auth or Dashboard page */}
      {!isAuth && !isDashBoard && <Header />}

      <div
        className={`flex-grow ${!isAuth && !isDashBoard ? 'mt-[70px]' : ''}`}
      >
        <Outlet />
      </div>

      {/* Show Footer unless it's an Auth page, a Dashboard page, or a route that should hide the footer */}
      {!isAuth && !shouldHideFooter && !isDashBoard && <Footer />}
    </div>
  );
};

export default Layout;
