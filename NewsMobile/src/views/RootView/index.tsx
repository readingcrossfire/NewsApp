import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Image, Text, View } from 'native-base';

import { AboutView } from "../About";
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { NewsProgrammingView } from './../NewsProgramming';
import React from "react";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();


export const RootView = () => {

    //#region Variable

    const newsProgrammingViewOptions: BottomTabNavigationOptions = {
        title: "Lập trình",
        tabBarIcon: (props) => {
            return (
                <IconMaterialCommunity name="microsoft-visual-studio-code" size={20} color={props.focused ? "#005db4" : "black"} />
            )
        },
        tabBarActiveTintColor: "#005db4",
        headerRight: (props) => {
            return (
                <View style={styles.containerNavigation}>
                    <View style={[styles.buttonNavigation, styles.buttonPreviousPage]}>
                        <IconEntypo name="chevron-left" size={30} color="#0284c7" />
                        <Text fontSize={8} style={[styles.buttonText, styles.buttonPreviousText]}>Sau</Text>
                    </View>
                    <View style={[styles.buttonNavigation, styles.buttonNextPage]}>
                        <Text fontSize={8} style={[styles.buttonText, styles.buttonNextText]}>Trước</Text>
                        <IconEntypo name="chevron-right" size={30} color="#0284c7" />
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

    //#region Render

    return (
        <Tab.Navigator>
            <Tab.Group>
                <Tab.Screen name="NewsProgramming" component={NewsProgrammingView} options={newsProgrammingViewOptions} />
                <Tab.Screen name="About" component={AboutView} options={aboutViewOptions} />
            </Tab.Group>
            <Tab.Group>

            </Tab.Group>
        </Tab.Navigator>
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
        marginRight: 10
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