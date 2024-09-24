import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '@fontsource/poppins';
import { useDispatch } from 'react-redux';
import { toggleIconVisibility } from '../redux/slice/SideDashSlice';
import { useEffect } from 'react';
import { setDataReset } from '../redux/slice/userSlice';
const footerRoutes = [/^\/my-rooms(\/.*)?$/, /^\/room\/[^/]+$/];
const Layout = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const shouldHideFooter = footerRoutes.some((pattern) =>
    pattern.test(location.pathname)
  );
  const dash_regex = /^\/dashboard\/[^/]+$/;
  useEffect(() => {
    const isChatPage = location.pathname.endsWith('/chat');
    if (!isChatPage) {
      dispatch(setDataReset());
    }
    dispatch(toggleIconVisibility(shouldHideFooter));
  }, [shouldHideFooter, dispatch, location.pathname]);

  const isAuth =
    location.pathname === '/sign-in' || location.pathname === '/sign-up';
  const isDashBoard = dash_regex.test(location.pathname);

  return (
    <div className="flex flex-col min-h-screen font-content">
      {!isAuth && !isDashBoard && <Header />}

      <div className={`flex-grow ${!isAuth ? 'mt-[70px]' : ''}  `}>
        <Outlet />
      </div>

      {!isAuth && !shouldHideFooter && !isDashBoard && <Footer />}
    </div>
  );
};

export default Layout;
