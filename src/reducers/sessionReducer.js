import { LOGIN, LOGOUT, SIGN_UP, VALIDATE } from "../types/sessionTypes";

export const initialState = {
    logged: false,
    name: "",
    img: "",
};

export function sessionReducer(state = initialState, action) {
    switch (action.type) {
        case SIGN_UP: {
            console.log(action.payload);
            return {
                ...state,
                logged: true,
                name: action.payload.name,
                img: action.payload.img,
                /* podria guardar tambien el email por si le hago el dashboard o el profile */
            };
        }
        case LOGIN: {
            console.log(action.payload);
            return {
                ...state,
                logged: true,
                name: action.payload.name,
                img: action.payload.img,
            };
        }
        case LOGOUT: {
            console.log(action.payload);
            return {
                ...state,
                logged: false,
                name: "",
                img: "",
            };
        }
        case VALIDATE: {
            console.log(action.payload.user.name);
            return {
                ...state,
                logged: true,
                name: action.payload.user.name,
                img: action.payload.user?.img,
            };
        }
        default:
            return state;
    }
}
