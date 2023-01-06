import { MenuTypeEnum } from "../MenuTypes/MenuTypeEnum";
import { IPagingModel } from "./IPagingModel";

export interface IPagingSliceModel{
    CurrentPage: MenuTypeEnum | null;
}