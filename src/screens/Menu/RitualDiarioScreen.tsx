import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const rituals = [
  "Agradecer el día",
  "Respirar profundo",
  "Visualizar tu meta",
  "Leer una frase inspiradora",
  "Meditar 5 minutos"
];

export default function RitualDiarioScreen() {
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem("ritual_diario").then(data => {
      if (data) setDone(JSON.parse(data));
    });
  }, []);

  const toggleRitual = async (ritual) => {
    let newDone;
    if (done.includes(ritual)) {
      newDone = done.filter(r => r !== ritual);
    } else {
      newDone = [...done, ritual];
    }
    setDone(newDone);
    await AsyncStorage.setItem("ritual_diario", JSON.stringify(newDone));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ritual Diario</Text>
      {rituals.map(r => (
        <TouchableOpacity
          key={r}
          style={[styles.ritualBtn, { backgroundColor: done.includes(r) ? '#a3c9a8' : '#fff' }]}
          onPress={() => toggleRitual(r)}
        >
          <Text style={styles.ritualText}>{r}</Text>
        </TouchableOpacity>
      ))}
      <Text style={styles.progress}>Completados: {done.length} / {rituals.length}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 16, backgroundColor: '#f7f6f3' },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  ritualBtn: { padding: 14, borderRadius: 8, marginVertical: 8, alignSelf: 'stretch', alignItems: 'center', borderWidth: 1, borderColor: '#a3c9a8' },
  ritualText: { fontSize: 16 },
  progress: { marginTop: 24, fontSize: 16, fontWeight: 'bold' }
});
