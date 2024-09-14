import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login, logout } from '../redux/slice/authSlice';
import { setUserDetails } from '../redux/slice/userSlice';
const usegetJwtVerify = async () => {

    axios.defaults.withCredentials = true;
    const dispatch = useDispatch();
    try {
        const response = await axios.get(`http://localhost:5000/jwtVerify`);
        if (response.status == 200) {
            dispatch(login());
            dispatch(setUserDetails(response.data));
        } else {
            dispatch(logout());
            dispatch(setUserDetails(null));
        }
    } catch (error) {
        dispatch(logout());
        dispatch(setUserDetails(null));
    }
}

export default usegetJwtVerify;