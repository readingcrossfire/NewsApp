import { IGlobalModel } from '../../models/Global/GlobalModel';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stack } from 'native-base';
import { IModalModel } from '../../models/Modal/IModalModel';
import { IModalDispatchModel } from '../../models/Modal/IModalDispatchModel';

const initGlobal: IGlobalModel = {
    Loading: {
        IsShowLoading: false,
    },
    Modal: {
        IsShowModel: false,
        Title: "",
        Content: "",
        TextButtonOk: "Xác nhận",
        TextButtonCancel: "Huỷ bỏ",
        HandleButtonOkPress: () => { },
        HandleButtonCancelPress: () => { }
    }
};

const GlobalSlice = createSlice({
    name: 'GlobalSlice',
    initialState: initGlobal,
    reducers: {
        ShowLoading(state) {
            state.Loading.IsShowLoading = true;
            return state;
        },
        HideLoading(state) {
            state.Loading.IsShowLoading = false;
            return state;
        },
        ShowModal(state, action: PayloadAction<IModalDispatchModel>) {
            state.Modal.Title = action.payload.Title;
            state.Modal.Content = action.payload.Content;
            state.Modal.TextButtonOk = action.payload.TextButtonOk;
            state.Modal.TextButtonCancel = action.payload.TextButtonCancel;
            state.Modal.HandleButtonOkPress = action.payload.HandleButtonOkPress;
            state.Modal.HandleButtonCancelPress = action.payload.HandleButtonCancelPress;
            state.Modal.IsShowModel = true;
            return state;
        },
        HideModal(state) {
            state.Modal.IsShowModel = false;
            return state;
        }
    },
});

export const { ShowLoading, HideLoading, ShowModal, HideModal } = GlobalSlice.actions;
export default GlobalSlice.reducer;
