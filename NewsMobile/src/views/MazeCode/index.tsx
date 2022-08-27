import { HideLoading, HideModal, ShowLoading, ShowModal } from "../../redux/Slice/GlobalSlice";
import React, { useEffect, useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HandleGetAllCodeMazeThunk } from "../../redux/Slice/PageSlice";
import { IPostModel } from './../../models/Post/IPostModel';
import { PostCom } from "../../components/Post";
import { RootState } from "../../redux/Store";
import { ScrollViewCom } from "../../components/ScrollView";
import { StyleSheet } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { ExtensionViewEnum } from "../../models/Enum/ExtensionViewEnum";

//#region Props

interface IMazeCodeViewProps {
    Navigation: NavigationStackProp
}

//#endregion

export const MazeCodeView = (props: IMazeCodeViewProps) => {
    //#region Redux

    const lstPostSelector = useSelector((state: RootState) => state.Page.Page?.CodeMaze?.Post ?? []);
    const dispatch = useDispatch<any>();

    //#endregion

    //#region Effect

    useEffect(() => {
        // dispatch(ShowLoading());
        dispatch(HandleGetAllCodeMazeThunk({ UseCache: true })).then((result: any) => {
            dispatch(HideLoading());
        });

    }, [])

    //#endregion


    //#region Function

    const handleRefresh = () => {
        dispatch(ShowLoading());
        dispatch(HandleGetAllCodeMazeThunk({ UseCache: false })).then((result: any) => {
            dispatch(HideLoading());
        });
    }

    const handlePostPress = (item: IPostModel) => {
        props.Navigation.navigate("Extention", {
            Type: ExtensionViewEnum.WEBVIEW,
            Title: item.Title,
            Props: {
                UrlPost: item.PostUrl
            }
        });

    }

    //#endregion

    //#region Render

    return (
        <>
            <ScrollViewCom Styles={styles.container} onRefresh={handleRefresh} ShowsVerticalScrollIndicator={true}>
                {
                    lstPostSelector && lstPostSelector.map((item, index) => {

                        return (
                            <PostCom
                                {...item}
                                key={index}
                                Styles={{
                                    elevation: 8,
                                    shadowColor: '#164e63',
                                    paddingHorizontal: 10,
                                    paddingVertical: 10,
                                    marginHorizontal: 30,
                                    marginTop: 40,
                                    marginBottom: 40,
                                }}
                                onPress={(event) => handlePostPress(item)}
                            />
                        )
                    })
                }
            </ScrollViewCom>
        </>
    )

    //#endregion
}

//#region Styles

const styles = StyleSheet.create({
    container: {
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 35
    }
})

//#endregion