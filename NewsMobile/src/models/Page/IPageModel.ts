import { IPostModel } from "../Post/IPostModel"

export interface IPageModel {
    MazePage: {
        Post: IPostModel[]
    },
    EndjinPage: {
        Post: IPostModel[]
    };
}