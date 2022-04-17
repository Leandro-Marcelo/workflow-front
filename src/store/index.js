import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import teamsReducer from "../features/teams/teamsSlice";
import teamReducer from "../features/team/teamSlice";
import usersReducer from "../features/users/usersSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        teams: teamsReducer,
        team: teamReducer,
        users: usersReducer,
    },
});

export default store;
