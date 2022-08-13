import { IGlobalModel } from '../../models/Global/GlobalModel';
import { createSlice } from '@reduxjs/toolkit';

const initGlobal: IGlobalModel = {
    Loading: {
        IsLoading: false
    }
};

const GlobalSlice = createSlice({
    name: 'GlobalSlice',
    initialState: initGlobal,
    reducers: {
        ShowLoading(state) {
            state.Loading.IsLoading = true;
        },
        HideLoading(state) {
            state.Loading.IsLoading = false;
        }
    },
});

export const { ShowLoading, HideLoading } = GlobalSlice.actions;
export default GlobalSlice.reducer;
