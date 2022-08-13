
export interface IAPIResultModel<T> {
    IsError: boolean;
    Message: string;
    ListObject: T;
}