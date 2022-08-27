import { StackNavigationOptions, createStackNavigator } from "@react-navigation/stack";

import { ExtensionView } from "../views/Extension";
import { MainNavigation } from "./MainNavigation";
import React from "react";
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();


export const RootNavigation = () => {

    //#region Variable

    const mainNavigationOptions: StackNavigationOptions = {
        headerShown: false,
    }

    const extensionViewOptions: StackNavigationOptions = {
        presentation: "modal",
        header: undefined
    }

    //#endregion

    //#region Render

    return (
        <Stack.Navigator>
            <Stack.Group>
                <Stack.Screen name="MainNavigation" component={MainNavigation} options={mainNavigationOptions} />
            </Stack.Group>
            <Stack.Group>
                <Stack.Screen name="Extention" component={ExtensionView} options={extensionViewOptions} />
            </Stack.Group>
        </Stack.Navigator>
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