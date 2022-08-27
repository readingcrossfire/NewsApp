import { IMenuTypeModel } from '../MenuTypes/IMenuTypesModel';
import { TabData } from "@ant-design/react-native/lib/tabs/PropsType";

export interface ITabModel extends TabData {
    MenuType: IMenuTypeModel;
}