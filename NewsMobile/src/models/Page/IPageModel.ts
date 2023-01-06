import { IMenuTypesModel } from "../MenuTypes/IMenuTypesModel"
import { IPagingSliceModel } from "../Paging/IPagingSliceModel"
import { IPostModel } from "../Post/IPostModel"
import { IPageExtendsModel } from "./IPageExtendsModel"

export interface IPageModel {
    Menu: Array<IMenuTypesModel>,
    Page: IPageExtendsModel<IPostModel, any>,
    Paging: IPagingSliceModel;
}