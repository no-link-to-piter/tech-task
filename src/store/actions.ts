import CallRequestService from 'services/CallRequestService';
import { CallActionTypes, CallParamsModel, CallResponseModel } from './types/call';

const fetchCallListAction = () => ({type: CallActionTypes.FETCH_CALL_LIST});
const fetchCallListSuccessAction = (payload: CallResponseModel) => ({type: CallActionTypes.FETCH_CALL_LIST_SUCCESS, payload});
const fetchCallListFailureAction = () => ({type: CallActionTypes.FETCH_CALL_LIST_FAILURE});

const fetchCallRecordAction = () => ({type: CallActionTypes.FETCH_CALL_RECORD});
const fetchCallRecordSuccessAction = (payload: File) => ({type: CallActionTypes.FETCH_CALL_RECORD_SUCCESS, payload});
const fetchCallRecordFailureAction = () => ({type: CallActionTypes.FETCH_CALL_RECORD_FAILURE});


const callService = new CallRequestService();

export const getCallList = (filters: CallParamsModel) => (dispatch: any) => {
    dispatch(fetchCallListAction());
    callService
      .fetchCallList(filters)
      .then((result: CallResponseModel) => {
        dispatch(fetchCallListSuccessAction(result));
      })
      .catch(() => dispatch(fetchCallListFailureAction()))
}

export const getCallRecord = (record: string, partnershipId: number) => (dispatch: any) => {
    dispatch(fetchCallRecordAction());
    callService
      .fetchCallRecord(record, partnershipId)
      .then((result: File) => {
        dispatch(fetchCallRecordSuccessAction(result));
      })
      .catch(() => dispatch(fetchCallRecordFailureAction()))
}