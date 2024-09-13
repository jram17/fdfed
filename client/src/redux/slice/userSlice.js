import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userDetails: null
};

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUserDetails: (state, action) => {
            state.userDetails = action.payload;
        },
        reset: () => initialState

    },
});

export const { setUserDetails, reset } = userSlice.actions;
export default userSlice.reducer;
