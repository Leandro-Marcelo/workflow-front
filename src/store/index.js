import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import teamsReducer from "../features/teams/teamsSlice";
import teamReducer from "../features/team/teamSlice";
import commentsReducer from "../features/team/comments";

const store = configureStore({
    reducer: {
        auth: authReducer,
        teams: teamsReducer,
        team: teamReducer,
        comments: commentsReducer,
    },
});

export default store;
