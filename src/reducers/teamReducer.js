import {
    CREATE_TEAM,
    DELETE_TEAM,
    NO_DATA,
    READ_ALL_TEAMS,
    UPDATE_TEAM,
} from "../types/teamTypes";

export const initialState = {
    teams: [],
};

export function teamReducer(state = initialState, action) {
    switch (action.type) {
        case READ_ALL_TEAMS: {
            console.log(action.payload);
            return {
                ...state,
                teams: action.payload.map((data) => data),
            };
        }
        case CREATE_TEAM: {
            console.log(action.payload);
            return {
                ...state,
                teams: [...state.teams, action.payload],
            };
        }
        case UPDATE_TEAM: {
            console.log(action.payload);

            let newData = state.teams.map((el) =>
                el.id === action.payload.id ? action.payload : el
            );

            return {
                ...state,
                teams: newData,
            };
        }
        case DELETE_TEAM: {
            console.log(action.payload);
            let teamsUpdated = state.teams.filter(
                (team) => team._id !== action.payload
            );

            return {
                ...state,
                teams: teamsUpdated,
            };
        }
        case NO_DATA:
            return initialState;
        default:
            return state;
    }
}
