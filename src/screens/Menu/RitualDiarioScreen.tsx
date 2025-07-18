import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRitualProgress, updateRitualProgress } from "../../services/ritual";
import { AuthContext } from "../../contexts/AuthContext";

const rituals = [
  "Agradecer el día",
  "Respirar profundo",
  "Visualizar tu meta",
  "Leer una frase inspiradora",
  "Meditar 5 minutos"
];

export default function RitualDiarioScreen() {
  const { token } = useContext(AuthContext);
  const [done, setDone] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProgress() {
      setLoading(true);
      if (token) {
        try {
          const res = await getRitualProgress(token);
          setDone(res.data.progress ?? []);
        } catch {
          const data = await AsyncStorage.getItem("ritual_diario");
          if (data) setDone(JSON.parse(data));
        }
      } else {
        const data = await AsyncStorage.getItem("ritual_diario");
        if (data) setDone(JSON.parse(data));
      }
      setLoading(false);
    }
    fetchProgress();
  }, [token]);

  const toggleRitual = async (ritual: string) => {
    setLoading(true);
    let newDone;
    if (done.includes(ritual)) {
      newDone = done.filter(r => r !== ritual);
    } else {
      newDone = [...done, ritual];
    }
    setDone(newDone);
    try {
      if (token) {
        await updateRitualProgress(token, newDone);
      } else {
        await AsyncStorage.setItem("ritual_diario", JSON.stringify(newDone));
      }
    } catch {
      Alert.alert("Error", "No se pudo guardar el progreso.");
    }
    setLoading(false);
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
