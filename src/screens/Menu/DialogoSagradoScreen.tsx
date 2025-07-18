
import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getChatMessages, sendChatMessage } from "../../services/chat";
import { AuthContext } from "../../contexts/AuthContext";

type Message = { id?: string; text: string; from: string; date: string };

const DialogoSagradoScreen: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch messages on mount
  useEffect(() => {
    fetchMessages();
  }, [token]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      if (token) {
        const res = await getChatMessages(token);
        setMessages(res.data);
      } else {
        const data = await AsyncStorage.getItem("dialogo_sagrado");
        if (data) setMessages(JSON.parse(data));
      }
    } catch {
      Alert.alert("Error", "No se pudieron cargar los mensajes.");
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const newMsg: Message = { text: input, from: "user", date: new Date().toISOString() };
    try {
      if (token) {
        const res = await sendChatMessage(token, { text: input });
        setMessages([...messages, res.data]);
      } else {
        const newMessages = [...messages, newMsg];
        setMessages(newMessages);
        await AsyncStorage.setItem("dialogo_sagrado", JSON.stringify(newMessages));
      }
      setInput("");
    } catch {
      Alert.alert("Error", "No se pudo enviar el mensaje.");
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Diálogo Sagrado</Text>
      <FlatList
        data={messages}
        keyExtractor={(item, i) => item.id ?? i.toString()}
        renderItem={({ item }) => (
          <View style={styles.msgBubble}>
            <Text style={styles.msgText}>{item.text}</Text>
            <Text style={styles.msgDate}>{new Date(item.date).toLocaleTimeString()}</Text>
          </View>
        )}
        style={{ flex: 1, width: '100%' }}
        refreshing={loading}
        onRefresh={fetchMessages}
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
};

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

export default DialogoSagradoScreen;
