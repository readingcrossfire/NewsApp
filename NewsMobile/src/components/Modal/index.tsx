import { Button, Modal, Toast } from "@ant-design/react-native";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../redux/Store";
import React from 'react'
import { Text, View } from "native-base";


export const ModalCom = () => {

    //#region Redux

    const modalSelector = useSelector((state: RootState) => state.Global.Modal);
    const dispatch = useDispatch<any>();

    //#endregion

    useEffect(() => {
        if (modalSelector.IsShowModel) {
            Modal.alert(<Text bold={true} fontSize={18} color="darkBlue.800">{modalSelector.Title}</Text>, <Text color="lightBlue.600">{modalSelector.Content}</Text>, [
                { text: modalSelector.TextButtonOk, onPress: () => modalSelector.HandleButtonOkPress(), style: { fontWeight: "bold", color: "black" } },
                { text: modalSelector.TextButtonCancel, onPress: () => modalSelector.HandleButtonCancelPress(), style:{color: "black" }},
            ]);
        }
    }, [modalSelector.IsShowModel])

    //#region Render

    return (
        <></>
    );

    //#endregion
}