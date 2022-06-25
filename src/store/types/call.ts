export interface CallParamsModel {
    date_start: string;
    date_end: string;
    in_out?: number;
}

export interface PartnerDataModel {
    id: number;
    name: string;
    phone: string;
}

export interface CallErrorModel {
    title: string;
}

export interface CallResultModel {
    type: string;
    title: string;
    tooltip: string;
}

export interface CallStageModel {
    person_name: string;
    person_surname: string;
    person_mango_phone: string;
    duration: string;
    disconnect_reason: string;
}

export interface AnswerModel {
    message: string;
    from_support: number;
    support_read_status: number;
    person_read_status: number;
}

export interface AbuseModel {
    date: string;
    person_name: string;
    message: string;
    support_read_status: number;
    support_answer_status: number;
    answers: AnswerModel[];
}
export interface CallModel {
    id: number;
    partnership_id: string;
    partner_data: PartnerDataModel;
    date: string;
    date_notime: string;
    time: number;
    from_number: string;
    from_extension: string;
    to_number: string;
    to_extension: string;
    is_skilla: number;
    status: string;
    record: string | null;
    line_number: string;
    in_out: number;
    from_site: number;
    source: string;
    errors: CallErrorModel[];
    disconnect_reason: string;
    results: CallResultModel[];
    stages: CallResultModel[];
    abuse: AbuseModel | null;
    contact_name: string;
    contact_company: string;
    person_id: number;
    person_name: string;
    person_surname: string;
    person_avatar: string;
}

export interface CallResponseModel {
    total_rows: number;
    results: CallModel[]
}

export enum CallActionTypes{
    FETCH_CALL_LIST = 'FETCH_CALL_LIST',
    FETCH_CALL_LIST_SUCCESS = 'FETCH_CALL_LIST_SUCCESS',
    FETCH_CALL_LIST_FAILURE = 'FETCH_CALL_LIST_FAILURE',
    FETCH_CALL_RECORD = 'FETCH_CALL_RECORD',
    FETCH_CALL_RECORD_SUCCESS = 'FETCH_CALL_RECORD_SUCCESS',
    FETCH_CALL_RECORD_FAILURE = 'FETCH_CALL_RECORD_FAILURE',
    RESET_CALL = 'RESET_CALL'
}

export type CallState = {
    callList: CallResponseModel| null;
    callRecord: File | null;
    loading: boolean;
    error: string | null;
}

interface FetchCallListAction {
    type: CallActionTypes.FETCH_CALL_LIST;
}

interface FetchCallListSuccessAction {
    type: CallActionTypes.FETCH_CALL_LIST_SUCCESS;
    payload: CallResponseModel;
}

interface FetchCallListFailureAction {
    type: CallActionTypes.FETCH_CALL_LIST_FAILURE;
}

interface FetchCallRecordAction {
    type: CallActionTypes.FETCH_CALL_RECORD;
}

interface FetchCallRecordSuccessAction {
    type: CallActionTypes.FETCH_CALL_RECORD_SUCCESS;
    payload: File;
}

interface FetchCallRecordFailureAction {
    type: CallActionTypes.FETCH_CALL_RECORD_FAILURE;
}

interface ResetCallAction {
    type: CallActionTypes.RESET_CALL;
}

export type CallAction = 
    FetchCallListAction | 
    FetchCallListSuccessAction | 
    FetchCallListFailureAction |
    FetchCallRecordAction |
    FetchCallRecordSuccessAction | 
    FetchCallRecordFailureAction |
    ResetCallAction;