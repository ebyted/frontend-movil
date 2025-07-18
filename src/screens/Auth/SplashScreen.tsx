import React, { useEffect, useContext } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onboardingGetStatus, onboardingStart } from "../../services/onboarding";
import { AuthContext } from "../../contexts/AuthContext";

export default function SplashScreen({ navigation }) {
  const { token } = useContext(AuthContext);

  const [error, setError] = React.useState("");
  useEffect(() => {
    async function startOnboarding() {
      try {
        const sessionId = await onboardingStart();
        await AsyncStorage.setItem("session_id", sessionId);
        navigation.replace("TempleScreen");
      } catch (e) {
        setError("No se pudo crear la sesión. Usando modo prueba.");
        await AsyncStorage.setItem("session_id", "test-session-id");
        navigation.replace("TempleScreen");
      }
    }
    startOnboarding();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
      {error ? <Text style={{ color: "red", marginTop: 20 }}>{error}</Text> : null}
    </View>
  );
}
