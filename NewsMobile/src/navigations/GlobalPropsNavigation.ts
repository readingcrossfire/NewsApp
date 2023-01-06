import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";

export type GlobalPropsNavigation = {
    NewsProgramming: {
        SetNavigationPage: React.Dispatch<React.SetStateAction<{  isPrevious: boolean, isNext: boolean }>>;
    }
};

export const RootTab = createBottomTabNavigator<GlobalPropsNavigation>();