import { MENUTYPE_GETALL_API_PATH } from "./Constant/index";

import Axios from "axios";
import { IAPIResultModel } from "../../models/APIResult/APIResultModel";
import { IMenuTypesModel } from '../../models/MenuTypes/IMenuTypesModel';
import { ServicesBase } from "../ServicesBase";


export class MenuTypesServices extends ServicesBase {

    static async GetAll(useCache: boolean = false): Promise<IAPIResultModel<Array<IMenuTypesModel>>> {
        try {
            const result = await this.CallAPI<IAPIResultModel<Array<IMenuTypesModel>>>(MENUTYPE_GETALL_API_PATH(useCache));
            return result.data;

        }
        catch (exception) {
            let result: IAPIResultModel<Array<IMenuTypesModel>> = {
                IsError: true,
                Message: "Có lỗi xảy ra, không kết nối được máy chủ" + exception,
                ResultObject: []
            }
            return Promise.resolve(result);
        }
    }
}