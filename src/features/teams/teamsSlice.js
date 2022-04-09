import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { aDelete, aGet, aPost, aPut } from "../../axios";

const initialState = {
    teams: [],
    /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
    getTeamsStatus: "",
    getTeamsError: "",
    addTeamStatus: "",
    addTeamError: "",
    updateTeamStatus: "",
    updateTeamError: "",
    deleteTeamStatus: "",
    deleteTeamError: "",
};

export const getTeams = createAsyncThunk(
    "teams/getTeams",
    async (noData, { rejectWithValue }) => {
        try {
            const response = await aGet("/teams");
            console.log(`que trae acá:`, response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data);
            /* mandamos como action.payload el error que nos retorna el backend */
            return rejectWithValue(error.response?.data);
        }
    }
);

export const addTeam = createAsyncThunk(
    "teams/addTeam",
    async (team, { rejectWithValue }) => {
        try {
            const response = await aPost("/teams", team);
            console.log(`que trae acá en createTeams:`, response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response?.data);
        }
    }
);

export const removeTeam = createAsyncThunk(
    "teams/removeTeam",
    async (idTeam, { rejectWithValue }) => {
        try {
            const response = await aDelete("/teams/" + idTeam);
            console.log(`que trae acá en deleteTeams:`, response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response?.data);
        }
    }
);

const teamsSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {},
    extraReducers: {
        [getTeams.pending]: (state, action) => {
            return {
                ...state,
                teams: [],
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamsStatus: "pending",
                getTeamsError: "",
                addTeamStatus: "",
                addTeamError: "",
                updateTeamStatus: "",
                updateTeamError: "",
                deleteTeamStatus: "",
                deleteTeamError: "",
            };
        },
        [getTeams.fulfilled]: (state, action) => {
            return {
                ...state,
                teams: action.payload,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamsStatus: "success",
                getTeamsError: "",
                addTeamStatus: "",
                addTeamError: "",
                updateTeamStatus: "",
                updateTeamError: "",
                deleteTeamStatus: "",
                deleteTeamError: "",
            };
        },
        [getTeams.rejected]: (state, action) => {
            return {
                /* no se como podría ocurrir algo así xd */
                ...state,
                teams: [],
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamsStatus: "rejected",
                getTeamsError: "",
                addTeamStatus: "",
                addTeamError: "",
                updateTeamStatus: "",
                updateTeamError: "",
                deleteTeamStatus: "",
                deleteTeamError: "",
            };
        },
        [addTeam.pending]: (state, action) => {
            return {
                ...state,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamsStatus: "",
                getTeamsError: "",
                addTeamStatus: "pending",
                addTeamError: "",
                updateTeamStatus: "",
                updateTeamError: "",
                deleteTeamStatus: "",
                deleteTeamError: "",
            };
        },
        [addTeam.fulfilled]: (state, action) => {
            return {
                ...state,
                teams: [...state.teams, action.payload.team],
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamsStatus: "",
                getTeamsError: "",
                addTeamStatus: "success",
                addTeamError: "",
                updateTeamStatus: "",
                updateTeamError: "",
                deleteTeamStatus: "",
                deleteTeamError: "",
            };
        },
        [addTeam.rejected]: (state, action) => {
            return {
                /* no se como podría ocurrir algo así xd */
                ...state,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamsStatus: "",
                getTeamsError: "",
                addTeamStatus: "rejected",
                addTeamError: action.payload.message,
                updateTeamStatus: "",
                updateTeamError: "",
                deleteTeamStatus: "",
                deleteTeamError: "",
            };
        },
        [removeTeam.pending]: (state, action) => {
            return {
                ...state,
                getTeamsStatus: "",
                getTeamsError: "",
                addTeamStatus: "",
                addTeamError: "",
                updateTeamStatus: "",
                updateTeamError: "",
                deleteTeamStatus: "pending",
                deleteTeamError: "",
            };
        },
        [removeTeam.fulfilled]: (state, action) => {
            const currentTeams = state.teams.filter(
                (team) => team._id !== action.payload._id
            );
            return {
                ...state,
                teams: currentTeams,
                getTeamsStatus: "",
                getTeamsError: "",
                addTeamStatus: "",
                addTeamError: "",
                updateTeamStatus: "",
                updateTeamError: "",
                deleteTeamStatus: "success",
                deleteTeamError: "",
            };
        },
        [removeTeam.rejected]: (state, action) => {
            state = {
                ...state,
                getTeamsStatus: "",
                getTeamsError: "",
                addTeamStatus: "",
                addTeamError: "",
                updateTeamStatus: "",
                updateTeamError: "",
                deleteTeamStatus: "rejected",
                deleteTeamError: action.payload.message,
            };
        },
    },
});

//export const {logout,validate} = userSlice.actions // Esto se utiliza en el dispatch
export default teamsSlice.reducer; // Esto en el store
