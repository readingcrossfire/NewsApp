import { IMenuTypesModel } from "../MenuTypes/IMenuTypesModel"
import { IPostModel } from "../Post/IPostModel"

export interface IPageModel {
    Menu: Array<IMenuTypesModel>,
    Page: {
        [T: string]: {
            Post: Array<IPostModel>
        },
    }
}