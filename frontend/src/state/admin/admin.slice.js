import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    currentAdmin: localStorage.getItem("currentAdmin")? JSON.parse(localStorage.getItem("currentAdmin")) : null,
    error: null,
    loading: false
};

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentAdmin = action.payload;
            localStorage.setItem("currentAdmin", JSON.stringify(state.currentAdmin));
            state.error = null,
            state.loading = false
        },
        signInFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        signOutStart: (state) => {
            state.loading = true
            
        },
        signOutSuccess: (state) => {
            localStorage.setItem("currentAdmin", JSON.stringify(null));
            state.currentAdmin = null
            state.loading = false
            state.error = false
        },
        signOutFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
        editCompanyProfileStart: (state) => {
            state.loading = true
        },
        editCompanyProfileSuccess: (state) => {
            state.loading = false
            state.error = false
        },
        editCompanyProfileFailure: (state, action) => {
            state.error = action.payload
            state.loading = false
        },
    }
})

export const { signOutFailure, signOutStart, signOutSuccess ,signInFailure, signInStart, signInSuccess, editCompanyProfileFailure, editCompanyProfileStart, editCompanyProfileSuccess} = adminSlice.actions;
export default adminSlice.reducer;