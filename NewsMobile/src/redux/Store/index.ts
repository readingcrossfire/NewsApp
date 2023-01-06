import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import GlobalSlice from "../Slice/GlobalSlice";
import PageSlice from "../Slice/PageSlice";

const CombineReducer = combineReducers({ Global: GlobalSlice, Page: PageSlice });

export const GlobalStore = configureStore({
    reducer: CombineReducer,
    middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    },
});

export type RootState = ReturnType<typeof GlobalStore.getState>;
export type AppDispatch = ReturnType<typeof GlobalStore.dispatch>;
export const useAppDispatch: () => AppDispatch = useDispatch;

