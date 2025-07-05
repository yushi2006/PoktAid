import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './app/screens/home';
import Instructions from './app/screens/instructions';
import CameraScreen from './app/screens/camera';
import MicrophoneScreen from './app/screens/microphone';
import LoadingScreen from './app/screens/loading';

export type RootStackParamList = {
  Microphone: undefined;
  Camera: undefined;
  Home: undefined;
  Instructions: { photoUri: string } | { audioUri: string };
};


const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

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