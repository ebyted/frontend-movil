import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const meditations = [
  { name: "Respiración consciente", duration: 60 },
  { name: "Relajación guiada", duration: 120 },
  { name: "Silencio interior", duration: 180 }
];

type Meditation = { name: string; duration: number };
export default function MeditaConmigoScreen() {
  const [timer, setTimer] = useState(0);
  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState<Meditation | null>(null);

  React.useEffect(() => {
    let interval;
    if (active && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setActive(false);
    }
    return () => clearInterval(interval);
  }, [active, timer]);

  const startMeditation = (med) => {
    setSelected(med);
    setTimer(med.duration);
    setActive(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Medita Conmigo</Text>
      {active && selected ? (
        <View style={styles.meditationBox}>
          <Text style={styles.meditationName}>{selected.name}</Text>
          <Text style={styles.timer}>{timer}s</Text>
          <TouchableOpacity style={styles.stopBtn} onPress={() => setActive(false)}>
            <Text style={{ color: '#fff' }}>Detener</Text>
          </TouchableOpacity>
        </View>
      ) : (
        meditations.map(med => (
          <TouchableOpacity key={med.name} style={styles.meditationBtn} onPress={() => startMeditation(med)}>
            <Text style={styles.meditationName}>{med.name} ({med.duration}s)</Text>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 16, backgroundColor: '#f7f6f3' },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  meditationBtn: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginVertical: 8, alignSelf: 'stretch', alignItems: 'center' },
  meditationBox: { backgroundColor: '#eee', padding: 24, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  meditationName: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  timer: { fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  stopBtn: { backgroundColor: '#c2b280', padding: 12, borderRadius: 8 }
});
