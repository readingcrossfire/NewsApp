import { IAPIResultBaseModel } from "../../models/APIResult/APIResultBaseModel";
import { IFireBaseTokenModel } from "../../models/FireBase/IFireBaseTokenModel";
import { ServicesBase } from "../ServicesBase";
import { FIREBASE_ADDTOKEN_API_PATH, FIREBASE_CHECKTOKEN_API_PATH } from "./constant";


export class FireBaseServices extends ServicesBase {

    public static async SaveToken(objToken: IFireBaseTokenModel): Promise<IAPIResultBaseModel> {
        try {
            const saveResult = await this.CallAPI<IAPIResultBaseModel>(FIREBASE_ADDTOKEN_API_PATH(), objToken);
            return saveResult.data;
        }
        catch (exception) {
            let result: IAPIResultBaseModel = {
                IsError: true,
                Message: "Có lỗi xảy ra, không kết nối được máy chủ " + exception
            }
            return Promise.resolve(result);
        }
    }

    public static async CheckToken(objToken: IFireBaseTokenModel): Promise<IAPIResultBaseModel> {
        try {
            
            const saveResult = await this.CallAPI<IAPIResultBaseModel>(FIREBASE_CHECKTOKEN_API_PATH(), objToken);
            return saveResult.data;
        }
        catch (exception) {
            let result: IAPIResultBaseModel = {
                IsError: true,
                Message: "Có lỗi xảy ra, không kết nối được máy chủ " + exception
            }
            return Promise.resolve(result);
        }
    }
}