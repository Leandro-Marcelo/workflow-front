import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { aDelete, aGet, aPost, aPut } from "../../axios";

const initialState = {
    team: [],
    members: [],
    lists: [],
    /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
    getTeamStatus: "",
    getTeamError: "",
};

export const getTeam = createAsyncThunk(
    "team/getTeam",
    async (idTeam, { rejectWithValue }) => {
        try {
            const response = await aGet("/teams/" + idTeam);
            console.log(`que trae acá:`, response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data);
            /* mandamos como action.payload el error que nos retorna el backend */
            return rejectWithValue(error.response?.data);
        }
    }
);

export const updateList = createAsyncThunk(
    "team/updateList",
    /* necesito el idList y las tareas */
    async (idList, { rejectWithValue }) => {
        try {
            const response = await aGet("/lists/" + idList);
            console.log(`que trae acá:`, response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data);
            /* mandamos como action.payload el error que nos retorna el backend */
            return rejectWithValue(error.response?.data);
        }
    }
);

const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {},
    extraReducers: {
        [getTeam.pending]: (state, action) => {
            return {
                ...state,
                team: [],
                members: [],
                lists: [],
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "pending",
                getTeamError: "",
            };
        },
        [getTeam.fulfilled]: (state, action) => {
            const { name, description, _id, img, idLeader } = action.payload;
            const team = { name, description, _id, img, idLeader };
            const { members } = action.payload;
            const { lists } = action.payload;
            return {
                ...state,
                team: team,
                members: members,
                lists: lists,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "success",
                getTeamError: "",
            };
        },
        [getTeam.rejected]: (state, action) => {
            return {
                /* no se como podría ocurrir algo así xd */
                ...state,
                team: [],
                members: [],
                lists: [],
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "rejected",
                getTeamError: "",
            };
        },
    },
});

//export const {logout,validate} = userSlice.actions // Esto se utiliza en el dispatch
export default teamSlice.reducer; // Esto en el store
