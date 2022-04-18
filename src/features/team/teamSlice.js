import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { aDelete, aGet, aPost, aPut } from "../../axios";

const initialState = {
    team: [],
    members: [],
    lists: [],
    listsOrder: [],
    /* usuarios que puedo añadir al Miembro */
    filteredUsers: [],
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
    deleteUserStatus: "",
    deleteUserError: "",
};

/* Obtenemos todos los datos, como idLeader, members, lists, tasks, no trae los comentarios */
export const getTeam = createAsyncThunk(
    "team/getTeam",
    async (idTeam, { rejectWithValue }) => {
        try {
            const response = await aGet("/teams/" + idTeam);
            const membersId = response.data.members.map((member) => {
                return member._id._id;
            });
            /* puedo enviarle un arreglo directo o debo enviar si o si un JSON */
            const response2 = await aPost("/teams/filteredUsers", {
                membersId,
            });
            return { ...response.data, filteredUsers: response2.data };
        } catch (error) {
            console.log(error.response.data);
            /* mandamos como action.payload el error que nos retorna el backend */
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

/* cuando una tarea pasa a otra lista */
export const updateLists = createAsyncThunk(
    "team/updateLists",
    /* necesito el idList y las tareas */
    async (
        { idList1, tasksUpdated, idList2, tasksUpdated2, idTask },
        { rejectWithValue }
    ) => {
        console.log(idTask);
        try {
            /* si actualizamos el idList de la tarea antes de que los de abajo actualizen y obtengan la nueva data de las tasks, nos evitamos tener que modificar este idList en el state.lists */
            const response3 = await aPut("/tasks/" + idTask, {
                idList: idList2,
            });
            const response = await aPut("/lists/" + idList1, {
                tasks: tasksUpdated,
            });
            const response2 = await aPut("/lists/" + idList2, {
                tasks: tasksUpdated2,
            });
            /* su nuevo idList es ahora idList2, ya que es la lista a la cual se cambia */
            const responseData = [
                response.data,
                response2.data,
                response3.data,
            ];
            console.log(`que trae acá:`, responseData);
            return responseData;
        } catch (error) {
            console.log(error.response.data);
            /* mandamos como action.payload el error que nos retorna el backend */
            return rejectWithValue(error.response?.data);
        }
    }
);

export const updateListsOrder = createAsyncThunk(
    "team/updateListsOrder",
    /* necesito el idList y las tareas */
    async ({ idTeam, newListsOrder }, { rejectWithValue }) => {
        try {
            const response = await aPut("/teams/" + idTeam, {
                lists: newListsOrder,
            });
            const response2 = await aGet("/teams/" + idTeam);
            /*    const responseData = [response.data.lists, response2.data]; */
            console.log(response2.data);
            return response2.data;
        } catch (error) {
            console.log(error.response.data);
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

export const deleteList = createAsyncThunk(
    "team/deleteList",
    /* necesito el idList y las tareas */
    async ({ idList, idTeam }, { rejectWithValue }) => {
        try {
            const response = await aDelete(
                `/teams/${idTeam}/removeList/${idList}`
            );
            /* esto sería una limpieza hacia la base de datos, pero debo hacerlo desde el frontend o esto lo hacemos despues nosotros los backeros */
            /* const anything = await Promise.all(
                response.data.tasks.map((task) => {
                    return aDelete(`/lists/${idList}/removeTask/${task._id}`);
                })
            ); */
            console.log(`que trae acá:`, response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data);

            return rejectWithValue(error.response?.data);
        }
    }
);

/* ********************* Members ************************ */

export const changeRole = createAsyncThunk(
    "team/changeRole",
    /* necesito el idList y las tareas */
    async (data, { rejectWithValue }) => {
        try {
            /* lo ideal es que devuelta la data actualizada desde el backend */
            const response = await aPost(`/teams/changeRole`, data);
            return data;
        } catch (error) {
            console.log(error.response.data);

            return rejectWithValue(error.response?.data);
        }
    }
);

export const addMember = createAsyncThunk(
    "team/addMember",
    async ({ idTeam, idNewMember, name, email, img }, { rejectWithValue }) => {
        try {
            const response = await aPost("/teams/addMember", {
                idTeam,
                idNewMember,
            });
            console.log(response.data);
            return { _id: idNewMember, name, email, img };
        } catch (error) {
            console.log(error.response.data);
            return rejectWithValue(error.response?.data);
        }
    }
);

export const deleteMember = createAsyncThunk(
    "team/deleteMember",
    /* necesito el idList y las tareas */
    async ({ idTeam, idMember }, { rejectWithValue }) => {
        try {
            const response = await aDelete(
                `/teams/${idTeam}/removeMember/${idMember}`
            );
            return { idTeam, idMember };
        } catch (error) {
            console.log(error.response.data);

            return rejectWithValue(error.response?.data);
        }
    }
);

/* ********************* Tasks ************************ */

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

export const updateTask = createAsyncThunk(
    "team/updateTask",
    /* necesito el idList y las tareas */
    async ({ form, idTask }, { rejectWithValue }) => {
        console.log(form);
        console.log(idTask);
        try {
            const response = await aPut(`/tasks/${idTask}`, form);
            return response.data;
        } catch (error) {
            console.log(error.response.data);

            return rejectWithValue(error.response?.data);
        }
    }
);

export const deleteTask = createAsyncThunk(
    "team/deleteTask",
    /* necesito el idList y las tareas */
    async ({ idList, idTask }, { rejectWithValue }) => {
        try {
            const response = await aDelete(
                `/lists/${idList}/removeTask/${idTask}`
            );
            console.log(`que trae acá:`, response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data);

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
            const { name, description, _id, img, idLeader, filteredUsers } =
                action.payload;
            const team = { name, description, _id, img, idLeader };
            const { members } = action.payload;
            const { lists } = action.payload;
            const listsOrder = lists.map((list) => list._id);
            return {
                ...state,
                team: team,
                members: members,
                lists: lists,
                listsOrder,
                filteredUsers,
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
        [updateLists.pending]: (state, action) => {
            return {
                ...state,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "",
                getTeamError: "",
                updateListStatus: "pending",
                updateListError: "",
            };
        },
        [updateLists.fulfilled]: (state, action) => {
            const [list1, list2] = action.payload;
            console.log(state.lists);
            const updatedLists = state.lists.map((list) =>
                list._id === list1.list._id
                    ? list1.list
                    : list._id === list2.list._id
                    ? list2.list
                    : list
            );
            console.log(`updateList:`, updatedLists);
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
        [updateLists.rejected]: (state, action) => {
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
        [updateListsOrder.pending]: (state, action) => {
            return {
                ...state,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "",
                getTeamError: "",
                updateListStatus: "pending",
                updateListError: "",
            };
        },
        [updateListsOrder.fulfilled]: (state, action) => {
            const lists = action.payload.lists;
            const listsOrder = lists.map((list) => list._id);
            return {
                ...state,
                lists,
                listsOrder,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                getTeamStatus: "success",
                getTeamError: "",
                updateListStatus: "",
                updateListError: "",
            };
        },
        [updateListsOrder.rejected]: (state, action) => {
            return {
                /* no se como podría ocurrir algo así xd */
                ...state,
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
            /* console.log(JSON.stringify(state.lists));
            console.log(action.payload); */
            const updatedListsOrder = [...state.listsOrder, action.payload._id];
            /*      console.log(JSON.stringify(updatedListsOrder)); */
            const updatedList = [...state.lists, action.payload];
            return {
                ...state,
                lists: updatedList,
                /* es importante tambien actualizar el listsOrder porque sino al momento de hacer el drag and drop de listas apenas crea la lista, lo que haría es que no encontraría el id de esta lista nueva en ese arreglo de listsOrder, entonces cuando lo mande actualizar en la base de datos, prácticamente la elimina porque no existe xd */
                listsOrder: updatedListsOrder,
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
        [deleteList.pending]: (state, action) => {
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
        [deleteList.fulfilled]: (state, action) => {
            console.log(`ENTRE ACÁ`);
            const updatedLists = state.lists.filter(
                (lista) => lista._id !== action.payload._id
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
                updateListNameError: "",
            };
        },
        [deleteList.rejected]: (state, action) => {
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
        [deleteTask.pending]: (state, action) => {
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
        [deleteTask.fulfilled]: (state, action) => {
            /* console.log(action.payload.taskDeleted.idList); */
            const filteredList = state.lists.filter(
                (lista) => lista._id === action.payload.taskDeleted.idList
            );
            const updatedTasks = filteredList[0].tasks.filter(
                (task) => task._id !== action.payload.taskDeleted._id
            );
            const mockup = {
                ...filteredList[0],
                tasks: updatedTasks,
            };
            /* console.log(JSON.stringify(mockup)); */
            const updatedList = state.lists.map((list) =>
                list._id === mockup._id ? mockup : list
            );

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
                addListStatus: "",
                addListError: "",
                updateListNameError: "",
            };
        },
        [deleteTask.rejected]: (state, action) => {
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
        /* ************************ Members *************************** */
        [changeRole.pending]: (state, action) => {
            return {
                ...state,
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
        },
        [changeRole.fulfilled]: (state, action) => {
            const filteredMember = state.members.filter((member) => {
                return member._id._id === action.payload.idMember;
            });

            const updatedRole = {
                ...filteredMember[0],
                role: action.payload.newRole,
            };

            const updatedMembers = state.members.map((member) =>
                member._id._id === action.payload.idMember
                    ? updatedRole
                    : member
            );

            /* console.log(JSON.stringify(updatedMembers)); */

            return {
                ...state,
                members: updatedMembers,
                getTeamStatus: "",
                getTeamError: "",
                updateListStatus: "",
                updateListError: "",
                addTaskStatus: "",
                addTaskError: "",
                addListStatus: "",
                addListError: "",
                updateListNameError: "",
            };
        },
        [changeRole.rejected]: (state, action) => {
            return {
                ...state,
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
        [deleteMember.pending]: (state, action) => {
            return {
                ...state,
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
        },
        [deleteMember.fulfilled]: (state, action) => {
            const filteredMember = state.members.filter((member) => {
                return member._id._id !== action.payload.idMember;
            });

            const filteredMember2 = state.members.filter((member) => {
                return member._id._id === action.payload.idMember;
            });

            const updatedFilteredUsers = [
                ...state.filteredUsers,
                filteredMember2[0]._id,
            ];

            return {
                ...state,
                members: filteredMember,
                filteredUsers: updatedFilteredUsers,
                getTeamStatus: "",
                getTeamError: "",
                updateListStatus: "",
                updateListError: "",
                addTaskStatus: "",
                addTaskError: "",
                addListStatus: "",
                addListError: "",
                updateListNameError: "",
            };
        },
        [deleteMember.rejected]: (state, action) => {
            return {
                ...state,
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

        [addMember.pending]: (state, action) => {
            return {
                ...state,
            };
        },
        [addMember.fulfilled]: (state, action) => {
            const { _id, name, email, img } = action.payload;
            const newMember = {
                _id: { _id, name, email, img },
                role: "normal",
            };
            const updatedFilteredUser = state.filteredUsers.filter(
                (user) => user._id !== _id
            );
            const updatedMembers = [...state.members, newMember];
            return {
                ...state,
                members: updatedMembers,
                filteredUsers: updatedFilteredUser,
            };
        },
        [addMember.rejected]: (state, action) => {
            return {
                ...state,
            };
        },
        [updateTask.pending]: (state, action) => {
            return {
                ...state,
            };
        },
        [updateTask.fulfilled]: (state, action) => {
            /* state.lists.map((list)); */
            const filteredList = state.lists.filter(
                (list) => list._id === action.payload.idList
            );

            /*  const updatedFilteredList = filteredList[0].tasks.filter((task) =>
                task._id === action.payload._id ? action.payload : task
            ); */
            console.log(`action.payload`, action.payload);
            const updatedTasks = filteredList[0].tasks.map((task) => {
                return task._id === action.payload._id ? action.payload : task;
            });

            const updatedList = {
                ...filteredList[0],
                tasks: updatedTasks,
            };

            const updatedLists = state.lists.map((list) =>
                list._id === updatedList._id ? updatedList : list
            );

            console.log(JSON.stringify(updatedLists));
            return {
                ...state,
                lists: updatedLists,
            };
        },
        [updateTask.rejected]: (state, action) => {
            return {
                ...state,
            };
        },
    },
});

//export const {logout,validate} = userSlice.actions // Esto se utiliza en el dispatch
export default teamSlice.reducer; // Esto en el store
