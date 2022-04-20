import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { aDelete, aGet, aPost, aPut } from "../../axios";

const initialState = {
    taskComments: {},
    viewMembersByRole: [],
};

/* ********************* comments ************************ */

export const getComments = createAsyncThunk(
    "comments/getComments",
    async ({ idTask }, { rejectWithValue }) => {
        console.log(`ALO????????`);
        try {
            const response = await aGet(`/tasks/${idTask}`);
            return response.data;
        } catch (error) {
            console.log(error.response.data);

            return rejectWithValue(error.response?.data);
        }
    }
);

export const addComment = createAsyncThunk(
    "comments/addComment",
    /* necesito el idList y las tareas */
    /* commentData, file  */
    async ({ idTask, comment }, { rejectWithValue }) => {
        try {
            const response = await aPost(
                `/tasks/${idTask}/addComment`,
                comment
            );
            /* console.log(response.data.comment.idUser);
            response.data.user.id; */
            return response.data;
        } catch (error) {
            console.log(error.response.data);

            return rejectWithValue(error.response?.data);
        }
    }
);

export const updateComment = createAsyncThunk(
    "comments/updateComment",
    /* necesito el idList y las tareas */
    /* commentData, file  */
    async ({ idComment, updatedComment }, { rejectWithValue }) => {
        try {
            const response = await aPut(`/comments/:idComment`, updatedComment);
            return response.data;
        } catch (error) {
            console.log(error.response.data);

            return rejectWithValue(error.response?.data);
        }
    }
);

export const removeComment = createAsyncThunk(
    "comments/removeComment",
    /* necesito el idList y las tareas */
    /* commentData, file  */
    async ({ idTask, idComment }, { rejectWithValue }) => {
        try {
            const response = await aDelete(
                `/tasks/${idTask}/removeComment/${idComment}`
            );
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data);

            return rejectWithValue(error.response?.data);
        }
    }
);

/* ********************* viewMembersByRole ************************ */

export const viewMembersByRole = createAsyncThunk(
    "comments/viewMembersByRole",
    async ({ idTeam, role }, { rejectWithValue }) => {
        try {
            const response = await aGet(`teams/${idTeam}/role/${role}`);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data);

            return rejectWithValue(error.response?.data);
        }
    }
);

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: {
        [getComments.pending]: (state, action) => {
            return {
                ...state,
            };
        },
        [getComments.fulfilled]: (state, action) => {
            return {
                ...state,
                taskComments: action.payload,
            };
        },
        [getComments.rejected]: (state, action) => {
            return {
                ...state,
            };
        },
        [addComment.pending]: (state, action) => {
            return {
                ...state,
            };
        },
        [addComment.fulfilled]: (state, action) => {
            /* este join es para unir las propiedades del req.user al nuevo comentario que es un objeto, esto es para que en el frontend al momento de mostrar el nuevo comentario pueda mostrar el name y la img de quien lo hizo */
            const joinProperties = {
                ...action.payload.comment,
                idUser: action.payload.user,
            };
            const updatedComments = [
                ...state.taskComments.comments,
                joinProperties,
            ];
            const updatedTaskComments = {
                ...state.taskComments,
                comments: updatedComments,
            };
            return {
                ...state,
                taskComments: updatedTaskComments,
            };
        },
        [addComment.rejected]: (state, action) => {
            return {
                ...state,
            };
        },
        [updateComment.pending]: (state, action) => {
            return {
                ...state,
            };
        },
        [updateComment.fulfilled]: (state, action) => {
            return {
                ...state,
            };
        },
        [updateComment.rejected]: (state, action) => {
            return {
                ...state,
            };
        },
        [removeComment.pending]: (state, action) => {
            return {
                ...state,
            };
        },
        [removeComment.fulfilled]: (state, action) => {
            const updatedComments = state.taskComments.comments.filter(
                (comment) => comment._id !== action.payload._id
            );
            const updatedTaskComments = {
                ...state.taskComments,
                comments: updatedComments,
            };
            return {
                ...state,
                taskComments: updatedTaskComments,
            };
        },
        [removeComment.rejected]: (state, action) => {
            return {
                ...state,
            };
        },
        [viewMembersByRole.pending]: (state, action) => {
            return {
                ...state,
            };
        },
        [viewMembersByRole.fulfilled]: (state, action) => {
            return {
                ...state,
                viewMembersByRole: action.payload,
            };
        },
        [viewMembersByRole.rejected]: (state, action) => {
            return {
                ...state,
            };
        },
    },
});

//export const {logout,validate} = userSlice.actions // Esto se utiliza en el dispatch
export default commentsSlice.reducer; // Esto en el store
