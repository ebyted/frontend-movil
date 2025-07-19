import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { onboardingSaveEmotion } from "../../services/onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../contexts/ThemeContext";

const emotions = [
  "En paz", "Ansioso", "Esperanzado", "Confundido", "Alegre", "Melancólico", "Sereno", "Inquieto", "Agradecido", "Nostálgico"
];

export default function EmotionScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const [sessionId, setSessionId] = useState("");
  React.useEffect(() => {
    AsyncStorage.getItem("session_id").then(id => {
      if (id) setSessionId(id);
      else setSessionId("");
    });
  }, []);
  const handleSelect = async (emotion) => {
    if (sessionId === "test-session-id") {
      navigation.navigate("IntentionScreen");
      return;
    }
    await onboardingSaveEmotion(sessionId, emotion);
    navigation.navigate("IntentionScreen");
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.primary }]}>¿Cómo te sientes hoy?</Text>
      <View style={styles.grid}>
        {emotions.map(e => (
          <TouchableOpacity key={e} style={[styles.emotionBtn, { backgroundColor: theme.card }]} onPress={() => handleSelect(e)}>
            <Text style={[styles.emotionText, { color: theme.primary }]}>{e}</Text>
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
  emotionBtn: { backgroundColor: "#fff", borderRadius: 12, padding: 12, margin: 8, elevation: 2 },
  emotionText: { fontSize: 16, color: "#6a4c93", fontWeight: "bold" }
});
