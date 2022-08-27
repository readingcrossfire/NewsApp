import moment from "moment";
import 'moment/locale/vi'
import { Heading, View } from "native-base"
import React, { useEffect, useState } from "react";
import { StyleSheet } from 'react-native';


export const ClockCom = () => {

    //#region State

    const [time, setTime] = useState<string>("");
    const [date, setDate] = useState<string>("");

    //#endregion

    //#region Effect

    useEffect(() => {
        moment.locale("vi");

        let dispose = setInterval(handleGetTime, 1000);

        return () => clearInterval(dispose);
    }, [time])

    //#endregion

    //#region Function

    const handleGetTime = () => {
        let timeCurrent = `${moment().hours()} GIỜ : ${moment().minutes()} PHÚT : ${moment().seconds()} GIÂY`;
        let dateCurrent = `NGÀY ${moment().date().toString().padStart(2, "0")} THÁNG ${(moment().month() + 1).toString().padStart(2, "0")} NĂM ${moment().get("y")}`;
        setTime(timeCurrent);
        setDate(dateCurrent);
    }

    //#endregion

    //#region Render

    return (
        <View style={styles.container}>
            <Heading color="info.900" fontWeight="medium" h={50} size="sm">{time}</Heading>
            <Heading color="info.900" fontWeight="medium" h={50} size="md">{date}</Heading>
        </View>
    )

    //#endregion
}

//#region Style

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

//#endregion
