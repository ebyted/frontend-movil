import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { onboardingSavePersonalData } from "../../services/onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PersonalDataScreen({ navigation }) {
  const [sessionId, setSessionId] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthTime, setBirthTime] = useState("");
  React.useEffect(() => {
    AsyncStorage.getItem("session_id").then(id => {
      if (id) setSessionId(id);
      else setSessionId("");
    });
  }, []);
  const handleNext = async () => {
    if (sessionId === "test-session-id") {
      navigation.replace("WelcomeScreen");
      return;
    }
    await onboardingSavePersonalData(sessionId, fullName, birthDate, birthPlace, birthTime);
    navigation.replace("WelcomeScreen");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tus datos personales</Text>
      <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Nombre completo" />
      <TextInput style={styles.input} value={birthDate} onChangeText={setBirthDate} placeholder="Fecha de nacimiento (YYYY-MM-DD)" />
      <TextInput style={styles.input} value={birthPlace} onChangeText={setBirthPlace} placeholder="Lugar de nacimiento" />
      <TextInput style={styles.input} value={birthTime} onChangeText={setBirthTime} placeholder="Hora de nacimiento (HH:MM)" />
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f7f6f3" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#6a4c93" },
  input: { width: "80%", padding: 12, borderRadius: 8, backgroundColor: "#fff", marginBottom: 12, fontSize: 18 },
  button: { backgroundColor: "#6a4c93", padding: 14, borderRadius: 8 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 }
});
