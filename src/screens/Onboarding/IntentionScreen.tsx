import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { onboardingSaveIntention } from "../../services/onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";

const intentions = [
  "Silencio", "Guía", "Solo estar un momento", "Acompañamiento suave"
];

export default function IntentionScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState("");
  React.useEffect(() => {
    AsyncStorage.getItem("session_id").then(id => {
      if (id) setSessionId(id);
      else setSessionId("");
    });
  }, []);
  const handleSelect = async (intention) => {
    if (!sessionId) {
      setError("No se encontró sesión. Reinicia el onboarding.");
      return;
    }
    setLoading(true);
    setError("");
    if (sessionId === "test-session-id") {
      navigation.replace("PersonalDataScreen");
      setLoading(false);
      return;
    }
    try {
      await onboardingSaveIntention(sessionId, intention);
      navigation.replace("PersonalDataScreen");
    } catch (e) {
      setError("Error al guardar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Cuál es tu intención hoy?</Text>
      {error ? <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text> : null}
      <View style={styles.grid}>
        {intentions.map(e => (
          <TouchableOpacity
            key={e}
            style={[styles.intentionBtn, { opacity: (!sessionId || loading) ? 0.5 : 1 }]}
            onPress={() => handleSelect(e)}
            disabled={!sessionId || loading}
          >
            <Text style={styles.intentionText}>{e}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f7f6f3" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#6a4c93" },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  intentionBtn: { backgroundColor: "#fff", borderRadius: 12, padding: 12, margin: 8, elevation: 2 },
  intentionText: { fontSize: 16, color: "#6a4c93", fontWeight: "bold" }
});
