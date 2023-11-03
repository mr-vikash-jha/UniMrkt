// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Screens/Login';
import Welcome from './src/Screens/Welcome';
import AddStudy from './src/Screens/AddStudy';
import Home from './src/Screens/Home';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome" component={Welcome} 
          options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} 
          options={{ headerShown: false }} />

        <Stack.Screen name="AddStudy" component={AddStudy} 
          options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} 
          options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;