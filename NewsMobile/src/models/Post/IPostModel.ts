import { IMenuTypesModel } from "../MenuTypes/IMenuTypesModel";

export interface IPostModel {
  Title: string;
  QuickContent: string;
  Content: string;
  ImageUrl: string;
  PostUrl: string;
  PostDate: string;
  CreatedDate: Date;
  MenuTypes: IMenuTypesModel;
}
