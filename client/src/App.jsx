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
import ChatPage from './pages/ChatPage';
import AuthLayout from './components/AuthLayout';
import axios from 'axios';
import usegetJwtVerify from './hooks/jwtVerify';
import DashBoard from './pages/DashBoard';
import Pricing from './pages/Pricing';
import MyRooms from './pages/MyRooms';
import Room from './pages/Room';
import Error from './pages/Error';
import ComplaintDisplay from './pages/ComplaintDisplay';
import QueryProvider from './components/ReactQueryProvider';

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
          path="/:apartment_id/complaints/list"
          element={
            <AuthLayout authentication={true}>
              <ComplaintDisplay />
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
          path="dashboard/myprofile"
          element={
            <AuthLayout authentication={true}>
              <DashBoard />
            </AuthLayout>
          }
        />
        <Route
          path="dashboard/myapartments"
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
          path="room/:apartment_id/log"
          element={
            <AuthLayout authentication={true}>
              <Room />
            </AuthLayout>
          }
        />
        <Route
          path="room/:apartment_id/chat"
          element={
            <AuthLayout authentication={true}>
              <ChatPage />
            </AuthLayout>
          }
        />
        <Route
          path="room/:apartment_id/details"
          element={
            <AuthLayout authentication={true}>
              <Room />
            </AuthLayout>
          }
        />
        <Route
          path="room/:apartment_id/parcel"
          element={
            <AuthLayout authentication={true}>
              <Room />
            </AuthLayout>
          }
        />
        <Route
          path="room/:apartment_id/complaints"
          element={
            <AuthLayout authentication={true}>
              <Room />
            </AuthLayout>
          }
        />
        <Route
          path="room/:apartment_id"
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
        {/* Catch-all route for undefined paths */}
        <Route
          path="*"
          element={
            <AuthLayout authentication={false}>
              <Error /> {/* Or create a 404 page */}
            </AuthLayout>
          }
        />
      </Route>
    )
  );

  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  );
}

export default App;
