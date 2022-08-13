import React, { ReactNode, useRef } from 'react';
import { RefreshControl, ScrollView, StyleProp, ViewStyle } from 'react-native';

import { StyleSheet } from 'react-native';

//#region Props

interface IViewScrollComponentProps {
    children: ReactNode,
    Styles?: StyleProp<ViewStyle>;
    NestedScrollEnabled?: boolean;
    ShowsVerticalScrollIndicator?: boolean;
    ShowsHorizontalScrollIndicator?: boolean;
    IsRefreshing?: boolean,
    ScrollToEnd?: boolean,
    onRefresh?: () => void
}

//#endregion

export const ScrollViewCom = (props: IViewScrollComponentProps)=>{

    //#region Ref

    const scrollViewRef = useRef<any>();

    //#endregion

    //#region Render

    return(
        <ScrollView ref={scrollViewRef} showsHorizontalScrollIndicator={props.ShowsHorizontalScrollIndicator ?? false} showsVerticalScrollIndicator={props.ShowsVerticalScrollIndicator ?? false} nestedScrollEnabled={props.NestedScrollEnabled ?? false} keyboardDismissMode="on-drag" style={[styles.container, props.Styles]} refreshControl={
            <RefreshControl
                refreshing={props.IsRefreshing ?? false}
                onRefresh={props.onRefresh}
            />} onContentSizeChange={props.ScrollToEnd ? () => scrollViewRef?.current?.scrollToEnd({ animated: true }) : undefined}>
            {props.children}
        </ScrollView >
    )

    //#endregion
}

//#region Style

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

//#endregion