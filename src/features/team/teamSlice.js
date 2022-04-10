import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { aDelete, aGet, aPost, aPut } from "../../axios";

const initialState = {
    team: [],
    members: [],
    lists: [],
    /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
    getTeamStatus: "",
    getTeamError: "",
    updateListStatus: "",
    updateListError: "",
    addTaskStatus: "",
    addTaskError: "",
    addListStatus: "",
    addListError: "",
    updateListNameStatus: "",
    updateListNameError: "",
};

/* Obtenemos todos los datos, como idLeader, members, lists, tasks, no trae los comentarios */
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

/* Agregamos una tarea, funcionando */
export const addTask = createAsyncThunk(
    "team/addTask",
    async ({ idList, name }, { rejectWithValue }) => {
        const data = { idList, name };
        try {
            const response = await aPost(`/lists/${idList}/addTask`, data);
            return response.data;
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data);
        }
    }
);

/* Agregamos una lista, funcionando */
export const addList = createAsyncThunk(
    "team/addList",
    async ({ idTeam, newList }, { rejectWithValue }) => {
        try {
            const response = await aPost(`/teams/${idTeam}/addList`, newList);
            console.log(`que trae acá:`, response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response?.data);
        }
    }
);

/* esto es para el reordernar las tasks en su misma lista */
/* para reutilizar esto, tendría que enviar un string e ir poniendo if, tipo if si contiene tasks hace esto y si no hace esto otro, por mientras prefiero hacer mas de esto abajo */
export const updateList = createAsyncThunk(
    "team/updateList",
    /* necesito el idList y las tareas */
    async ({ idList, tasksUpdated }, { rejectWithValue }) => {
        try {
            const response = await aPut("/lists/" + idList, {
                tasks: tasksUpdated,
            });
            console.log(`que trae acá:`, response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data);
            /* mandamos como action.payload el error que nos retorna el backend */
            return rejectWithValue(error.response?.data);
        }
    }
);

export const updateListName = createAsyncThunk(
    "team/updateListName",
    /* necesito el idList y las tareas */
    async ({ idList, name }, { rejectWithValue }) => {
        try {
            const response = await aPut("/lists/" + idList, {
                name,
            });
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
                updateListStatus: "",
                updateListError: "",
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
                updateListStatus: "",
                updateListError: "",
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
                updateListStatus: "",
                updateListError: "",
            };
        },
        [updateList.pending]: (state, action) => {
            return {
                ...state,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "",
                getTeamError: "",
                updateListStatus: "pending",
                updateListError: "",
            };
        },
        [updateList.fulfilled]: (state, action) => {
            console.log(state.lists);
            const updatedLists = state.lists.map((list) =>
                list._id === action.payload.list._id
                    ? action.payload.list
                    : list
            );
            console.log(updatedLists);
            return {
                ...state,
                lists: updatedLists,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "",
                getTeamError: "",
                updateListStatus: "success",
                updateListError: "",
            };
        },
        [updateList.rejected]: (state, action) => {
            return {
                /* no se como podría ocurrir algo así xd */
                ...state,
                team: [],
                members: [],
                lists: [],
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "rejected",
                getTeamError: "",
                updateListStatus: "",
                updateListError: "",
            };
        },
        [addTask.pending]: (state, action) => {
            return {
                ...state,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "",
                getTeamError: "",
                updateListStatus: "",
                updateListError: "",
                addTaskStatus: "pending",
                addTaskError: "",
            };
        },
        [addTask.fulfilled]: (state, action) => {
            const filteredList = state.lists.filter(
                (list) => list._id === action.payload.idList
            );
            const updatedTasks = [...filteredList[0].tasks, action.payload];
            const taskObject = {
                ...filteredList[0],
                tasks: updatedTasks,
            };
            const updatedLists = state.lists.map((lista) =>
                lista._id === taskObject._id ? taskObject : lista
            );
            return {
                ...state,
                lists: updatedLists,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "",
                getTeamError: "",
                updateListStatus: "",
                updateListError: "",
                addTaskStatus: "success",
                addTaskError: "",
            };
        },
        [addTask.rejected]: (state, action) => {
            return {
                /* no se como podría ocurrir algo así xd */
                ...state,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "",
                getTeamError: "",
                updateListStatus: "",
                updateListError: "",
                addTaskStatus: "rejected",
                addTaskError: "",
            };
        },
        [addList.pending]: (state, action) => {
            return {
                ...state,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "",
                getTeamError: "",
                updateListStatus: "",
                updateListError: "",
                addTaskStatus: "",
                addTaskError: "",
                addListStatus: "pending",
                addListError: "",
            };
        },
        [addList.fulfilled]: (state, action) => {
            console.log(JSON.stringify(state.lists));
            console.log(action.payload);
            const updatedList = [...state.lists, action.payload];
            return {
                ...state,
                lists: updatedList,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "",
                getTeamError: "",
                updateListStatus: "",
                updateListError: "",
                addTaskStatus: "",
                addTaskError: "",
                addListStatus: "success",
                addListError: "",
            };
        },
        [addList.rejected]: (state, action) => {
            return {
                /* no se como podría ocurrir algo así xd */
                ...state,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "",
                getTeamError: "",
                updateListStatus: "",
                updateListError: "",
                addTaskStatus: "rejected",
                addTaskError: "",
                addListStatus: "",
                addListError: "",
            };
        },
        [updateListName.pending]: (state, action) => {
            return {
                ...state,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "",
                getTeamError: "",
                updateListStatus: "",
                updateListError: "",
                addTaskStatus: "",
                addTaskError: "",
                addListStatus: "",
                addListError: "",
                updateListNameStatus: "pending",
                updateListNameError: "",
            };
        },
        [updateListName.fulfilled]: (state, action) => {
            const updatedLists = state.lists.map((lista) =>
                lista._id === action.payload.list._id
                    ? action.payload.list
                    : lista
            );
            return {
                ...state,
                lists: updatedLists,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "",
                getTeamError: "",
                updateListStatus: "",
                updateListError: "",
                addTaskStatus: "",
                addTaskError: "",
                addListStatus: "",
                addListError: "",
                /* pone true xd */
                updateListNameStatus: action.payload.success,
                updateListNameError: "",
            };
        },
        [updateListName.rejected]: (state, action) => {
            return {
                /* no se como podría ocurrir algo así xd */
                ...state,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "",
                getTeamError: "",
                updateListStatus: "",
                updateListError: "",
                addTaskStatus: "",
                addTaskError: "",
                addListStatus: "",
                addListError: "",
                updateListNameStatus: "rejected",
                updateListNameError: "",
            };
        },
    },
});

//export const {logout,validate} = userSlice.actions // Esto se utiliza en el dispatch
export default teamSlice.reducer; // Esto en el store
