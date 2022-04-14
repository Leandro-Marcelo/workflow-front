import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { aDelete, aGet, aPost, aPut } from "../../axios";

const initialState = {
    logged: false,
    user: [],
    status: "",
    message: "",
    statusSignUp: "",
    statusLogin: "",
    messageLogin: "",
    messageSignUp: "",
    /* error: true, */
};

export const login = createAsyncThunk(
    "auth/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await aPost("/auth/login", credentials);
            //console.log(response.data);
            return response.data;
        } catch (error) {
            //console.log(error.response.data);
            return rejectWithValue(error.response?.data);
        }
    }
);

export const signUp = createAsyncThunk(
    "auth/signUp",
    async (user, { rejectWithValue }) => {
        try {
            const response = await aPost("/auth/signup", user);
            //console.log(response.data);
            return response.data;
        } catch (error) {
            //console.log(error.response.data);
            return rejectWithValue(error.response?.data);
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (noData, { rejectWithValue }) => {
        try {
            const response = await aPost("/auth/logout");
            //console.log(response.data);
            return response.data;
        } catch (error) {
            /* el backend no responde con nada si es rejected, es decir, si vamos a validateee */
            //console.log(error.response.data);
            /* mandamos como action.payload el error que nos retorna el backend */
            return rejectWithValue(error.response?.data);
        }
    }
);

export const validate = createAsyncThunk(
    "auth/validate",
    async (noData, { rejectWithValue }) => {
        try {
            const response = await aPost("/auth/validate");
            //console.log(response.data);
            return response.data;
        } catch (error) {
            /* el backend no responde con nada si es rejected, es decir, si vamos a validateee */
            //  console.log(error.response.data);
            /* mandamos como action.payload el error que nos retorna el backend */
            return rejectWithValue(error.response?.data);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: {
        [login.pending]: (state, action) => {
            return {
                ...state,
                /* logged */
                logged: false,
                /* name */
                user: [],
                /* isFetching */
                statusLogin: "pending",
                /* message */
                messageLogin: "",
            };
        },
        [login.fulfilled]: (state, action) => {
            /* console.log(action.payload); */
            return {
                ...state,
                logged: action.payload.success,
                user: action.payload.user,
                /* isFetching */
                statusLogin: "success",
                /* message */
                messageLogin: "",
            };
        },
        [login.rejected]: (state, action) => {
            return {
                ...state,
                logged: false,
                user: [],
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                /* isFetching */
                statusLogin: "rejected",
                /* message */
                messageLogin: action.payload.message,
            };
        },
        [signUp.pending]: (state, action) => {
            return {
                ...state,
                logged: false,
                user: [],
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                /* isFetching */
                statusSignUp: "pending",
                /* message */
                messageSignUp: "",
            };
        },
        [signUp.fulfilled]: (state, action) => {
            return {
                ...state,
                logged: action.payload.success,
                user: action.payload.user,

                /* isFetching */
                statusSignUp: "success",
                /* message */
                messageSignUp: "",
            };
        },
        [signUp.rejected]: (state, action) => {
            return {
                ...state,
                logged: false,
                user: [],
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                /* isFetching */
                statusSignUp: "rejected",
                /* message */
                messageSignUp: action.payload.message,
            };
        },

        [logout.pending]: (state, action) => {
            return {
                ...state,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                /* isFetching */
                status: "pending",
                /* message */
                message: "",
            };
        },
        [logout.fulfilled]: (state, action) => {
            return {
                ...state,
                logged: !action.payload.success,
                user: [],
                /* isFetching */
                status: "success",
                /* message */
                message: "",
                statusLogin: "",
                statusSignUp: "",
                messageSignUp: "",
                messageLogin: "",
            };
        },
        [logout.rejected]: (state, action) => {
            return {
                /* no se como podría ocurrir algo así xd */
                ...state,
                logged: false,
                user: [],
                /* isFetching */
                status: "rejected",
                /* message */
                message: "",
            };
        },
        [validate.pending]: (state, action) => {
            return {
                ...state,
                logged: false,
                user: [],
                /* isFetching */
                status: "",
                /* message */
                message: "",
            };
        },
        [validate.fulfilled]: (state, action) => {
            /* console.log(`que llega acá:`, action.payload); */
            // state.todos.push(action.payload);
            return {
                ...state,
                /* si success es true entonces es que validate fue bien eso significa que esta logeado, es decir, logged:true */
                logged: action.payload.success,
                user: action.payload.user,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                /* isFetching */
                status: "success",
                /* message */
                message: "",
            };
        },
        [validate.rejected]: (state, action) => {
            return {
                ...state,
                logged: false,
                user: [],
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                /* isFetching */
                status: "rejected",
                /* message */
                message: "",
            };
        },
    },
});

//export const {logout,validate} = userSlice.actions // Esto se utiliza en el dispatch
export default authSlice.reducer; // Esto en el store
