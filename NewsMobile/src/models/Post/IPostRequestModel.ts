import { IPagingRequestModel } from "../Paging/IPagingRequestModel";
import { IRequestModel } from "../Request/IRequestModel";

export interface IPostRequestModel extends IRequestModel {
    Paging: IPagingRequestModel;
}