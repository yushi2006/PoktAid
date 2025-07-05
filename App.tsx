import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './app/screens/home';
import Instructions from './app/screens/instructions';
import CameraScreen from './app/screens/camera';
import MicrophoneScreen from './app/screens/microphone';


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Instructions' component={Instructions} />
        <Stack.Screen name='CameraScreen' component={CameraScreen} />
        <Stack.Screen name='MicrophoneScreen' component={MicrophoneScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;