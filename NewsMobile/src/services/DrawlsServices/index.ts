import { CODEMAZE_API_PATH, ENDJINCATEGORY_GETALL_API_PATH, ENDJIN_API_PATH, } from "./Constant/index";

import Axios from "axios";
import { IAPIResultModel } from "../../models/APIResult/APIResultModel";
import { IPostModel } from "../../models/Post/IPostModel";
import { IEndjinCategoryModel } from "../../models/EndjinCategory/IEndjinCategoryModel";
import { ServicesBase } from "../ServicesBase";
import { IPostRequestModel } from "../../models/Post/IPostRequestModel";

export class DrawlsServices extends ServicesBase {

    static async GetCodeMaze(objRequest: IPostRequestModel): Promise<IAPIResultModel<Array<IPostModel>>> {
        try {
            const result = await this.CallAPI<IAPIResultModel<Array<IPostModel>>>(CODEMAZE_API_PATH(objRequest.UseCache), objRequest.Paging);

            return result.data;
        }
        catch (exception) {
            let result: IAPIResultModel<Array<IPostModel>> = {
                IsError: true,
                Message: "Có lỗi xảy ra, không kết nối được máy chủ" + exception,
                ResultObject: []
            }
            return Promise.resolve(result);
        }

    }

    static async GetAllEndjinCategory(useCache: boolean = false): Promise<IAPIResultModel<Array<IEndjinCategoryModel>>> {
        try {
            const result = await this.CallAPI<IAPIResultModel<Array<IEndjinCategoryModel>>>(ENDJINCATEGORY_GETALL_API_PATH(useCache));
            return result.data;
        }
        catch (exception) {
            let result: IAPIResultModel<Array<IEndjinCategoryModel>> = {
                IsError: true,
                Message: "Có lỗi xảy ra, không kết nối được máy chủ",
                ResultObject: []
            }
            return Promise.resolve(result);
        }

    }

    static async GetEndjin(objRequest: IPostRequestModel): Promise<IAPIResultModel<Array<IPostModel>>> {
        try {
            const result = await this.CallAPI<IAPIResultModel<Array<IPostModel>>>(`${ENDJIN_API_PATH(objRequest.UseCache)}`, objRequest.Paging);

            return result.data;
        }
        catch (exception) {
            let result: IAPIResultModel<Array<IPostModel>> = {
                IsError: true,
                Message: "Có lỗi xảy ra, không kết nối được máy chủ",
                ResultObject: []
            }
            return Promise.resolve(result);
        }

    }

}