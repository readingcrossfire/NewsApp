


export interface IModalModel {
    IsShowModel: boolean;
    Title: string,
    Content: string;
    TextButtonOk: string;
    TextButtonCancel: string;
    HandleButtonOkPress: () => void;
    HandleButtonCancelPress: () => void;
}