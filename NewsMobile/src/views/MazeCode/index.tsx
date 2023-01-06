import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowActionSheet, ShowLoading } from "../../redux/Slice/GlobalSlice";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { PostCom } from "../../components/Post";
import { ScrollViewCom } from "../../components/ScrollView";
import { GLOBAL_CONSTANT } from "../../constant/GlobalConstant";
import { ExtensionViewEnum } from "../../models/ExtensionView/ExtensionViewEnum";
import { IPostModel } from "../../models/Post/IPostModel";
import { GlobalNavigate } from "../../navigations/GlobalNavigation";
import { GlobalPropsNavigation } from "../../navigations/GlobalPropsNavigation";
import { HandleGetCodeMazeThunk } from "../../redux/Slice/PageSlice";
import { RootState } from "../../redux/Store";
import { Button } from "native-base";
import { WhiteSpace } from "@ant-design/react-native";

//#region Props

type Props = NativeStackScreenProps<GlobalPropsNavigation, 'NewsProgramming'>;

interface IMazeCodeViewProps {
    Navigation: Props;
    ListPost: Array<IPostModel>
}

//#endregion

export const MazeCodeView = (props: IMazeCodeViewProps) => {
    //#region Redux

    const pagingSelector = useSelector((state: RootState) => state.Page.Paging);
    const dispatch = useDispatch<any>();

    //#endregion

    //#region Effect

    useEffect(() => {

    }, [])

    //#endregion

    //#region Function

    const handleRefresh = () => {
        dispatch(ShowLoading());
        dispatch(HandleGetCodeMazeThunk({
            UseCache: false,
            Paging: {
                PageIndex: pagingSelector.PageIndex,
                PageSize: GLOBAL_CONSTANT.PAGESIZE_DEFAULT
            }
        })).then((result: any) => {
            dispatch(HideLoading());
        });
    }

    const handleReadPost = (item: IPostModel) => {
        GlobalNavigate("Extention", {
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
            <ScrollViewCom Styles={styles.container} onRefresh={handleRefresh} ShowsVerticalScrollIndicator={true} NestedScrollEnabled={true} >
                {
                    props.ListPost && props.ListPost.map((item, index) => {
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
                                onPress={(event) => handleReadPost(item)}
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