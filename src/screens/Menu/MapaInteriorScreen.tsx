import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MapaInteriorScreen() {
  const [logros, setLogros] = useState(0);
  const [emociones, setEmociones] = useState(0);

  useEffect(() => {
    // Simulación: leer logros y emociones guardados
    AsyncStorage.getItem("diario_vivo").then(data => {
      if (data) setLogros(JSON.parse(data).length);
    });
    AsyncStorage.getItem("dialogo_sagrado").then(data => {
      if (data) setEmociones(JSON.parse(data).length);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa Interior</Text>
      <Text style={styles.info}>Entradas en Diario Vivo: {logros}</Text>
      <Text style={styles.info}>Mensajes en Diálogo Sagrado: {emociones}</Text>
      <Text style={styles.info}>¡Sigue avanzando en tu camino interior!</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: 'center', padding: 16, backgroundColor: '#f7f6f3' },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  info: { fontSize: 18, marginBottom: 8, textAlign: 'center' }
});
