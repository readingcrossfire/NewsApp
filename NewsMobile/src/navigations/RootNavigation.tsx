import { createStackNavigator, StackNavigationOptions } from "@react-navigation/stack";

import React from "react";
import { ExtensionView } from "../views/Extension";
import { MainNavigation } from "./MainNavigation";

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


//#endregion