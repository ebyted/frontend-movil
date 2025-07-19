import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getAchievements } from "../../services/stats";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function LogrosScreen() {
  const { token } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [logros, setLogros] = useState<any[]>([]);

  useEffect(() => {
    async function fetchLogros() {
      if (!token) return;
      try {
        const res = await getAchievements(token);
        setLogros(res.data);
      } catch {}
    }
    fetchLogros();
  }, [token]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Logros</Text>
      <FlatList
        data={logros}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={[styles.achievement, { backgroundColor: theme.card }]}>
            <Text style={[styles.achievementText, { color: theme.primary }]}>{item.name}</Text>
            <Text style={[styles.achievementDesc, { color: theme.text }]}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24 },
  achievement: { backgroundColor: "#fff", padding: 16, borderRadius: 8, marginBottom: 12 },
  achievementText: { fontSize: 18, fontWeight: "bold" },
  achievementDesc: { fontSize: 14, color: "#666" }
});
