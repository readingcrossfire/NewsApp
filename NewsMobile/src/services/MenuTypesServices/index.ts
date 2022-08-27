import { MENUTYPE_GETALL } from "./Constant/index";

import Axios from "axios";
import { IAPIResultModel } from "../../models/APIResult/APIResultModel";
import { IMenuTypesModel } from '../../models/MenuTypes/IMenuTypesModel';


export class MenuTypesServices {

    static async GetAll(useCache: boolean = false): Promise<IAPIResultModel<Array<IMenuTypesModel>>> {
        try {
            const result = await Axios.post<IAPIResultModel<Array<IMenuTypesModel>>>(`${MENUTYPE_GETALL(useCache)}`);
            return result.data;

        }
        catch (exception) {
            let result: IAPIResultModel<Array<IMenuTypesModel>> = {
                IsError: true,
                Message: "Có lỗi xảy ra, không kết nối được máy chủ",
                ResultObject: []
            }
            return Promise.resolve(result);
        }
    }
}