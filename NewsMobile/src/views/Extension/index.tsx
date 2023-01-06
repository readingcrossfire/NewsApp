import React, { ReactNode, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RouteProp } from '@react-navigation/native';
import { ExtensionViewEnum } from "../../models/ExtensionView/ExtensionViewEnum";
import { WebViewCom } from "../../components/WebView";

//#region Props

export type ExtensionViewRoutePropsType = {
    // Type: {};
    // Title: ReactNode;
    // Props: {
    //     [T: string]: string
    // }

    Extension: {
        Type: ExtensionViewEnum;
        Title?: string;
        Props: {
            [T: string]: string
        }
    }
}

type PropsType = NativeStackScreenProps<ExtensionViewRoutePropsType, "Extension">;


//#endregion

export const ExtensionView = (props: PropsType) => {

    //#region Effect
    useEffect(() => {
        props.navigation.setOptions({ title: props.route.params?.Title ?? "" })
    }, [])

    //#endregion

    //#region Function

    //#endregion


    //#region Render

    if (props.route.params.Type == ExtensionViewEnum.WEBVIEW) {
        return (
            <WebViewCom {...props.route.params.Props} />
        )
    }
    return <>No View</>

    //#endregion

}