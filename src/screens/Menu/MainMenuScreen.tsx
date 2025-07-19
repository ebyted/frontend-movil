import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SKINS } from "../../utils/theme";

const menuOptions = [
  { name: "Dialogo Sagrado", icon: "🙏", screen: "DialogoSagradoScreen" },
  { name: "Diario Vivo", icon: "📖", screen: "DiarioVivoScreen" },
  { name: "Medita Conmigo", icon: "🧘", screen: "MeditaConmigoScreen" },
  { name: "Mensajes del Alma", icon: "💌", screen: "MensajesDelAlmaScreen" },
  { name: "Ritual Diario", icon: "🕯️", screen: "RitualDiarioScreen" },
  { name: "Mapa Interior", icon: "🗺️", screen: "MapaInteriorScreen" },
  { name: "Silencio Sagrado", icon: "🤫", screen: "SilencioSagradoScreen" },
];

type SkinKey = keyof typeof SKINS;

type ThemeType = {
  name: string;
  background: string;
  primary: string;
  accent: string;
  text: string;
  card: string;
  spiritual: string;
};

export default function MainMenuScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.primary }]}>Bienvenido a tu espacio sagrado</Text>
      <View style={styles.menuGrid}>
        {menuOptions.map(opt => (
          <TouchableOpacity key={opt.name} style={[styles.card, { backgroundColor: theme.card }]} onPress={() => navigation.navigate(opt.screen)}>
            <Text style={styles.icon}>{opt.icon}</Text>
            <Text style={[styles.cardText, { color: theme.primary }]}>{opt.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 28, fontWeight: "bold", margin: 24, textAlign: "center" },
  menuGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" },
  card: { width: 120, height: 120, margin: 12, borderRadius: 16, alignItems: "center", justifyContent: "center", elevation: 4 },
  icon: { fontSize: 32, marginBottom: 10 },
  cardText: { fontSize: 14, fontWeight: "bold", textAlign: "center" }
});
