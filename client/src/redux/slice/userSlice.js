import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: null,
    isRole: null,
    Role: null,
    apartment_username: null
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
        setApartmentDetails: (state, action) => {
            state.role = action.payload['isAuthority'];
            state.apartment_username = action.payload['username']
            state.Role = action.payload['role'];
        },
        setDataReset: (state, action) => {
            state.role = null;
            state.apartment_username = null;
            state.Role = null;
        },
        reset: () => initialState

    },
});

export const { setUserDetails, reset, setApartmentDetails, setDataReset } = userSlice.actions;
export default userSlice.reducer;
