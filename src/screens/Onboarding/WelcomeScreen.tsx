import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { onboardingGenerateWelcome } from "../../services/onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WelcomeScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [sessionId, setSessionId] = useState("");
  const [welcome, setWelcome] = useState("");
  useEffect(() => {
    AsyncStorage.getItem("session_id").then(async (id) => {
      setSessionId(id || "");
      if (id === "test-session-id") {
        setWelcome("¡Bienvenido al modo prueba!");
        return;
      }
      const res = await onboardingGenerateWelcome(id);
      setWelcome(res.data.welcome_message);
    });
  }, []);
  const handleFinish = () => {
    navigation.replace("MainMenuScreen");
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.primary }]}>¡Bienvenido!</Text>
      <Text style={[styles.welcome, { color: theme.text }]}>{welcome}</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.accent }]} onPress={handleFinish}>
        <Text style={[styles.buttonText, { color: theme.background }]}>Ir al menú principal</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f7f6f3" },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#6a4c93" },
  welcome: { fontSize: 18, color: "#222", marginBottom: 32, textAlign: "center" },
  button: { backgroundColor: "#6a4c93", padding: 14, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 }
});
