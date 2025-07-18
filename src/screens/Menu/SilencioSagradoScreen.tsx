import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function SilencioSagradoScreen() {
  const [timer, setTimer] = useState(0);
  const [active, setActive] = useState(false);

  React.useEffect(() => {
    let interval;
    if (active && timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    } else if (timer === 0) {
      setActive(false);
    }
    return () => clearInterval(interval);
  }, [active, timer]);

  const startSilence = (seconds) => {
    setTimer(seconds);
    setActive(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Silencio Sagrado</Text>
      {active ? (
        <View style={styles.silenceBox}>
          <Text style={styles.timer}>{timer}s</Text>
          <Text style={styles.info}>Respira y disfruta el silencio...</Text>
          <TouchableOpacity style={styles.stopBtn} onPress={() => setActive(false)}>
            <Text style={{ color: '#fff' }}>Detener</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <TouchableOpacity style={styles.silenceBtn} onPress={() => startSilence(60)}>
            <Text style={styles.silenceText}>1 minuto de silencio</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.silenceBtn} onPress={() => startSilence(180)}>
            <Text style={styles.silenceText}>3 minutos de silencio</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: 'center', padding: 16, backgroundColor: '#f7f6f3' },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  silenceBtn: { backgroundColor: '#fff', padding: 16, borderRadius: 8, marginVertical: 8, alignSelf: 'stretch', alignItems: 'center' },
  silenceText: { fontSize: 18, fontWeight: 'bold' },
  silenceBox: { backgroundColor: '#eee', padding: 24, borderRadius: 12, alignItems: 'center', marginTop: 24 },
  timer: { fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  info: { fontSize: 16, marginBottom: 12 },
  stopBtn: { backgroundColor: '#3e885b', padding: 12, borderRadius: 8 }
});
