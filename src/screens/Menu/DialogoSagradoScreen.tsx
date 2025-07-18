import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Message = { text: string; from: string; date: string };
export default function DialogoSagradoScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("dialogo_sagrado").then(data => {
      if (data) setMessages(JSON.parse(data));
    });
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, from: "user", date: new Date().toISOString() }];
    setMessages(newMessages);
    setInput("");
    await AsyncStorage.setItem("dialogo_sagrado", JSON.stringify(newMessages));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diálogo Sagrado</Text>
      <FlatList
        data={messages}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <View style={styles.msgBubble}>
            <Text style={styles.msgText}>{item.text}</Text>
            <Text style={styles.msgDate}>{new Date(item.date).toLocaleTimeString()}</Text>
          </View>
        )}
        style={{ flex: 1, width: '100%' }}
      />
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Escribe tu mensaje..."
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", padding: 16, backgroundColor: '#f7f6f3' },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  msgBubble: { backgroundColor: '#fff', padding: 10, borderRadius: 8, marginVertical: 4, alignSelf: 'stretch' },
  msgText: { fontSize: 16 },
  msgDate: { fontSize: 10, color: '#888', alignSelf: 'flex-end' },
  inputRow: { flexDirection: 'row', marginTop: 8 },
  input: { flex: 1, backgroundColor: '#eee', borderRadius: 8, padding: 10, fontSize: 16 },
  sendBtn: { backgroundColor: '#6a4c93', padding: 12, borderRadius: 8, marginLeft: 8 }
});
