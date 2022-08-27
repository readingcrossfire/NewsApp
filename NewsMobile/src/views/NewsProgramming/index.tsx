import { Badge, Button, Checkbox, Tabs, Tag, WhiteSpace, WingBlank } from "@ant-design/react-native";
import { HandleGetAllCodeMazeThunk, HandleGetAllMenuTypesThunk } from "../../redux/Slice/PageSlice";
import { Hidden, Text, VStack, View } from "native-base"
import { HideLoading, ShowLoading } from "../../redux/Slice/GlobalSlice";
import React, { useEffect, useRef, useState } from "react"
import { SafeAreaView, StyleSheet } from "react-native";
import { useDispatch, useSelector } from 'react-redux';

import { EndjinView } from "../Endjin";
import { MazeCodeView } from "../MazeCode";
import { NavigationStackProp } from 'react-navigation-stack';
import { RootState } from "../../redux/Store";
import { TabData } from "@ant-design/react-native/lib/tabs/PropsType";

//#region Props

interface INewsProgrammingViewProps {
    navigation: NavigationStackProp;
}

//#endregion

export const NewsProgrammingView = (props: INewsProgrammingViewProps) => {

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
        dispatch(HandleGetAllMenuTypesThunk({ UseCache: true })).then((result: any) => {
            // dispatch(HideLoading())
        })
    }, []);

    useEffect(() => {
        let tabDataResult = pagesSelector.Menu.map(item => {
            let menuResult: TabData = {
                title: item.Name,
                MenuTypes: item,
            };

            return menuResult;
        })

        setTabs(tabDataResult);
    }, [pagesSelector.Menu]);

    //#endregion

    //#region Function

    //#endregion


    return (
        <Tabs
            animated={true}
            swipeable={true}
            useOnPan={true}
            tabs={tabs}
            tabBarActiveTextColor="#005db4"
            renderTab={(tab) => (
                <Badge
                    text={`${tab.MenuTypes.Type}`}
                    styles={{
                        text: styles.badgeText,
                        textDom: {
                            minWidth: 30,
                            display: "flex",
                            alignSelf:"center"
                        }
                    }}
                >
                    <Text>{tab.title}</Text>
                </Badge>
            )}

        >
            <View style={styles.tabContent}>
                <MazeCodeView Navigation={props.navigation} />
            </View>
            <View style={styles.tabContent}>
                <EndjinView />
            </View>
        </Tabs>
    )
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