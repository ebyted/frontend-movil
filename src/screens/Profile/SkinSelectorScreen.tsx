import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SKINS } from "../../utils/theme";

export default function SkinSelectorScreen() {
  const { skin, setSkin, theme } = useContext(ThemeContext);
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.primary }]}>Elige tu skin espiritual</Text>
      {Object.entries(SKINS).map(([key, value]) => (
        <TouchableOpacity
          key={key}
          style={[styles.skinBtn, { backgroundColor: value.primary, borderColor: skin === key ? theme.accent : value.primary }]}
          onPress={() => setSkin(key)}
        >
          <Image source={{ uri: value.spiritual }} style={styles.skinImg} />
          <Text style={[styles.skinText, { color: value.card }]}>{value.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 24 },
  skinBtn: { padding: 16, borderRadius: 12, margin: 10, borderWidth: 2, alignItems: "center" },
  skinText: { fontSize: 18, fontWeight: "bold", marginTop: 8 },
  skinImg: { width: 120, height: 60, borderRadius: 8 }
});
