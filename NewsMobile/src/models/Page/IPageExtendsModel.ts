import { IPagingModel } from "../Paging/IPagingModel"

export interface IPageExtendsModel<T = {}, K = null> {

    [T: string]: {
        Post: Array<T>,
        Category?: Array<K>
        Paging: IPagingModel
    },

}