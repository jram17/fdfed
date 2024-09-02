import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Layout from './components/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="sign-up" element={<SignUp />} />
    </Route>
  )
);
function App() {
  const persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
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
  );
}

export default App;
