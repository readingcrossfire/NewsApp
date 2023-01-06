import { IActionSheetHandleModel } from "./IActionSheetHandleModel";

export interface IActionSheetModel{
    IsShowActionSheet:boolean;
    Title:string;
    SubTitle:string; 
    ButtonAction:Array<IActionSheetHandleModel>
}