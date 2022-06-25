import { TECH_TASK_KEY } from "consts";
import { CallParamsModel, CallResponseModel } from "store/types/call";
import ServerRequestService from "./ServerRequestService";

export default class UserRequestService {
  
    apiRequest = new ServerRequestService();
  
    protected readonly API_CALL_LIST_PATH = '/mango/getList';

    protected readonly API_CALL_RECORD_PATH = '/mango/getRecord';

    public fetchCallList(filters: CallParamsModel): Promise<CallResponseModel> {
        return this.apiRequest.getResource(this.API_CALL_LIST_PATH, filters, "POST", undefined, {Authorization: `Bearer ${TECH_TASK_KEY}`});
    }

    public fetchCallRecord(record: string, partnershipId: number): Promise<File> {
        const getParams = {record, partnership_id: partnershipId};
        return this.apiRequest.getResource(this.API_CALL_RECORD_PATH, getParams, "POST", undefined, {Authorization: `Bearer ${TECH_TASK_KEY}`});
    }
}