import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '@fontsource/poppins';

const Layout = () => {
  const location = useLocation();
  const isAuthPage =
    location.pathname === '/sign-in' || location.pathname === '/sign-up';

  return (
    <div className="flex flex-col min-h-screen font-content">
      {!isAuthPage && <Header />}
      <div className="flex-grow">
        <Outlet />
      </div>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;
