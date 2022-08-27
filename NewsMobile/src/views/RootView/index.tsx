import { BottomTabNavigationOptions, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Image, Text, View } from 'native-base';
import { StackNavigationOptions, createStackNavigator } from "@react-navigation/stack";

import { AboutView } from "../About";
import { ExtensionView } from "../Extension";
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from "@react-navigation/native";
import { NewsProgrammingView } from './../NewsProgramming';
import React from "react";
import { RootNavigation } from './../../navigations/RootNavigation';
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


export const RootView = () => {


    //#region Render

    return (
        <RootNavigation />
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