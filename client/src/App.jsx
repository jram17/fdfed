import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateApartmentRoom from './pages/CreateApartmentRoom';
import Home from './pages/Home';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { store } from './redux/store';
import { persistStore } from 'redux-persist';
import AuthLayout from './components/AuthLayout';
import { CookiesProvider } from 'react-cookie';
import axios from 'axios';
import usegetJwtVerify from './hooks/jwtVerify';
import DashBoard from './pages/DashBoard';
import Pricing from './pages/Pricing';
import MyRooms from './pages/MyRooms';
import Room from './pages/Room';
function App() {
  usegetJwtVerify();
  axios.defaults.withCredentials = true;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          index
          element={
            <AuthLayout authentication={false}>
              <Home />
            </AuthLayout>
          }
        />
        <Route
          path="sign-in"
          element={
            <AuthLayout authentication={false}>
              <SignIn />
            </AuthLayout>
          }
        />
        <Route
          path="sign-up"
          element={
            <AuthLayout authentication={false}>
              <SignUp />
            </AuthLayout>
          }
        />
        <Route
          path="create-room"
          element={
            <AuthLayout authentication={true}>
              <CreateApartmentRoom />
            </AuthLayout>
          }
        />
        <Route
          path="my-rooms"
          element={
            <AuthLayout authentication={true}>
              <MyRooms />
            </AuthLayout>
          }
        />
        <Route
          path="dashboard"
          element={
            <AuthLayout authentication={true}>
              <DashBoard />
            </AuthLayout>
          }
        />
        <Route
          path="pricing"
          element={
            <AuthLayout authentication={false}>
              <Pricing />
            </AuthLayout>
          }
        />
        <Route
          path="room/*"
          element={
            <AuthLayout authentication={true}>
              <Room />
            </AuthLayout>
          }
        />
        <Route
          path="profile/:username"
          element={
            <AuthLayout authentication={true}>
              <Room />
            </AuthLayout>
          }
        />
      </Route>
    )
  );
  const persistor = persistStore(store);

  return (
    <CookiesProvider>
      <RouterProvider router={router} />
    </CookiesProvider>
  );
}

export default App;
