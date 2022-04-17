import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { aDelete, aGet, aPost, aPut } from "../../axios";

const initialState = {
    users: [],
    status: "",
};

export const getUsers = createAsyncThunk(
    "users/getUsers",
    async (noData, { rejectWithValue }) => {
        try {
            const response = await aGet("/users");
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response?.data);
        }
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        [getUsers.pending]: (state, action) => {
            return {
                ...state,
                users: [],
                status: "pending",
            };
        },
        [getUsers.fulfilled]: (state, action) => {
            /* console.log(action.payload); */
            return {
                ...state,
                users: action.payload,
                status: "success",
            };
        },
        [getUsers.rejected]: (state, action) => {
            return {
                ...state,
                status: "rejected",
            };
        },
    },
});

//export const {logout,validate} = userSlice.actions // Esto se utiliza en el dispatch
export default usersSlice.reducer; // Esto en el store
