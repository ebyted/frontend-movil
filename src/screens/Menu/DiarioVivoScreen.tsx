import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Entry = { text: string; date: string };
export default function DiarioVivoScreen() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("diario_vivo").then(data => {
      if (data) setEntries(JSON.parse(data));
    });
  }, []);

  const addEntry = async () => {
    if (!input.trim()) return;
    const newEntries = [{ text: input, date: new Date().toISOString() }, ...entries];
    setEntries(newEntries);
    setInput("");
    await AsyncStorage.setItem("diario_vivo", JSON.stringify(newEntries));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diario Vivo</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Escribe tu entrada..."
        />
        <TouchableOpacity style={styles.addBtn} onPress={addEntry}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Agregar</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={entries}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.entryBubble}>
            <Text style={styles.entryText}>{item.text}</Text>
            <Text style={styles.entryDate}>{new Date(item.date).toLocaleString()}</Text>
          </View>
        )}
        style={{ flex: 1, width: '100%' }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 16, backgroundColor: '#f7f6f3' },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  inputRow: { flexDirection: 'row', marginBottom: 8 },
  input: { flex: 1, backgroundColor: '#eee', borderRadius: 8, padding: 10, fontSize: 16 },
  addBtn: { backgroundColor: '#3e885b', padding: 12, borderRadius: 8, marginLeft: 8 },
  entryBubble: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginVertical: 4, alignSelf: 'stretch' },
  entryText: { fontSize: 16 },
  entryDate: { fontSize: 10, color: '#888', alignSelf: 'flex-end' }
});
