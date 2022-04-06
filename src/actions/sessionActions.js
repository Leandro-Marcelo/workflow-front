import { LOGIN, LOGOUT, SIGN_UP, VALIDATE } from "../types/sessionTypes";

export const signUpAction = (credentials) => ({
    type: SIGN_UP,
    payload: credentials,
});

export const loginAction = (credentials) => ({
    type: LOGIN,
    payload: credentials,
});

export const logoutAction = (data) => ({ type: LOGOUT, payload: data });

export const validateAction = (data) => ({ type: VALIDATE, payload: data });
