
export interface IAPIResultModel<T> {
    IsError: boolean;
    Message: string;
    ResultObject: T;
}