import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { getGamificationProgress, updateGamificationProgress } from "../../services/gamification";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function RetosScreen() {
  const { token } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [retos, setRetos] = useState<any[]>([]);

  useEffect(() => {
    async function fetchRetos() {
      if (!token) return;
      try {
        const res = await getGamificationProgress(token);
        setRetos(res.data);
      } catch {}
    }
    fetchRetos();
  }, [token]);

  const completarReto = async (id: string) => {
    if (!token) return;
    try {
      await updateGamificationProgress(token, { id });
      const res = await getGamificationProgress(token);
      setRetos(res.data);
    } catch {}
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Retos</Text>
      <FlatList
        data={retos}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={[styles.challenge, { backgroundColor: theme.card }]}>
            <Text style={[styles.challengeText, { color: theme.primary }]}>{item.name}</Text>
            <Text style={[styles.challengeDesc, { color: theme.text }]}>{item.description}</Text>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: theme.accent }]}
              onPress={() => completarReto(item.id)}
            >
              <Text style={[styles.buttonText, { color: theme.background }]}>Completar</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24 },
  challenge: { backgroundColor: "#fff", padding: 16, borderRadius: 8, marginBottom: 12 },
  challengeText: { fontSize: 18, fontWeight: "bold" },
  challengeDesc: { fontSize: 14, color: "#666" },
  button: { backgroundColor: "#6a4c93", padding: 10, borderRadius: 8, marginTop: 8 },
  buttonText: { color: "#fff", fontWeight: "bold" }
});
