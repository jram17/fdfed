import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: null,
    role: null,
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
            state.role = action.payload['role'];
            state.apartment_username = action.payload['apartment_username'];
        },
        setDataReset: (state, action) => {
            state.role = null;
            state.apartment_username = null;
        },
        reset: () => initialState

    },
});

export const { setUserDetails, reset, setApartmentDetails, setDataReset } = userSlice.actions;
export default userSlice.reducer;
