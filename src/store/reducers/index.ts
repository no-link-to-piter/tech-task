import { combineReducers } from "redux";

import { CallReducer } from "./CallReducer";

const rootReducer = combineReducers({
    call: CallReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export { rootReducer };