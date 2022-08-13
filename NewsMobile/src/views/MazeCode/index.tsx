import { HideLoading, ShowLoading } from "../../redux/Slice/GlobalSlice";
import React, { useEffect } from "react";

import { ActivityIndicator } from "@ant-design/react-native";
import { ScrollViewCom } from "../../components/ScrollView";
import { Text } from 'native-base';
import { useDispatch } from "react-redux";

export const MazeCodeView = () => {
    //#region Redux

    const dispatch = useDispatch();

    //#endregion

    //#region Effect

    useEffect(()=>{
    //   dispatch(ShowLoading());
    }, [])

    //#endregion

    //#region Function

    
    //#endregion

    //#region Render

    return (
        <>
            <ScrollViewCom>

            </ScrollViewCom>
        </>
    )

    //#endregion
}