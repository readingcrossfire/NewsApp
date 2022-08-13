import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IAPIResult } from '../../models/APIResult/APIResultModel';
import { IPageModel } from '../../models/Page/IPageModel';
import { IPostModel } from '../../models/Post/IPostModel';
import { PostServices } from '../../services/PostServices';

const initPost: IPageModel = {
  MazePage: {
    Post: []
  },
  EndjinPage: {
    Post: []
  }
};

export const HandleGetAllCodeMazeThunk = createAsyncThunk<IAPIResult<IPostModel[]>>("Post/HandleGetCodeMaze", async (params, thunkAPI) => {
  const result = await PostServices.GetAll();
  return result;
})

const PageSlice = createSlice({
  name: 'PostSlice',
  initialState: initPost,
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(HandleGetAllCodeMazeThunk.fulfilled, (state, action) => {
      state.MazePage.Post = [];
      state.MazePage.Post.push(...action.payload.ListObject);
    })
  },
});

export const { } = PageSlice.actions;
export default PageSlice.reducer;
