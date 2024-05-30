import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import SearchIcon from './src/components/SearchIcon';
import CoinDetailsScreen from './src/screens/CoinDetailsScreen';
import CoinListScreen from './src/screens/CoinListScreen';
import SearchScreen from './src/screens/SearchScreen';
import {CoinListResult, CoinSearchResult} from './src/store/api/coinListApi';
import {persistor, store} from './src/store/store';

export type RootStackParamList = {
  CoinList: undefined;
  CoinDetails: {coin: CoinListResult | CoinSearchResult};
  Search: undefined;
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
                headerRight: SearchIcon,
              }}
            />
            <Stack.Screen
              name="CoinDetails"
              options={{
                title: '',
              }}
              component={CoinDetailsScreen}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{
                title: 'Search',
                presentation: 'formSheet',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App;
