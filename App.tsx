import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import CoinDetailsScreen from './src/screens/CoinDetailsScreen';
import CoinListScreen from './src/screens/CoinListScreen';
import {CoinListResult} from './src/store/api/coinListApi';
import {persistor, store} from './src/store/store';

export type RootStackParamList = {
  CoinList: undefined;
  CoinDetails: {coin: CoinListResult};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerBackTitleVisible: false,
            }}>
            <Stack.Screen
              name="CoinList"
              component={CoinListScreen}
              options={{
                title: 'List',
              }}
            />
            <Stack.Screen
              name="CoinDetails"
              options={{
                title: '',
              }}
              component={CoinDetailsScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
