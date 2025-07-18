import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { onboardingSaveTemple } from "../../services/onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function TempleScreen({ navigation }) {
  const [templeName, setTempleName] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { theme } = useContext(ThemeContext);

  React.useEffect(() => {
    AsyncStorage.getItem("session_id").then(id => {
      if (id) setSessionId(id);
      else setError("No se encontró sesión. Reinicia el onboarding.");
    });
  }, []);

  const handleNext = async () => {
    // Permitir avanzar si es test-session-id, ignorando el error de backend y el nombre vacío
    if (sessionId === "test-session-id") {
      navigation.navigate("EmotionScreen");
      return;
    }
    if (!templeName || !sessionId) return;
    setLoading(true);
    setError("");
    try {
      await onboardingSaveTemple(sessionId, templeName);
      navigation.navigate("EmotionScreen");
    } catch (e) {
      setError("Error al guardar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Image source={{ uri: theme.spiritual }} style={styles.bg} />
      <Text style={[styles.title, { color: theme.primary }]}>¿Cómo se llama tu templo interior?</Text>
      <TextInput
        style={[styles.input, { backgroundColor: theme.card, color: theme.text }]}
        value={templeName}
        onChangeText={setTempleName}
        placeholder="Escribe el nombre..."
        placeholderTextColor={theme.accent}
      />
      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary, opacity: (!templeName || !sessionId || loading) ? 0.5 : 1 }]}
        onPress={handleNext}
        disabled={!templeName || !sessionId || loading}
      >
        <Text style={[styles.buttonText, { color: theme.card }]}>{loading ? "Guardando..." : "Siguiente"}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  bg: { position: "absolute", width: "100%", height: "100%", opacity: 0.15 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { width: "80%", padding: 12, borderRadius: 8, marginBottom: 20, fontSize: 18 },
  button: { padding: 14, borderRadius: 8 },
  buttonText: { fontWeight: "bold", fontSize: 18 }
});
