import { PayloadAction, createAsyncThunk, createSlice, isFulfilled } from '@reduxjs/toolkit';

import { IAPIResultModel } from '../../models/APIResult/APIResultModel';
import { IEndjinCategoryRequestModel } from '../../models/EndjinCategory/IEndjinCategoryRequestModel';
import { IMenuTypesModel } from '../../models/MenuTypes/IMenuTypesModel';
import { IMenuTypesRequestModel } from '../../models/MenuTypes/IMenuTypesRequestModel';
import { IPageModel } from '../../models/Page/IPageModel';
import { IPostModel } from '../../models/Post/IPostModel';
import { IPostRequestModel } from '../../models/Post/IPostRequestModel';
import { MenuTypesServices } from '../../services/MenuTypesServices';
import { DrawlsServices } from '../../services/DrawlsServices';
import { RootState } from '../Store';
import { HideLoading, HideModal, ShowLoading, ShowModal } from './GlobalSlice';

const initPage: IPageModel = {
  Menu: [],
  Page: {}
};

export const HandleGetAllCodeMazeThunk = createAsyncThunk("Post/HandleGetAllCodeMaze", async (request: IPostRequestModel | null, { getState, dispatch, fulfillWithValue, rejectWithValue }) => {
  dispatch(ShowLoading());
  const result = await DrawlsServices.GetAllCodeMaze(request?.UseCache);

  if (result.IsError) {
    const state = getState() as RootState;

    if (state.Global.Loading.IsShowLoading) {
      dispatch(HideLoading());
    }

    if (state.Global.Modal.IsShowModel) {
      dispatch(HideModal());
    }

    dispatch(
      ShowModal({
        Title: "Lỗi lấy thông tin",
        Content: result.Message.toString(),
        HandleButtonOkPress() {
          dispatch(HandleGetAllCodeMazeThunk({ UseCache: false })).then((_) => {
            if (state.Global.Loading.IsShowLoading) {
              dispatch(HideLoading());
            }
          });
        },
        HandleButtonCancelPress() {
          dispatch(HideModal());
        },
        TextButtonOk: "Tải lại",
        TextButtonCancel: "Huỷ",
      })
    );

    return rejectWithValue(result);
  }
  return result;
});

export const HandleGetAllMenuTypesThunk = createAsyncThunk("Post/HandleGetAllMenuTypes", async (request: IMenuTypesRequestModel | null, { getState, dispatch, fulfillWithValue, rejectWithValue }) => {
  dispatch(ShowLoading());
  const result = await MenuTypesServices.GetAll(request?.UseCache);

  if (result.IsError) {
    const state = getState() as RootState;

    if (state.Global.Loading.IsShowLoading) {
      dispatch(HideLoading());
    }

    if (state.Global.Modal.IsShowModel) {
      dispatch(HideModal());
    }

    dispatch(
      ShowModal({
        Title: "Lỗi lấy thông tin",
        Content: result.Message.toString(),
        HandleButtonOkPress() {
          dispatch(HandleGetAllMenuTypesThunk({ UseCache: false })).then((_) => {
            if (state.Global.Loading.IsShowLoading) {
              dispatch(HideLoading());
            }
          });
        },
        HandleButtonCancelPress() {
          dispatch(HideModal());
        },
        TextButtonOk: "Tải lại",
        TextButtonCancel: "Huỷ",
      })
    );

    return rejectWithValue(result);
  }
  return result;

});

export const HandleGetAllEndjinCategoryThunk = createAsyncThunk("Post/HandleGetAllEndjinCategory", async (request: IEndjinCategoryRequestModel | null, { getState, dispatch, fulfillWithValue, rejectWithValue }) => {
  dispatch(ShowLoading());
  const result = await DrawlsServices.GetAllEndjinCategory(request?.UseCache);

  if (result.IsError) {
    const state = getState() as RootState;

    if (state.Global.Loading.IsShowLoading) {
      dispatch(HideLoading());
    }

    if (state.Global.Modal.IsShowModel) {
      dispatch(HideModal());
    }

    dispatch(
      ShowModal({
        Title: "Lỗi lấy thông tin",
        Content: result.Message.toString(),
        HandleButtonOkPress() {
          dispatch(HandleGetAllMenuTypesThunk({ UseCache: false })).then((_) => {
            if (state.Global.Loading.IsShowLoading) {
              dispatch(HideLoading());
            }
          });
        },
        HandleButtonCancelPress() {
          dispatch(HideModal());
        },
        TextButtonOk: "Tải lại",
        TextButtonCancel: "Huỷ",
      })
    );

    return rejectWithValue(result);
  }
  return result;

});


const PageSlice = createSlice({
  name: 'PageSlice',
  initialState: initPage,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(HandleGetAllCodeMazeThunk.fulfilled, (state: IPageModel, action: PayloadAction<IAPIResultModel<Array<IPostModel>>>) => {
      const firstPost = action.payload.ResultObject[0];
      let statePost = Object.assign(state.Page, {
        [firstPost.MenuTypes.Name]: {
          Post: action.payload.ResultObject
        }
      });

      state.Page = statePost
      return state;
    });
    builder.addCase(HandleGetAllCodeMazeThunk.rejected, (state: IPageModel) => {
      let statePost = Object.assign(state.Page, {});

      state.Page = statePost
      return state;
    });
    builder.addCase(HandleGetAllMenuTypesThunk.fulfilled, (state: IPageModel, action: PayloadAction<IAPIResultModel<Array<IMenuTypesModel>>>) => {
      state.Menu = [];
      state.Menu.push(...action.payload.ResultObject);

      return state;
    });
    builder.addCase(HandleGetAllMenuTypesThunk.rejected, (state: IPageModel) => {
      state.Menu = [];

      return state;
    })
  },
});

export const { } = PageSlice.actions;
export default PageSlice.reducer;
