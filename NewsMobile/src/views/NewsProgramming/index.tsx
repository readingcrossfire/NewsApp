import { Badge, Button, Checkbox, Tabs, Tag, WhiteSpace, WingBlank } from "@ant-design/react-native";
import React, { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native";
import { Text, VStack } from "native-base"
import { useDispatch, useSelector } from 'react-redux';

import { EndjinView } from "../Endjin";
import { HandleGetAllCodeMazeThunk } from "../../redux/Slice/PageSlice";
import { IPageModel } from './../../models/Page/IPageModel';
import { MazeCodeView } from "../MazeCode";
import { RootState } from "../../redux/Store";
import { TabData } from "@ant-design/react-native/lib/tabs/PropsType";

export const NewsProgrammingView = () => {

    //#region Redux
    const mazePost = useSelector<RootState>((state) => state.Page.MazePage.Post);
    const dispatch = useDispatch<any>();

    //#endregion

    //#region Variable

    const tabs: TabData[] = [
        { title: "MazeCode" },
        { title: "Endjin" }
    ]


    //#endregion

    //#region State

    //#endregion

    useEffect(() => {
        (async () => {
            await dispatch(HandleGetAllCodeMazeThunk());
        })()
    }, [])

    return (
        <Tabs
            animated={true}
            swipeable={true}
            useOnPan={true}
            tabs={tabs}
            tabBarActiveTextColor="#005db4"
            renderTab={(tab) => (
                <Badge
                    text={"C# 9"}
                    styles={{
                        text: styles.badgeText
                    }}>
                    <Text>{tab.title}</Text>
                </Badge>
            )}
        >
            <View style={styles.tabContent}>
                <MazeCodeView />
            </View>
            <View style={styles.tabContent}>
                <EndjinView />
            </View>
        </Tabs>
    )
}

const styles = StyleSheet.create({
    tabContent: {
        flex: 1,
    },
    badgeText: {
        color: "white",
        fontSize: 7,
    }
})