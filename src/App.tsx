import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
enableScreens();

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import { ThemeProvider, ThemeContext } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import SplashScreen from "./screens/Auth/SplashScreen";
import LoginScreen from "./screens/Auth/LoginScreen";
import RegisterScreen from "./screens/Auth/RegisterScreen";
import ForgotPasswordScreen from "./screens/Auth/ForgotPasswordScreen";
import PreferencesScreen from "./screens/Profile/PreferencesScreen";
import NotificationsSettingsScreen from "./screens/Notifications/NotificationsSettingsScreen";
import LogrosScreen from "./screens/Gamification/LogrosScreen";
import RetosScreen from "./screens/Gamification/RetosScreen";
import TempleScreen from "./screens/Onboarding/TempleScreen";
import EmotionScreen from "./screens/Onboarding/EmotionScreen";
import IntentionScreen from "./screens/Onboarding/IntentionScreen";
import PersonalDataScreen from "./screens/Onboarding/PersonalDataScreen";
import WelcomeScreen from "./screens/Onboarding/WelcomeScreen";
import SkinSelectorOnboarding from "./screens/Onboarding/SkinSelectorOnboarding";
import { createStackNavigator as createOnboardingStackNavigator } from '@react-navigation/stack';
import MainMenuScreen from "./screens/Menu/MainMenuScreen";
import SkinSelectorScreen from "./screens/Profile/SkinSelectorScreen";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import DialogoSagradoScreen from "./screens/Menu/DialogoSagradoScreen";
import DiarioVivoScreen from "./screens/Menu/DiarioVivoScreen";
import MeditaConmigoScreen from "./screens/Menu/MeditaConmigoScreen";
import MensajesDelAlmaScreen from "./screens/Menu/MensajesDelAlmaScreen";
import RitualDiarioScreen from "./screens/Menu/RitualDiarioScreen";
import MapaInteriorScreen from "./screens/Menu/MapaInteriorScreen";
import SilencioSagradoScreen from "./screens/Menu/SilencioSagradoScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const OnboardingStack = createOnboardingStackNavigator();

export default function App() {
  return (
          <ThemeProvider>
            <AuthProvider>
              <ThemeContext.Consumer>
                {({ theme }) => (
                  <NavigationContainer>
                    <Drawer.Navigator
                      initialRouteName="SplashScreen"
                      drawerContent={props => <DrawerContent {...props} />}
                      screenOptions={{
                        headerShown: true,
                        headerStyle: { backgroundColor: theme.background, borderBottomWidth: 1, borderBottomColor: theme.accent },
                        headerTitleStyle: { fontWeight: 'bold', fontSize: 20, color: theme.primary },
                        headerTintColor: theme.primary,
                        headerRight: () => (
                          <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: theme.primary, marginRight: 16, borderWidth: 2, borderColor: theme.accent }} />
                        ),
                      }}
                    >
                      <Drawer.Screen name="SplashScreen" component={SplashScreen} />
                      <Drawer.Screen name="LoginScreen" component={LoginScreen} />
                      <Drawer.Screen name="RegisterScreen" component={RegisterScreen} />
                      <Drawer.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                      <Drawer.Screen name="Onboarding" options={{ headerShown: false }}>
                        {() => (
                          <OnboardingStack.Navigator initialRouteName="TempleScreen" screenOptions={{
                            headerShown: true,
                            header: ({ navigation, route, options, back }) => {
                              const getNextOnboardingScreen = require('./utils/onboardingNav').getNextOnboardingScreen;
                              return (
                                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.background, padding: 10 }}>
                                  {back ? (
                                    <TouchableOpacity onPress={navigation.goBack} style={{ marginRight: 16 }}>
                                      <Text style={{ fontSize: 18, color: theme.primary }}>Anterior</Text>
                                    </TouchableOpacity>
                                  ) : null}
                                  <Text style={{ fontSize: 20, fontWeight: 'bold', flex: 1, color: theme.primary, textAlign: 'center' }}>{options.title || route.name}</Text>
                                  <TouchableOpacity onPress={() => navigation.navigate(getNextOnboardingScreen(route.name))} style={{ marginLeft: 16 }}>
                                    <Text style={{ fontSize: 18, color: theme.primary }}>Siguiente</Text>
                                  </TouchableOpacity>
                                </View>
                              );
                            }
                          }}>
                            <OnboardingStack.Screen name="TempleScreen" component={TempleScreen} options={{ title: "Templo" }} />
                            <OnboardingStack.Screen name="EmotionScreen" component={EmotionScreen} options={{ title: "Emoción" }} />
                            <OnboardingStack.Screen name="IntentionScreen" component={IntentionScreen} options={{ title: "Intención" }} />
                            <OnboardingStack.Screen name="PersonalDataScreen" component={PersonalDataScreen} options={{ title: "Datos Personales" }} />
                            <OnboardingStack.Screen name="SkinSelectorOnboarding" component={SkinSelectorOnboarding} options={{ title: "Skin" }} />
                            <OnboardingStack.Screen name="WelcomeScreen" component={WelcomeScreen} options={{ title: "Bienvenida" }} />
                          </OnboardingStack.Navigator>
                        )}
                      </Drawer.Screen>
                      <Drawer.Screen name="MainMenuScreen" component={MainMenuScreen} />
                      <Drawer.Screen name="SkinSelectorScreen" component={SkinSelectorScreen} />
                      <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
                      <Drawer.Screen name="DialogoSagradoScreen" component={DialogoSagradoScreen} />
                      <Drawer.Screen name="DiarioVivoScreen" component={DiarioVivoScreen} />
                      <Drawer.Screen name="MeditaConmigoScreen" component={MeditaConmigoScreen} />
                      <Drawer.Screen name="MensajesDelAlmaScreen" component={MensajesDelAlmaScreen} />
                      <Drawer.Screen name="RitualDiarioScreen" component={RitualDiarioScreen} />
                      <Drawer.Screen name="MapaInteriorScreen" component={MapaInteriorScreen} />
                      <Drawer.Screen name="SilencioSagradoScreen" component={SilencioSagradoScreen} />
                      <Drawer.Screen name="PreferencesScreen" component={PreferencesScreen} />
                      <Drawer.Screen name="NotificationsSettingsScreen" component={NotificationsSettingsScreen} />
                      <Drawer.Screen name="LogrosScreen" component={LogrosScreen} />
                      <Drawer.Screen name="RetosScreen" component={RetosScreen} />
                    </Drawer.Navigator>
                  </NavigationContainer>
                )}
              </ThemeContext.Consumer>
            </AuthProvider>
          </ThemeProvider>
  );
}
