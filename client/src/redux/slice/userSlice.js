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
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setDataReset: (state, action) => {
            state.role = null;
            state.apartment_username = null;
        },
        reset: () => initialState

    },
});

export const { setUserDetails, reset, setRole, setDataReset } = userSlice.actions;
export default userSlice.reducer;
