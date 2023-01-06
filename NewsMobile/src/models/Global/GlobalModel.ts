import { IActionSheetModel } from '../ActionSheet/IActionSheetModel';
import { IModalModel } from '../Modal/IModalModel';
import { ILoadingModel } from './../Loading/ILoadingModel';

export interface IGlobalModel {
    Loading: ILoadingModel;
    Modal: IModalModel;
    ActionSheet:IActionSheetModel;
}