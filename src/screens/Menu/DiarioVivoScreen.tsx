import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDiarioEntries, createDiarioEntry, updateDiarioEntry, deleteDiarioEntry } from "../../services/diario";
import { AuthContext } from "../../contexts/AuthContext";

type Entry = { id?: string; text: string; date: string };
export default function DiarioVivoScreen() {
  const { token } = useContext(AuthContext);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchEntries() {
      setLoading(true);
      if (token) {
        try {
          const res = await getDiarioEntries(token);
          setEntries(res.data);
        } catch {
          // fallback local
          const data = await AsyncStorage.getItem("diario_vivo");
          if (data) setEntries(JSON.parse(data));
        }
      } else {
        const data = await AsyncStorage.getItem("diario_vivo");
        if (data) setEntries(JSON.parse(data));
      }
      setLoading(false);
    }
    fetchEntries();
  }, [token]);

  const addEntry = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const newEntry: Entry = { text: input, date: new Date().toISOString() };
    try {
      if (token) {
        const res = await createDiarioEntry(token, { text: input });
        setEntries([res.data, ...entries]);
      } else {
        const newEntries = [newEntry, ...entries];
        setEntries(newEntries);
        await AsyncStorage.setItem("diario_vivo", JSON.stringify(newEntries));
      }
      setInput("");
    } catch {
      Alert.alert("Error", "No se pudo agregar la entrada.");
    }
    setLoading(false);
  };

  const deleteEntry = async (id?: string, idx?: number) => {
    setLoading(true);
    try {
      if (token && id) {
        await deleteDiarioEntry(token, id);
        setEntries(entries.filter(e => e.id !== id));
      } else if (typeof idx === "number") {
        const newEntries = entries.filter((_, i) => i !== idx);
        setEntries(newEntries);
        await AsyncStorage.setItem("diario_vivo", JSON.stringify(newEntries));
      }
    } catch {
      Alert.alert("Error", "No se pudo borrar la entrada.");
    }
    setLoading(false);
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
        keyExtractor={(item, i) => item.id ?? i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.entryBubble}>
            <Text style={styles.entryText}>{item.text}</Text>
            <Text style={styles.entryDate}>{new Date(item.date).toLocaleString()}</Text>
            <TouchableOpacity onPress={() => deleteEntry(item.id, index)} style={{ marginTop: 4 }}>
              <Text style={{ color: 'red', fontSize: 12 }}>Borrar</Text>
            </TouchableOpacity>
          </View>
        )}
        style={{ flex: 1, width: '100%' }}
        refreshing={loading}
        onRefresh={() => {
          if (!loading) {
            if (token) {
              getDiarioEntries(token).then(res => setEntries(res.data));
            } else {
              AsyncStorage.getItem("diario_vivo").then(data => {
                if (data) setEntries(JSON.parse(data));
              });
            }
          }
        }}
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
