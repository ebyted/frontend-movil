import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SKINS } from "../../utils/theme";

export default function SkinSelectorOnboarding({ navigation }) {  
  const { theme, setTheme } = useContext(ThemeContext);
  const [selectedSkin, setSelectedSkin] = useState<string | null>(null);
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.primary }]}>Elige tu skin espiritual</Text>
      <View style={styles.grid}>
        {Object.entries(SKINS).map(([key, value]) => (
          <TouchableOpacity
            key={key}
            style={[styles.skinBtn, { backgroundColor: value.primary, borderColor: theme.primary, borderWidth: selectedSkin === key ? 4 : 2 }]}
            onPress={() => { setTheme(key); setSelectedSkin(key); }}
          >
            <Image source={{ uri: value.spiritual }} style={styles.skinImg} />
            <Text style={[styles.skinText, { color: value.card }]}>{value.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: theme.primary, marginTop: 24, opacity: selectedSkin ? 1 : 0.5 }]}
        onPress={() => selectedSkin && navigation.navigate("WelcomeScreen")}
        disabled={!selectedSkin}
      >
        <Text style={[styles.buttonText, { color: theme.card }]}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
}
// ...existing styles...

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 24 },
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  skinBtn: { padding: 16, borderRadius: 12, margin: 10, borderWidth: 2, alignItems: "center", width: 140 },
  skinImg: { width: 80, height: 80, borderRadius: 12, marginBottom: 8 },
  skinText: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  button: { padding: 14, borderRadius: 8, alignItems: "center", minWidth: 140 },
  buttonText: { fontWeight: "bold", fontSize: 18 }
});
