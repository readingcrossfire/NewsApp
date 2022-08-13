import Axios, { AxiosInstance } from "axios";

import { HOST } from "./Constant";
import { IAPIResult } from "../../models/APIResult/APIResultModel";
import { IPostModel } from "../../models/Post/IPostModel";

export class PostServices {
    static async GetAll(): Promise<IAPIResult<IPostModel[]>> {
        const result = await Axios.get<IAPIResult<IPostModel[]>>("http://www.drawls.somee.com/API/CodeMaze");
        return result.data;
    }
}