import { combineReducers, configureStore } from "@reduxjs/toolkit";

import GlobalSlice from "../Slice/GlobalSlice";
import PageSlice from "../Slice/PageSlice";

const CombineReducer = combineReducers({ Global: GlobalSlice, Page: PageSlice });

export const GlobalStore = configureStore({
    reducer: CombineReducer
});

export type RootState = ReturnType<typeof GlobalStore.getState>;

