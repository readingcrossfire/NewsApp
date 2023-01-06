import { Badge, Tabs } from "@ant-design/react-native";
import { Text, View } from "native-base";
import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from "../../redux/Slice/GlobalSlice";
import { HandleGetAllEndjinCategoryThunk, HandleGetAllMenuTypesThunk, HandleGetCodeMazeThunk, HandleGetEndjinThunk, SetPaging } from "../../redux/Slice/PageSlice";

import { TabData } from "@ant-design/react-native/lib/tabs/PropsType";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { PayloadAction } from "@reduxjs/toolkit";
import { GLOBAL_CONSTANT } from "../../constant/GlobalConstant";
import { IAPIResultModel } from "../../models/APIResult/APIResultModel";
import { MenuTypeEnum } from "../../models/MenuTypes/MenuTypeEnum";
import { IPostModel } from "../../models/Post/IPostModel";
import { GlobalPropsNavigation } from "../../navigations/GlobalPropsNavigation";
import { RootState } from "../../redux/Store";
import { IsPaging } from "../../utils/paging";
import { EndjinView } from "../Endjin";
import { MazeCodeView } from "../MazeCode";

//#region Props

type Props = NativeStackScreenProps<GlobalPropsNavigation, 'NewsProgramming'>;

//#endregion

export const NewsProgrammingView = (props: Props) => {

    //#region Redux

    const pagesSelector = useSelector((state: RootState) => state.Page);
    const dispatch = useDispatch<any>();

    //#endregion

    //#region State

    const [tabs, setTabs] = useState<Array<TabData>>([]);

    //#endregion

    //#region Effect

    useEffect(() => {
        dispatch(ShowLoading());
        dispatch(HandleGetAllMenuTypesThunk({ UseCache: true })).then(() => {
            handleLoadCodeMazePost()
        });
    }, []);

    useEffect(() => {
        let tabDataResult = pagesSelector.Menu.map(item => {
            let lstMenuResult: TabData = {
                title: item.Name,
                MenuTypes: item,
            };

            return lstMenuResult;
        })

        setTabs(tabDataResult);
    }, [pagesSelector.Menu.length]);

    //#endregion

    //#region Hooks

    const renderCodeMazePage = useMemo(() => {
        const readyPost = pagesSelector?.Page[MenuTypeEnum.CodeMaze]?.Post ?? [];

        return (<MazeCodeView Navigation={props} ListPost={readyPost} />)
    }, [pagesSelector.Page[MenuTypeEnum.CodeMaze]])

    const renderEndjinPage = useMemo(() => {
        const readyPost = pagesSelector?.Page[MenuTypeEnum.Endjin]?.Post ?? [];

        return (<EndjinView Navigation={props} ListPost={readyPost} />)
    }, [pagesSelector.Page[MenuTypeEnum.Endjin]])

    //#endregion

    //#region Function

    const handleLoadCodeMazePost = () => {
        dispatch(HandleGetCodeMazeThunk({
            UseCache: true,
            Paging: {
                PageIndex: 1,
                PageSize: GLOBAL_CONSTANT.PAGESIZE_DEFAULT
            }
        })).then((result: PayloadAction<IAPIResultModel<Array<IPostModel>>>) => {
            dispatch(HideLoading());

            const { payload } = result;
            const { IsError, ResultObject } = payload;

            if (!IsError) {
                dispatch(SetPaging({ CurrentPage: MenuTypeEnum.CodeMaze, PageIndex: 1 }));

                if (ResultObject.length > 0) {
                    const objPaging = ResultObject[0].Paging || null;
                    const isCurrentPage = IsPaging(objPaging);

                    if (isCurrentPage.IsValid) {
                        props.route.params.SetNavigationPage({ isNext: isCurrentPage.IsNextPage, isPrevious: isCurrentPage.IsPreviousPage });
                        return;
                    }
                }

                props.route.params.SetNavigationPage({ isNext: false, isPrevious: false });
            }
        });
    }

    const handleLoadEndjnPost = async () => {
        const endjinCategoryPromise = dispatch(HandleGetAllEndjinCategoryThunk({
            UseCache: true
        }));

        const endjinPostPromise = dispatch(HandleGetEndjinThunk({
            UseCache: false,
            Paging: {
                PageIndex: 1,
                PageSize: GLOBAL_CONSTANT.PAGESIZE_DEFAULT
            }
        }));

        const result = await Promise.all([endjinCategoryPromise, endjinPostPromise]);
        console.log(result[1])

    }

    const handleTabChange = (tab: TabData) => {
        if (tab.MenuTypes.Key == MenuTypeEnum.CodeMaze) {
            handleLoadCodeMazePost();
        }
        else if (tab.MenuTypes.Key == MenuTypeEnum.Endjin) {
            handleLoadEndjnPost();
        }

        const objPaging = pagesSelector.Page[tab.MenuTypes.Key]?.Post[0].Paging ?? null;
        console.log(objPaging);
        const isCurrentPage = IsPaging(objPaging);

        if (isCurrentPage.IsValid) {
            props.route.params.SetNavigationPage({ isNext: isCurrentPage.IsNextPage, isPrevious: isCurrentPage.IsPreviousPage });
        }
        else {
            props.route.params.SetNavigationPage({ isNext: false, isPrevious: false });
        }
    }

    //#endregion

    //#region Render

    return (
        <Tabs
            animated={true}
            swipeable={true}
            tabs={tabs}
            tabBarActiveTextColor="#005db4"
            noRenderContent={false}
            onTabClick={handleTabChange}
            onChange={handleTabChange}
            renderTab={(tab) => (
                <Badge
                    text={`${tab.MenuTypes.Type}`}
                    styles={{
                        text: styles.badgeText,
                        textDom: {
                            minWidth: 30,
                            display: "flex",
                            alignSelf: "center"
                        }
                    }}
                >
                    <Text>{tab.title}</Text>
                </Badge>
            )}
        >
            <View style={styles.tabContent}>
                {renderCodeMazePage}
            </View>
            <View style={styles.tabContent}>
                {renderEndjinPage}
            </View>
            <View style={styles.tabContent}>
                <Text>React js</Text>
            </View>
        </Tabs>
    )

    //#endregion
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "red"
    },
    tabContent: {
        flex: 1,
        backgroundColor: "white"
    },
    badgeText: {
        color: "white",
        fontSize: 7,
        display: "flex",
        flexDirection: "row"
    }
})