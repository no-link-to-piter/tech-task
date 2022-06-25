import { CallAction, CallActionTypes, CallState } from "store/types/call";

const initialState: CallState = {
    callList: null,
    callRecord: null,
    loading: false,
    error: null,
}

/* eslint-disable */
export const CallReducer = (state = initialState, action: CallAction): CallState => {
    switch(action.type) {

        case CallActionTypes.FETCH_CALL_LIST:
            return { ...state, callList: null, loading: true, error: null };

        case CallActionTypes.FETCH_CALL_LIST_SUCCESS:
            return { ...state, callList: action.payload, loading: false };

        case CallActionTypes.FETCH_CALL_LIST_SUCCESS:
            return { ...state, loading: false, error: "Try again" };

        case CallActionTypes.FETCH_CALL_RECORD:
            return { ...state, callRecord: null, loading: true, error: null };

        case CallActionTypes.FETCH_CALL_RECORD_SUCCESS:
            return { ...state, callRecord: action.payload, loading: false };

        case CallActionTypes.FETCH_CALL_RECORD_SUCCESS:
            return { ...state, loading: false, error: "Try again" };

        case CallActionTypes.RESET_CALL:
            return { ...initialState }

        default:
            return state;

    }
}
