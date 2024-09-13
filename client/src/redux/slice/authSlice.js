import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
}

const authSlice = createSlice({
    name: "authSlice", initialState, reducers: {
        login: (state) => {
            state.status = true;
        },
        logout: (state) => {
            state.status = false;
        },
        reset: () => initialState
    }
});

export const { login, logout, reset } = authSlice.actions;
export default authSlice.reducer;