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
import { IEndjinCategoryModel } from '../../models/EndjinCategory/IEndjinCategoryModel';
import { IPagingDispatchModel } from '../../models/Paging/IPagingDispatchModel';
import { MenuTypeEnum } from '../../models/MenuTypes/MenuTypeEnum';

const initPage: IPageModel = {
  Menu: [],
  Page: {},
  Paging: {
    CurrentPage: null
  }
};

export const HandleGetCodeMazeThunk = createAsyncThunk("Post/HandleGetAllCodeMaze", async (objRequest: IPostRequestModel, { getState, dispatch, rejectWithValue }) => {
  dispatch(ShowLoading());

  const result = await DrawlsServices.GetCodeMaze(objRequest);

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
          dispatch(HandleGetCodeMazeThunk(objRequest)).then((_) => {
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

export const HandleGetEndjinThunk = createAsyncThunk("Post/HandleGetEndjin", async (objRequest: IPostRequestModel, { getState, dispatch, fulfillWithValue, rejectWithValue }) => {
  dispatch(ShowLoading());

  const result = await DrawlsServices.GetEndjin(objRequest);

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
          dispatch(HandleGetCodeMazeThunk(objRequest)).then((_) => {
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
    SetCurrentPaging(state, action: PayloadAction<IPagingDispatchModel>) {
      if (action.payload.CurrentPage) {
        state.Paging.CurrentPage = action.payload.CurrentPage;
        return state;
      }

      return state;
    },
    SetPagingIndex(state, action: PayloadAction<IPagingDispatchModel>) {
      if (action.payload.CurrentPage) {
        if (action.payload.PageIndex) {
          state.Page[action.payload.CurrentPage].Paging.PageIndex = action.payload.PageIndex;
        }
        else {
          state.Page[action.payload.CurrentPage].Paging.PageIndex = 0;
        }

        return state;
      }
      else {
        if (state.Paging.CurrentPage) {
          if (action.payload.PageIndex) {
            state.Page[state.Paging.CurrentPage].Paging.PageIndex = action.payload.PageIndex;
          }
          else {
            state.Page[state.Paging.CurrentPage].Paging.PageIndex = 0;
          }
        }
        return state;
      }
    },
    SetPaging(state, action: PayloadAction<IPagingDispatchModel>) {
      if (action.payload.CurrentPage || state.Paging.CurrentPage) {
        state.Paging.CurrentPage = action.payload.CurrentPage || state.Paging.CurrentPage;
        if (state.Paging.CurrentPage) {
          if (state.Paging.CurrentPage in state.Page) {
            if (state.Page[state.Paging.CurrentPage].Paging) {
              state.Page[state.Paging.CurrentPage].Paging.PageIndex = action.payload.PageIndex || state.Page[state.Paging.CurrentPage].Paging.PageIndex;
              state.Page[state.Paging.CurrentPage].Paging.PageSize = action.payload.PageSize || state.Page[state.Paging.CurrentPage].Paging.PageSize;
            }else{
               let objNew = Object.assign({}, state.Page[state.Paging.CurrentPage].Paging, {
                  PageIndex : action.payload.PageIndex || state.Page[state.Paging.CurrentPage].Paging.PageIndex,
                  PageSize : action.payload.PageSize || state.Page[state.Paging.CurrentPage].Paging.PageSize
               });
              state.Page[state.Paging.CurrentPage].Paging = objNew;
            }
              return state;
          }
          else {
            let objNew = Object.assign({}, state.Page, {
              [state.Paging.CurrentPage]: {
                Paging: {
                  PageIndex: action.payload.PageIndex || state.Page[state.Paging.CurrentPage].Paging.PageIndex,
                  PageSize: action.payload.PageSize || state.Page[state.Paging.CurrentPage].Paging.PageSize
                }
              }
            });
            console.error(objNew);
            state.Page = objNew;
          }

          return state;
        }

        return state;
      }
      return state;
    },

    ResetCurentPaging(state) {
      if (state.Paging.CurrentPage) {
        state.Page[state.Paging.CurrentPage].Paging.PageIndex = 0;
        state.Page[state.Paging.CurrentPage].Paging.PageSize = 0;
      }

      return state;
    },

  },
  extraReducers(builder) {

    builder.addCase(HandleGetCodeMazeThunk.fulfilled, (state: IPageModel, action: PayloadAction<IAPIResultModel<Array<IPostModel>>>) => {
      const statePost = Object.assign(state.Page, {
        [MenuTypeEnum.CodeMaze]: {
          Post: action.payload.ResultObject
        }
      });

      state.Page = statePost
      return state;
    });
    builder.addCase(HandleGetEndjinThunk.fulfilled, (state: IPageModel, action: PayloadAction<IAPIResultModel<Array<IPostModel>>>) => {
      const statePost = Object.assign(state.Page, {
        [MenuTypeEnum.Endjin]: {
          Post: action.payload.ResultObject
        }
      });

      state.Page = statePost
      return state;
    });
    builder.addCase(HandleGetAllMenuTypesThunk.fulfilled, (state: IPageModel, action: PayloadAction<IAPIResultModel<Array<IMenuTypesModel>>>) => {
      state.Menu = [];
      state.Menu.push(...action.payload.ResultObject);

      return state;
    });
    builder.addCase(HandleGetAllEndjinCategoryThunk.fulfilled, (state: IPageModel, action: PayloadAction<IAPIResultModel<Array<IEndjinCategoryModel>>>) => {
      if (MenuTypeEnum.Endjin in state.Page) {
        state.Page[MenuTypeEnum.Endjin].Category = action.payload.ResultObject;
      }
      else {
        const objNew = Object.assign(state.Page, { [MenuTypeEnum.Endjin]: {} })
        state.Page = objNew;
      }

      state.Page[MenuTypeEnum.Endjin].Category = action.payload.ResultObject;

      return state;
    });
    builder.addCase(HandleGetCodeMazeThunk.rejected, (state: IPageModel) => {
      let statePost = Object.assign(state.Page, {});

      state.Page = statePost
      return state;
    });
    builder.addCase(HandleGetAllMenuTypesThunk.rejected, (state: IPageModel) => {
      state.Menu = [];

      return state;
    })
  },
});

export const { SetCurrentPaging, SetPagingIndex, ResetCurentPaging, SetPaging } = PageSlice.actions;
export default PageSlice.reducer;
