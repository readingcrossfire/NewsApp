import { MenuTypeEnum } from "../MenuTypes/MenuTypeEnum";
import { IPageModel } from "../Page/IPageModel";
import { IPagingModel } from "./IPagingModel";

export interface IPagingDispatchModel {
    CurrentPage?: MenuTypeEnum | null;
    PageIndex?: number ;
    PageSize?: number;
}