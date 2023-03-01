import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    isLoading: true
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload;
            state.isLoading = false;
        },
        clearUser: (state) => {
            state.currentUser = null;
            state.isLoading = false;
        },
      },
});

export const { setUser, clearUser } = userSlice.actions;
export const currentUser = (state) => state.user.currentUser;
export const userIsLoading = (state) => state.user.isLoading;