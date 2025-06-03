import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: null,
    user: null,
};

const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        logout(state) {
            state.token = null;
            state.user = null;
        },
    },
});

export const { login, logout } = authReducer.actions;
export default authReducer.reducer;