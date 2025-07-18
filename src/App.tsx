import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import SplashScreen from "./screens/Auth/SplashScreen";
import TempleScreen from "./screens/Onboarding/TempleScreen";
import EmotionScreen from "./screens/Onboarding/EmotionScreen";
import IntentionScreen from "./screens/Onboarding/IntentionScreen";
import PersonalDataScreen from "./screens/Onboarding/PersonalDataScreen";
import WelcomeScreen from "./screens/Onboarding/WelcomeScreen";
import MainMenuScreen from "./screens/Menu/MainMenuScreen";
import SkinSelectorScreen from "./screens/Profile/SkinSelectorScreen";
// ...importa aquí las demás pantallas del menú

const Stack = createStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="TempleScreen" component={TempleScreen} />
            <Stack.Screen name="EmotionScreen" component={EmotionScreen} />
            <Stack.Screen name="IntentionScreen" component={IntentionScreen} />
            <Stack.Screen name="PersonalDataScreen" component={PersonalDataScreen} />
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="MainMenuScreen" component={MainMenuScreen} />
            <Stack.Screen name="SkinSelectorScreen" component={SkinSelectorScreen} />
            {/* ...agrega aquí las demás pantallas del menú */}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}
