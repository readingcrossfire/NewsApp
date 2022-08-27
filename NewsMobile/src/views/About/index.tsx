import React from "react";
import { Center, HStack, Text, View } from "native-base";
import { Image, StyleSheet } from "react-native";
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { ClockCom } from "../../components/Clock";

export const AboutView = () => {

    //#region Variable

    const imageBackground = require('../../assets/image/img_background_1.jpg');

    //#endregion

    //#region Render

    return (
        <View style={styles.container}>
            <Image style={styles.image} blurRadius={20} source={imageBackground} resizeMethod="resize" resizeMode="cover" />
            <View style={styles.content}>
                <HStack justifyContent="center">
                    <IconMaterialCommunity name="microsoft-visual-studio-code" size={100} color="#005db4" />
                </HStack>
                <HStack justifyContent="center">
                    <Text color="info.900" fontSize={15} fontWeight="thin">DEVELOPER ĐỨC - LỖI THEO CÁCH CỦA BẠN</Text>
                </HStack>
                <HStack marginY={10} justifyContent="center">
                    <ClockCom />
                </HStack>
            </View>
        </View>
    )

    //#endregion
}

//#region Styles

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    image: {
        height: '100%',
        width: '100%',
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1000
    },
    content: {
        height: "100%",
        width: "100%",
        flex: 1,
        backgroundColor: "transparent",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2000

    }
})

//#endregion