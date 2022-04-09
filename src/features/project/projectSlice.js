import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { aDelete, aGet, aPost, aPut } from "../../axios";

const initialState = {
    logged: false,
    user: null,
    /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
    loginStatus: "",
    loginError: "",
    signUpStatus: "",
    signUpError: "",
    logoutStatus: "",
    logoutError: "",
    validateStatus: "",
    validateError: "",
};

export const login = createAsyncThunk(
    "project/login",
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await aPost("/auth/login", {
                email: credentials.email,
                password: credentials.password,
            });
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data);
            /* mandamos como action.payload el error que nos retorna el backend */
            return rejectWithValue(error.response?.data);
        }
    }
);

export const signUp = createAsyncThunk(
    "project/signUp",
    async (user, { rejectWithValue }) => {
        try {
            const response = await aPost("/auth/signup", user);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error.response.data);
            /* mandamos como action.payload el error que nos retorna el backend */
            return rejectWithValue(error.response?.data);
        }
    }
);

export const logout = createAsyncThunk(
    "project/logout",
    async (noData, { rejectWithValue }) => {
        try {
            const response = await aPost("/auth/logout");
            console.log(response.data);
            return response.data;
        } catch (error) {
            /* el backend no responde con nada si es rejected, es decir, si vamos a validateee */
            console.log(error.response.data);
            /* mandamos como action.payload el error que nos retorna el backend */
            return rejectWithValue(error.response?.data);
        }
    }
);

export const validate = createAsyncThunk(
    "project/validate",
    async (noData, { rejectWithValue }) => {
        try {
            const response = await aPost("/auth/validate");
            console.log(response.data);
            return response.data;
        } catch (error) {
            /* el backend no responde con nada si es rejected, es decir, si vamos a validateee */
            console.log(error.response.data);
            /* mandamos como action.payload el error que nos retorna el backend */
            return rejectWithValue(error.response?.data);
        }
    }
);

const authSlice = createSlice({
    name: "project",
    initialState,
    reducers: {},
    extraReducers: {
        [login.pending]: (state, action) => {
            return {
                ...state,
                logged: false,
                user: null,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                loginStatus: "pending",
                loginError: "",
                signUpStatus: "",
                signUpError: "",
                logoutStatus: "",
                logoutError: "",
                validateStatus: "",
                validateError: "",
            };
        },
        [login.fulfilled]: (state, action) => {
            return {
                ...state,
                logged: action.payload.success,
                user: action.payload.user,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                loginStatus: "success",
                loginError: "",
                signUpStatus: "",
                signUpError: "",
                logoutStatus: "",
                logoutError: "",
                validateStatus: "",
                validateError: "",
            };
        },
        [login.rejected]: (state, action) => {
            return {
                ...state,
                logged: action.payload.success,
                user: null,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                loginStatus: "rejected",
                loginError: action.payload.message,
                signUpStatus: "",
                signUpError: "",
                logoutStatus: "",
                logoutError: "",
                validateStatus: "",
                validateError: "",
            };
        },
        [signUp.pending]: (state, action) => {
            return {
                ...state,
                /* aca debería ir false? */
                logged: false,
                user: null,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                loginStatus: "",
                loginError: "",
                signUpStatus: "pending",
                signUpError: "",
                logoutStatus: "",
                logoutError: "",
                validateStatus: "",
                validateError: "",
            };
        },
        [signUp.fulfilled]: (state, action) => {
            return {
                ...state,
                logged: action.payload.success,
                user: action.payload.user,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                loginStatus: "",
                loginError: "",
                signUpStatus: "success",
                signUpError: "",
                logoutStatus: "",
                logoutError: "",
                validateStatus: "",
                validateError: "",
            };
        },
        [signUp.rejected]: (state, action) => {
            return {
                ...state,
                logged: action.payload.success,
                user: null,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                loginStatus: "",
                loginError: "",
                signUpStatus: "rejected",
                signUpError: action.payload.message,
                logoutStatus: "",
                logoutError: "",
                validateStatus: "",
                validateError: "",
            };
        },

        [logout.pending]: (state, action) => {
            return {
                ...state,
                /* aca debería ir false? */
                logged: false,
                user: null,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                loginStatus: "",
                loginError: "",
                signUpStatus: "",
                signUpError: "",
                logoutStatus: "pending",
                logoutError: "",
                validateStatus: "",
                validateError: "",
            };
        },
        [logout.fulfilled]: (state, action) => {
            return {
                ...state,
                /* le pongo la negación porque me tirará true diciendome que el logout fue exitoso, sin embargo, yo quiero pasar ese true a false ya que es logico no? xd */
                logged: !action.payload.success,
                user: null,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                loginStatus: "",
                loginError: "",
                signUpStatus: "",
                signUpError: "",
                logoutStatus: "success",
                logoutError: "",
                validateStatus: "",
                validateError: "",
            };
        },
        [logout.rejected]: (state, action) => {
            return {
                /* no se como podría ocurrir algo así xd */
                ...state,
                logged: false,
                user: null,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                loginStatus: "",
                loginError: "",
                signUpStatus: "",
                signUpError: "",
                logoutStatus: "rejected",
                logoutError: "",
                validateStatus: "",
                validateError: "",
            };
        },
        [validate.pending]: (state, action) => {
            return {
                ...state,
                logged: false,
                user: null,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                loginStatus: "",
                loginError: "",
                signUpStatus: "",
                signUpError: "",
                logoutStatus: "",
                logoutError: "",
                validateStatus: "pending",
                validateError: "",
            };
        },
        [validate.fulfilled]: (state, action) => {
            // state.todos.push(action.payload);
            return {
                ...state,
                /* si success es true entonces es que validate fue bien eso significa que esta logeado, es decir, logged:true */
                logged: action.payload.success,
                user: action.payload.user,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                loginStatus: "",
                loginError: "",
                signUpStatus: "",
                signUpError: "",
                logoutStatus: "",
                logoutError: "",
                validateStatus: "success",
                validateError: "",
            };
        },
        [validate.rejected]: (state, action) => {
            return {
                ...state,
                logged: false,
                user: null,
                /* dependiendo de si fue fulfilled o rejected, mostrara un mensaje */
                loginStatus: "",
                loginError: "",
                signUpStatus: "",
                signUpError: "",
                logoutStatus: "",
                logoutError: "",
                validateStatus: "rejected",
                validateError: action.payload,
            };
        },
    },
});

//export const {logout,validate} = userSlice.actions // Esto se utiliza en el dispatch
export default authSlice.reducer; // Esto en el store
