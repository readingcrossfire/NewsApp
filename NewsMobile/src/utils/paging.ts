import { IPagingModel } from "../models/Paging/IPagingModel";

export const IsPaging = (objPaging: IPagingModel): { IsValid: boolean, IsNextPage: boolean, IsPreviousPage: boolean } => {
    let objReturn: { IsValid: boolean, IsNextPage: boolean, IsPreviousPage: boolean } = { IsValid: false, IsNextPage: false, IsPreviousPage: false };

    if (objPaging == null) {
        return objReturn;
    }

    const pageIndexNext = objPaging.PageIndex + 1;
    const totalItemNext = pageIndexNext * objPaging.PageSize;
    const totalItemCurrent = objPaging.PageIndex * objPaging.PageSize;


    if (objPaging.PageIndex == 1 && totalItemNext > objPaging.PageTotal) {
        objReturn.IsValid = true;
        objReturn.IsNextPage = false;
        objReturn.IsPreviousPage = false;
    }
    else if (totalItemCurrent < objPaging.PageTotal && objPaging.PageTotal < totalItemNext) {
        objReturn.IsValid = true;
        objReturn.IsNextPage = true;
        objReturn.IsPreviousPage = true;

    }
    else if (totalItemNext > objPaging.PageTotal) {
        objReturn.IsValid = true;
        objReturn.IsNextPage = false;
        objReturn.IsPreviousPage = true;
    }
    else {
        objReturn.IsValid = true;
        objReturn.IsNextPage = true;
        objReturn.IsPreviousPage = false;
    }

    return objReturn;

}