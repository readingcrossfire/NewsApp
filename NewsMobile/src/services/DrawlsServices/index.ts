import { CODEMAZE_GETALL, ENDJINCATEGORY_GETALL, } from "./Constant/index";

import Axios from "axios";
import { IAPIResultModel } from "../../models/APIResult/APIResultModel";
import { IPostModel } from "../../models/Post/IPostModel";
import { IEndjinCategoryModel } from "../../models/EndjinCategory/IEndjinCategoryModel";

export class DrawlsServices {
    static async GetAllCodeMaze(useCache: boolean = false): Promise<IAPIResultModel<Array<IPostModel>>> {
        try {
            const result = await Axios.post<IAPIResultModel<Array<IPostModel>>>(`${CODEMAZE_GETALL(useCache)}`);
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

    static async GetAllEndjinCategory(useCache: boolean = false): Promise<IAPIResultModel<Array<IEndjinCategoryModel>>> {
        try {
            const result = await Axios.post<IAPIResultModel<Array<IEndjinCategoryModel>>>(`${ENDJINCATEGORY_GETALL(useCache)}`);
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

}