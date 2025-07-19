import React, { useState, useContext } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import { NotificationsContext } from "../../contexts/NotificationsContext";
import { registerDeviceToken } from "../../services/notifications";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function NotificationsSettingsScreen() {
  const { theme } = useContext(ThemeContext);
  const { token } = useContext(AuthContext);
  const { deviceToken, setDeviceToken } = useContext(NotificationsContext);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const saveSettings = async () => {
    if (!token || !deviceToken) return;
    setLoading(true);
    try {
      await registerDeviceToken(token, deviceToken);
    } catch {}
    setLoading(false);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.title, { color: theme.primary }]}>Notificaciones</Text>
      <View style={styles.row}>
        <Text style={[styles.label, { color: theme.text }]}>Activar notificaciones</Text>
        <Switch value={enabled} onValueChange={setEnabled} />
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.accent }]} onPress={saveSettings} disabled={loading}>
        <Text style={[styles.buttonText, { color: theme.background }]}>{loading ? "Guardando..." : "Guardar"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24 },
  row: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  label: { fontSize: 18, marginRight: 12 },
  button: { backgroundColor: "#6a4c93", padding: 14, borderRadius: 8, marginTop: 24 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 }
});
