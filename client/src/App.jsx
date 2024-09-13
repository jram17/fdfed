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
import { Provider } from 'react-redux';
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import AuthLayout from './components/AuthLayout';
import { CookiesProvider } from 'react-cookie';
import axios from 'axios';

function App() {
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
          path="enroll-apartment"
          element={
            <AuthLayout authentication={true}>
              <CreateApartmentRoom />
            </AuthLayout>
          }
        />
      </Route>
    )
  );
  const persistor = persistStore(store);

  return (
    <CookiesProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router}>
            <ToastContainer
              position="bottom-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </RouterProvider>
        </PersistGate>
      </Provider>
    </CookiesProvider>
  );
}

export default App;
