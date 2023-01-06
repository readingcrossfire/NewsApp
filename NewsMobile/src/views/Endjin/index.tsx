import React, { useEffect } from "react";
import { Pressable, Text, View } from 'native-base';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import { ScrollViewCom } from "../../components/ScrollView";
import { GestureResponderEvent, StyleSheet } from "react-native";
import { HideLoading, ShowActionSheet, ShowLoading } from "../../redux/Slice/GlobalSlice";
import { HandleGetCodeMazeThunk } from "../../redux/Slice/PageSlice";
import { GlobalNavigate } from "../../navigations/GlobalNavigation";
import { ExtensionViewEnum } from "../../models/ExtensionView/ExtensionViewEnum";
import { GlobalPropsNavigation } from "../../navigations/GlobalPropsNavigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IPostModel } from "../../models/Post/IPostModel";
import { IEndjinCategoryModel } from "../../models/EndjinCategory/IEndjinCategoryModel";
import { PostCom } from "../../components/Post";
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MenuTypeEnum } from "../../models/MenuTypes/MenuTypeEnum";
import { IActionSheetHandleModel } from "../../models/ActionSheet/IActionSheetHandleModel";
import { Button } from "react-native-paper";
import { WhiteSpace } from "@ant-design/react-native";




//#region Props

type Props = NativeStackScreenProps<GlobalPropsNavigation, 'NewsProgramming'>;

interface IEndjinViewProps {
    Navigation: Props;
    ListPost: Array<IPostModel>;
    // ListCategory: Array<IEndjinCategoryModel>;
}

//#endregion

export const EndjinView = (props: IEndjinViewProps) => {
    //#region Redux

    const endjinCategorySelector = useSelector((state: RootState) => state.Page.Page[MenuTypeEnum.Endjin]?.Category ?? []);
    const dispatch = useDispatch<any>();

    //#endregion

    //#region Effect

    useEffect(() => {

    }, [])


    //#endregion

    //#region Function

    // const handleRefresh = () => {
    //     dispatch(ShowLoading());
    //     dispatch(HandleGetCodeMazeThunk({
    //         UseCache: false,
    //         Paging: {
    //             PageIndex: pagingSelector.PageIndex,
    //             PageSize: GLOBAL_CONSTANT.PAGESIZE_DEFAULT
    //         }
    //     })).then((result: any) => {
    //         dispatch(HideLoading());
    //     });
    // }

    const handleReadPost = (item: IPostModel) => {
        GlobalNavigate("Extention", {
            Type: ExtensionViewEnum.WEBVIEW,
            Title: item.Title,
            Props: {
                UrlPost: item.PostUrl
            }
        });

    }

    const handleOpenCategory = (event: GestureResponderEvent) => {
        const buttonAction = endjinCategorySelector.map((x): IActionSheetHandleModel => {
            return {
                Title:
                    (<>
                        <Button mode="contained">{x.Title}</Button>
                        <WhiteSpace />
                    </>)
            }
        });

        dispatch(ShowActionSheet({
            Title: "Danh mục",
            ButtonAction: buttonAction
        }));
    }

    //#endregion

    //#region Render

    return (
        <View style={styles.container}>
            <Pressable onPress={handleOpenCategory} style={styles.buttonCategory}>
                <IconMaterialCommunityIcons name="filter-menu-outline" size={25} color="white" />
            </Pressable>
            <ScrollViewCom Styles={styles.scollView} ShowsVerticalScrollIndicator={false} NestedScrollEnabled={true} >
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
        </View>
    )

    //#endregion
}

//#region Styles

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    scollView: {
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 35,

    },
    buttonCategory: {
        height: 50,
        width: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        position: "absolute",
        top: 10,
        right: 10,
        backgroundColor: "#0284c7",
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        zIndex: 9999999999
    }
})

//#endregion