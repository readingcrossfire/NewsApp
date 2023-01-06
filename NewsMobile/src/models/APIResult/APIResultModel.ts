import { IAPIResultBaseModel } from "./APIResultBaseModel";

export interface IAPIResultModel<T> extends IAPIResultBaseModel {

    ResultObject: T;
}