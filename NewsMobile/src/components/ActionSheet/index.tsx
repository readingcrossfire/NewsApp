
import { WhiteSpace } from "@ant-design/react-native";
import { Center, Heading, Text, View } from "native-base";
import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, GestureResponderEvent, Pressable, StyleSheet } from "react-native";
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from "react-redux";
import { HideActionSheet } from "../../redux/Slice/GlobalSlice";
import { RootState } from "../../redux/Store";
import { ScrollViewCom } from "../ScrollView";

const HEIGHT_OVERFLOW = Dimensions.get("window").height;

export const ActionSheetCom = () => {

    //#region Redux

    const actionSheetSelector = useSelector((state: RootState) => state.Global.ActionSheet);
    const dispatch = useDispatch<any>();

    //#endregion

    //#region Ref

    const transformAnimation = useRef(new Animated.Value(HEIGHT_OVERFLOW)).current;
    const animatedStyle = {
        transform: [{
            translateY: transformAnimation
        }]
    }

    //#endregion

    //#region Effect

    useEffect(() => {
        if (actionSheetSelector.IsShowActionSheet) {
            Animated.timing(transformAnimation, {
                toValue: 0,
                duration: 600,
                useNativeDriver: true,
                isInteraction: true
            }).start();
        }
    }, [actionSheetSelector.IsShowActionSheet])

    //#endregion

    //#region Function

    const handleCloseActionSheet = (e: GestureResponderEvent) => {
        Animated.timing(transformAnimation, {
            toValue: HEIGHT_OVERFLOW,
            duration: 600,
            useNativeDriver: true,
            isInteraction: true
        }).start((result) => {
            dispatch(HideActionSheet());
        });
    }

    //#endregion

    //#region Render

    return (
        <Animated.View style={[animatedStyle, styles.container]}>
            <View style={styles.containerMain}>
                <View style={styles.containerMainAbsolute}>
                    <Pressable style={styles.containerClose} onPress={handleCloseActionSheet}>
                        <IconMaterialIcons name="close" size={25} color="white" />
                    </Pressable>
                    <View style={styles.containerContent}>
                        <>
                            {
                                React.isValidElement(actionSheetSelector.Title) ?
                                    actionSheetSelector.Title :
                                    <Center>
                                        <Heading size="lg" mb="4">{actionSheetSelector.Title}</Heading>
                                    </Center>
                            }
                        </>
                        <>
                            {
                                React.isValidElement(actionSheetSelector.SubTitle) ?
                                    actionSheetSelector.Title :
                                    <Center>
                                        <Text fontSize="md" fontWeight="hairline" color="black">{actionSheetSelector.SubTitle}</Text>
                                        <WhiteSpace size="lg" />
                                    </Center>
                            }
                        </>
                        <ScrollViewCom ShowsVerticalScrollIndicator={true} NestedScrollEnabled={true}>
                            {
                                actionSheetSelector.ButtonAction.map((item) => (
                                    item.Title
                                ))
                            }
                        </ScrollViewCom>
                    </View>
                </View>
            </View>
        </Animated.View >
    );


    //#endregion
}

//#region Styles

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        position: "absolute",
        left: 0,
        bottom: 0,
        zIndex: 999999,
        backgroundColor: "transparent",
        // backgroundColor: "red",
        marginTop: 50,
        // transform: [{
        //     translateY: Dimensions.get("window").height
        // }]
    },
    containerMain: {
        height: Dimensions.get("window").height,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backgroundColor: "transparent",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        bottom: 0,
        left: 0
    },
    containerMainAbsolute: {
        height: (Dimensions.get("window").height / 2) + 200,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        backgroundColor: "white",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        bottom: 0,
        left: 0,
        elevation: 20,
        shadowColor: "blue",
        paddingHorizontal: 5,
        paddingVertical: 5
    },
    containerClose: {
        height: 50,
        width: 50,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "rgba(0, 120, 220, 1)",
        position: "absolute",
        top: -30,
        borderTopStartRadius: 25,
        borderTopEndRadius: 25,
        borderBottomStartRadius: 25,
        borderBottomEndRadius: 25,
    },
    containerContent: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "transparent"
    }
})

//#endregion