
import React from 'react'
import { RootState } from '../../redux/Store';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { View } from 'native-base';
import WebView from 'react-native-webview';
import { NavigationStackProp } from 'react-navigation-stack';
import { WebViewErrorEvent, WebViewNavigationEvent } from 'react-native-webview/lib/WebViewTypes';
import { HideLoading, ShowLoading } from '../../redux/Slice/GlobalSlice';

//#region Props

interface IWebViewComProps {
    UrlPost: string
}

//#endregion

export const WebViewCom = (props: IWebViewComProps | any) => {

    //#region Redux

    const dispatch = useDispatch<any>();


    //#endregion

    //#region 

    const handleWebViewStartLoad = (event: WebViewNavigationEvent | WebViewErrorEvent) => {
        dispatch(ShowLoading());
    }

    const handleWebViewEndLoad = (event: WebViewNavigationEvent | WebViewErrorEvent) => {
        dispatch(HideLoading());
    }

    //#endregion

    //#region Render

    return (
        <View style={styles.container}>
            <WebView source={{ uri: props.UrlPost }} javaScriptEnabled={false} onLoadStart={handleWebViewStartLoad} onLoadEnd={handleWebViewEndLoad} />
        </View>
    )

    //#endregion
}


//#region Style

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100,
        backgroundColor: "red"
    }
})

//#endregion