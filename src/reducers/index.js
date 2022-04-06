import { combineReducers } from "redux";
import { sessionReducer } from "./sessionReducer";

/* import { crudReducer } from "./crudReducer"; */
import { teamReducer } from "./teamReducer";

const reducer = combineReducers({
    /* crud: crudReducer, */
    team: teamReducer,
    session: sessionReducer,
});

export default reducer;
