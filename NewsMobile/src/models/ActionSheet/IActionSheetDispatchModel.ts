import { IActionSheetModel } from "./IActionSheetModel";

export interface IActionSheetDispatchModel extends Partial<Omit<IActionSheetModel, "IsShowActionSheet">> {

}