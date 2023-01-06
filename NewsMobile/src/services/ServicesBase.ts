import Axios, { AxiosInstance, AxiosResponse } from "axios"
import { GLOBAL_CONSTANT } from "../constant/GlobalConstant";
import { IAPIResultModel } from "../models/APIResult/APIResultModel";

export class ServicesBase {
    static AxiosInstance: AxiosInstance;
    /**
     *
     */
    static Init() {
        if (this.AxiosInstance == null) {
            this.AxiosInstance = Axios.create({
                baseURL: GLOBAL_CONSTANT.HOST,
                method: "POST",
                headers: {
                    "content-type": "application/json"
                }
            });
        }
    }

    static async CallAPI<T>(strURLAPI: string, objRequest: object = {}): Promise<AxiosResponse<T, any>> {
        this.Init();
        
        return await this.AxiosInstance.post(strURLAPI, objRequest);
    }
}