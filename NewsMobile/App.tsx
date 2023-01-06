

import { NavigationContainer } from '@react-navigation/native';
import { Alert, NativeBaseProvider } from 'native-base';
import React, { useEffect } from 'react';
import {
  Dimensions,
  SafeAreaView, StyleSheet, useColorScheme
} from 'react-native';

import { Provider as AntProvider } from '@ant-design/react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import DeviceInfo from 'react-native-device-info';
import { Provider as ReduxProvider } from 'react-redux';
import { ActionSheetCom } from './src/components/ActionSheet';
import { LoadingCom } from './src/components/Loading';
import { ModalCom } from './src/components/Modal';
import { GlobalNavigationRef } from './src/navigations/GlobalNavigation';
import { GlobalStore } from './src/redux/Store';
import { RootView } from './src/views/RootView';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { FireBase } from './src/firebase/FireBase';
import { FireBaseServices } from './src/services/FireBaseServices';


const App = () => {

  useEffect(() => {
    (async () => {
      await FireBase.Init(async () => {
        await FireBase.GetToken(async () => {
          const deviceID = await DeviceInfo.getUniqueId();
          await FireBaseServices.CheckToken({ DeviceID: deviceID, Token: FireBase.Token });
          await FireBase.ReceivedNotification((remoteMsg: FirebaseMessagingTypes.RemoteMessage) => {
            console.log(remoteMsg.data);
            console.log("Nhận tin từ Firebase");
          });
        })
      }, () => { });

    })();



  }, [])

  return (
    <ReduxProvider store={GlobalStore}>
      <NavigationContainer ref={GlobalNavigationRef}>
        <NativeBaseProvider>
          <GestureHandlerRootView >
            <SafeAreaView style={styles.root}>
              <PaperProvider>
                <AntProvider>
                  <RootView />
                  <LoadingCom />
                  <ModalCom />
                  <ActionSheetCom />
                </AntProvider>
              </PaperProvider>
            </SafeAreaView>
          </GestureHandlerRootView>
        </NativeBaseProvider>
      </NavigationContainer>
    </ReduxProvider>
  );
};


export default App;

const styles = StyleSheet.create({
  root: {
    height: Dimensions.get('window').height
  }
})
