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
        startSignUp: (state) => {
            state.loading = true;
        },
        successSignUp: (state) => {
            state.loading = false
            state.error = null;
        },
        failureSignUp: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
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
        clearError: (state) => {
            state.error = null
        },
        clearLoading: (state) => {
            state.loading = false;
        },
        updateUserStart: (state) => {
            state.loading = true;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateUserFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const { 
    startSignUp, 
    successSignUp, 
    failureSignUp,  
    startSignIn, 
    successSignIn, 
    failureSignIn, 
    clearError,
    clearLoading,
    updateUserStart,
    updateUserSuccess,
    updateUserFailure
} = userSlice.actions;
    
export default userSlice.reducer;