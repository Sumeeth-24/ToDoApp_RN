import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import AddToDoScreen from './screens/AddToDoScreen';
import {Provider} from 'react-redux';
import {store} from './appStore/store';
import Toast_ from './components/elements/toast';

export type RootStackParamsList = {
  MainScreen: undefined;
  AddToDoScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamsList>();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="MainScreen" component={MainScreen} />
          <Stack.Screen name="AddToDoScreen" component={AddToDoScreen} />
        </Stack.Navigator>
        <Toast_ />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
