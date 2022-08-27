import { ActivityIndicator } from '@ant-design/react-native';
import React from 'react'
import { RootState } from '../../redux/Store';
import { useSelector } from 'react-redux';

export const LoadingCom = () => {

    //#region Redux

    const isShowLoading = useSelector<RootState>(state => state.Global.Loading.IsShowLoading);

    //#endregion

    //#region Render
    if(isShowLoading == false){
        return <></>
    }
    
    return (
        <ActivityIndicator
            animating={true}
            toast
            color="rgb(0, 120, 220)"
            size="large"
            text="Đang tải..."
        />
    )

    //#endregion
}