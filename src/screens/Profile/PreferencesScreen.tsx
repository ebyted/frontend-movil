import React, { useState, useEffect, useContext } from "react";
import { View, Text, Switch, TouchableOpacity, StyleSheet } from "react-native";
import { getPreferences, updatePreferences } from "../../services/preferences";
import { AuthContext } from "../../contexts/AuthContext";
import { ThemeContext } from "../../contexts/ThemeContext";

export default function PreferencesScreen() {
  const { token } = useContext(AuthContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [darkMode, setDarkMode] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPrefs() {
      if (!token) return;
      setLoading(true);
      try {
        const res = await getPreferences(token);
        setDarkMode(res.data.darkMode ?? false);
        setSoundOn(res.data.soundOn ?? true);
      } catch {}
      setLoading(false);
    }
    fetchPrefs();
  }, [token]);

  const savePrefs = async () => {
    if (!token) return;
    setLoading(true);
    try {
      await updatePreferences(token, { darkMode, soundOn });
    } catch {}
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preferencias</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Modo oscuro</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Sonido</Text>
        <Switch value={soundOn} onValueChange={setSoundOn} />
      </View>
      <TouchableOpacity style={styles.button} onPress={savePrefs} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Guardando..." : "Guardar"}</Text>
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
