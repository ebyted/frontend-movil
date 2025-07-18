import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const messages = [
  "Confía en tu luz interior.",
  "Hoy es un buen día para crecer.",
  "Escucha el susurro de tu alma.",
  "La paz está en tu corazón.",
  "Eres suficiente tal como eres."
];

export default function MensajesDelAlmaScreen() {
  const [msg, setMsg] = useState(messages[0]);
  const getRandomMsg = () => {
    const idx = Math.floor(Math.random() * messages.length);
    setMsg(messages[idx]);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mensajes del Alma</Text>
      <Text style={styles.msg}>{msg}</Text>
      <TouchableOpacity style={styles.btn} onPress={getRandomMsg}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Nuevo mensaje</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: 'center', padding: 16, backgroundColor: '#f7f6f3' },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  msg: { fontSize: 20, fontStyle: 'italic', marginBottom: 24, textAlign: 'center' },
  btn: { backgroundColor: '#6a4c93', padding: 14, borderRadius: 8 }
});
