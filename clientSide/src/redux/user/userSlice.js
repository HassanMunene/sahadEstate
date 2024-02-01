import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        startSignIn: (state) => {
            state.loading = true;
        },
        successSignIn: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        failureSignIn: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { startSignIn, successSignIn, failureSignIn } = userSlice.actions;
export default userSlice.reducer;