

import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import React, { useEffect, type PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Provider as ReduxProvider, useDispatch, useSelector } from 'react-redux';
import { GlobalStore } from './src/redux/Store';
import { RootView } from './src/views/RootView';
import { Button, Provider as AntProvider, Toast } from '@ant-design/react-native';
import { ActivityIndicator } from '@ant-design/react-native';
import { LoadingCom } from './src/components/Loading';


const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };


  return (
    <ReduxProvider store={GlobalStore}>
      <SafeAreaView style={styles.root}>
        <NativeBaseProvider>
          <NavigationContainer>
            <AntProvider>
              <RootView />
              <LoadingCom />
            </AntProvider>
          </NavigationContainer>
        </NativeBaseProvider>
      </SafeAreaView>
    </ReduxProvider>

  );
};


export default App;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  }
})
