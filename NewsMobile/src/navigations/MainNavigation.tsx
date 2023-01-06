import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from 'native-base';

import { PayloadAction } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from "react-redux";
import { GLOBAL_CONSTANT } from "../constant/GlobalConstant";
import { IAPIResultModel } from "../models/APIResult/APIResultModel";
import { MenuTypeEnum } from "../models/MenuTypes/MenuTypeEnum";
import { IPagingModel } from "../models/Paging/IPagingModel";
import { IPostModel } from "../models/Post/IPostModel";
import { HideLoading } from "../redux/Slice/GlobalSlice";
import { HandleGetCodeMazeThunk, SetPagingIndex } from "../redux/Slice/PageSlice";
import { RootState } from "../redux/Store";
import { IsPaging } from "../utils/paging";
import { AboutView } from "../views/About";
import { NewsProgrammingView } from "../views/NewsProgramming";
import { RootTab } from "./GlobalPropsNavigation";

const Tab = createBottomTabNavigator();


export const MainNavigation = () => {
    //#region Redux

    const pageSelector = useSelector((state: RootState) => state.Page);
    const dispatch = useDispatch<any>();

    //#endregion

    //#region Variable

    const tabNavigatorOptions: BottomTabNavigationOptions = {
        tabBarStyle: { position: 'absolute' },
    }

    const newsProgrammingViewOptions: BottomTabNavigationOptions = {
        title: "Lập trình",
        tabBarIcon: (props) => {
            return (
                <IconMaterialCommunity name="microsoft-visual-studio-code" size={20} color={props.focused ? "#005db4" : "black"} />
            )
        },
        tabBarActiveTintColor: "#005db4",
        headerRight: () => {
            return (
                <View style={styles.containerNavigation}>
                    <View style={[styles.buttonNavigation, styles.buttonPreviousPage]}>
                        {
                            navigationPage.isPrevious == true && (
                                <Pressable style={[styles.buttonNavigation, styles.buttonPreviousPage]} onPress={handlePreviousPage}>
                                    <IconEntypo name="chevron-left" size={30} color="#0284c7" />
                                    <Text fontSize={8} style={[styles.buttonText, styles.buttonPreviousText]}>Lùi</Text>
                                </Pressable>
                            )
                        }
                    </View>
                    <View style={[styles.buttonNavigation, styles.buttonNextPage]}>
                        {
                            navigationPage.isNext == true && (
                                <Pressable style={[styles.buttonNavigation, styles.buttonNextPage]} onPress={handleNextPage}>
                                    <Text fontSize={8} style={[styles.buttonText, styles.buttonNextText]}>Tiếp</Text>
                                    <IconEntypo name="chevron-right" size={30} color="#0284c7" />
                                </Pressable>
                            )
                        }

                    </View>
                </View>
            )
        },
    }

    const aboutViewOptions: BottomTabNavigationOptions = {
        title: "Thông tin",
        tabBarIcon: (props) => {
            return (
                <IconMaterialCommunity name="information-variant" size={24} color={props.focused ? "#005db4" : "black"} />
            )
        },
        tabBarActiveTintColor: "#005db4"
    }

    //#endregion

    //#region State

    const [navigationPage, setNavigationPage] = useState<{ isPrevious: boolean, isNext: boolean }>({ isPrevious: false, isNext: false });

    //#endregion

    //#region Function

    const handleNavigationPage = (objPaging: IPagingModel) => {

        const isCurrentPage = IsPaging(objPaging);

        if (isCurrentPage.IsValid) {
            setNavigationPage({ ...navigationPage, isNext: isCurrentPage.IsNextPage, isPrevious: isCurrentPage.IsPreviousPage });
        } else {
            setNavigationPage({ ...navigationPage, isNext: false, isPrevious: false });
        }
    }

    const handleNextPage = () => {
        if (pageSelector.Paging.CurrentPage == MenuTypeEnum.CodeMaze && navigationPage.isNext) {
            const pageNumberNext = pageSelector.Page[pageSelector.Paging.CurrentPage].Paging.PageIndex + 1;

            dispatch(HandleGetCodeMazeThunk({
                Paging: {
                    PageIndex: pageNumberNext,
                    PageSize: GLOBAL_CONSTANT.PAGESIZE_DEFAULT
                },
                UseCache: true
            })).then((result: PayloadAction<IAPIResultModel<Array<IPostModel>>>) => {
                const { IsError, ResultObject } = result.payload;
                if (!IsError) {
                    dispatch(HideLoading());
                    dispatch(SetPagingIndex({
                        PageIndex: pageNumberNext
                    }));

                    const objPaging = ResultObject[0]?.Paging ?? null;
                    handleNavigationPage(objPaging);
                }
            })
        }
        else if (pageSelector.Paging.CurrentPage == MenuTypeEnum.Endjin && navigationPage.isNext) {

        }
    }

    const handlePreviousPage = () => {
        if (pageSelector.Paging.CurrentPage == MenuTypeEnum.CodeMaze && navigationPage.isPrevious) {
            const pageNumberPrevious = pageSelector.Page[pageSelector.Paging.CurrentPage].Paging.PageIndex - 1;

            dispatch(HandleGetCodeMazeThunk({
                Paging: {
                    PageIndex: pageNumberPrevious,
                    PageSize: GLOBAL_CONSTANT.PAGESIZE_DEFAULT
                },
                UseCache: true
            })).then((result: PayloadAction<IAPIResultModel<Array<IPostModel>>>) => {
                const { IsError, ResultObject } = result.payload;
                if (!IsError) {
                    dispatch(HideLoading());
                    dispatch(SetPagingIndex({
                        PageIndex: pageNumberPrevious
                    }));

                    const objPaging = ResultObject[0]?.Paging ?? null;
                    handleNavigationPage(objPaging);
                }
            })
        }
        else if (pageSelector.Paging.CurrentPage == MenuTypeEnum.Endjin && navigationPage.isPrevious) {

        }
    }

    //#endregion

    //#region Render

    return (
        <RootTab.Navigator screenOptions={tabNavigatorOptions}>
            <RootTab.Group>
                <RootTab.Screen name="NewsProgramming" component={NewsProgrammingView} options={newsProgrammingViewOptions} initialParams={{ SetNavigationPage: setNavigationPage }} />
                <Tab.Screen name="About" component={AboutView} options={aboutViewOptions} />
            </RootTab.Group>
        </RootTab.Navigator>
    )

    //#endregion
}

//#region Styles

const styles = StyleSheet.create({
    containerNavigation: {
        width: "40%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginRight: 10,
        backgroundColor: "white"
    },
    buttonNavigation: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        position: "relative"
    },
    buttonNextPage: {
    },
    buttonPreviousPage: {
    },
    buttonText: {
        position: "absolute",
    },
    buttonPreviousText: {
        left: 20
    },
    buttonNextText: {
        right: 20
    }
});

//#endregion