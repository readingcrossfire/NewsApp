import { Animated, GestureResponderEvent, StyleProp, StyleSheet, TouchableWithoutFeedback, ViewStyle } from "react-native"
import { AspectRatio, Box, Button, Center, HStack, Heading, Image, Stack, Text, View, useContrastText, Pressable } from "native-base"
import React, { useRef } from 'react';

import { IPostModel } from "../../models/Post/IPostModel";
import IconMaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import { Swipeable } from "react-native-gesture-handler";
//#region Props

interface IPostProps extends IPostModel {
    onPress?: (event: GestureResponderEvent) => void,
    Styles?: StyleProp<ViewStyle>;
}

//#endregion

export const PostCom = (props: IPostProps) => {

    //#region Variable

    const imagePost = require('../../assets/icon/icon_post.png');
    const scaleAnimation = useRef(new Animated.Value(1)).current;
    const animatedStyle = {
        transform: [{
            scale: scaleAnimation
        }]

    }

    //#endregion

    //#region Function

    const renderLeftActions = (progress: any, dragX: any) => {
        const trans = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [0.7, 0]
        });

        return (
            <View style={styles.swipeableContainer}>
                <View >
                    <Button onPress={() => { console.log("OK") }} shadow={7} variant="solid" leftIcon={<IconMaterialCommunity name="content-save" size={20} color="#ecfeff" />} >
                        Lưu
                    </Button>
                </View>
            </View>
        );
    };

    const startScaleAnimation = () => {

        Animated.timing(scaleAnimation, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
            isInteraction: true
        }).start(() => {
            Animated.timing(scaleAnimation, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
                isInteraction: true,
            }).start();
        })
    }


    //#endregion

    //#region Render

    return (
        <Swipeable renderLeftActions={renderLeftActions}>
            <TouchableWithoutFeedback onPressIn={startScaleAnimation}>
                <Animated.View style={[animatedStyle]}>
                    <Box my={2} rounded="lg" overflow="hidden" borderColor="gray.50" borderWidth="1" _dark={{
                        borderColor: "gray.800",
                        backgroundColor: "gray.700"
                    }} _light={{
                        backgroundColor: "gray.50"
                    }}
                        style={props.Styles}
                    >
                        <Box>
                            <AspectRatio w="100%" ratio={16 / 9}>
                                <Image h="100%" w="100%" rounded="lg" source={imagePost} alt="image" />
                            </AspectRatio>
                        </Box>
                        <Stack p="4" space={3}>
                            <Stack space={2}>
                                <Heading size="md" ml="-1">
                                    {props.Title}
                                </Heading>
                            </Stack>
                            <Text fontWeight="400">
                                {props.QuickContent}
                            </Text>
                            <HStack alignItems="center" space={4} justifyContent="flex-start">
                                <Text color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }} fontWeight="400">
                                    {props.PostDate}
                                </Text>
                            </HStack>
                            <HStack alignItems="center" space={4} justifyContent="flex-end">
                                <Button _android={{
                                }} onPress={props.onPress}>Đọc tiếp</Button>
                            </HStack>
                        </Stack>
                    </Box>
                </Animated.View>
            </TouchableWithoutFeedback>
        </Swipeable>
    )

    //#endregion
}

//#region Styles

const styles = StyleSheet.create({
    swipeableContainer: {

        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        borderRadius: 5,
    },
    swipeableButton: {
        height: 50,
        width: 60,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 120, 220, 0.7)",
        borderRadius: 5,
    }
})

//#endregion