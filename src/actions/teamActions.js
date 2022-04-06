import {
    CREATE_TEAM,
    DELETE_TEAM,
    READ_ALL_TEAMS,
    UPDATE_TEAM,
    NO_DATA,
} from "../types/teamTypes";

export const createAction = (data) => ({ type: CREATE_TEAM, payload: data });

export const readAllAction = (data) => ({
    type: READ_ALL_TEAMS,
    payload: data,
});

export const updateAction = (data) => ({ type: UPDATE_TEAM, payload: data });

export const deleteAction = (id) => ({ type: DELETE_TEAM, payload: id });

export const noAction = () => ({ type: NO_DATA });
