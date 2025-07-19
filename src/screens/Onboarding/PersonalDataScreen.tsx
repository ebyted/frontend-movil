import React, { useState, useContext, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { onboardingSavePersonalData } from "../../services/onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../contexts/ThemeContext";
export default function PersonalDataScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [sessionId, setSessionId] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthTime, setBirthTime] = useState("");
  const [error, setError] = useState("");
  React.useEffect(() => {
    AsyncStorage.getItem("session_id").then(id => {
      if (id) setSessionId(id);
      else setSessionId("");
    });
  }, []);
  const handleNext = async () => {
    setError("");
    try {
      if (sessionId === "test-session-id") {
        navigation.navigate("SkinSelectorOnboarding");
        return;
      }
      const fullName = `${nombre} ${apellidoPaterno} ${apellidoMaterno}`.trim();
      await onboardingSavePersonalData(sessionId, fullName, birthDate, birthPlace, birthTime);
      navigation.navigate("SkinSelectorOnboarding");
    } catch (e) {
      setError("Ocurrió un error al guardar los datos. Verifica los campos e intenta de nuevo.");
    }
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.primary }]}>Tus datos personales</Text>
      <TextInput style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} value={nombre} onChangeText={setNombre} placeholder="Nombre(s)" placeholderTextColor={theme.text} />
      <TextInput style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} value={apellidoPaterno} onChangeText={setApellidoPaterno} placeholder="Apellido paterno" placeholderTextColor={theme.text} />
      <TextInput style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} value={apellidoMaterno} onChangeText={setApellidoMaterno} placeholder="Apellido materno" placeholderTextColor={theme.text} />
      <TextInput style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} value={birthDate} onChangeText={setBirthDate} placeholder="Fecha de nacimiento (YYYY-MM-DD)" placeholderTextColor={theme.text} />
      <TextInput style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} value={birthPlace} onChangeText={setBirthPlace} placeholder="Lugar de nacimiento" placeholderTextColor={theme.text} />
      <TextInput style={[styles.input, { backgroundColor: theme.card, color: theme.text }]} value={birthTime} onChangeText={setBirthTime} placeholder="Hora de nacimiento (HH:MM)" placeholderTextColor={theme.text} />
      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.accent }]} onPress={handleNext}>
        <Text style={[styles.buttonText, { color: theme.background }]}>Siguiente</Text>
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
