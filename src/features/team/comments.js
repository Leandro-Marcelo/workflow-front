import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { aDelete, aGet, aPost, aPut } from "../../axios";

const initialState = {
    taskComments: {},
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
    async ({ idTask, idList, comment }, { rejectWithValue }) => {
        try {
            const response = await aPost(
                `/tasks/${idTask}/addComment`,
                comment
            );
            const responseData = { ...response.data, idList };
            return responseData;
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
            console.log(idTask, idComment);
            const response = await aDelete(
                `/tasks/${idTask}/removeComment/${idComment}`
            );
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
            return {
                ...state,
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
            return {
                ...state,
            };
        },
        [removeComment.rejected]: (state, action) => {
            return {
                ...state,
            };
        },
    },
});

//export const {logout,validate} = userSlice.actions // Esto se utiliza en el dispatch
export default commentsSlice.reducer; // Esto en el store
