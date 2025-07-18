import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { onboardingCompleteRegistration } from "../../services/onboarding";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      // Aquí podrías pedir datos extra si lo requiere el backend
      await onboardingCompleteRegistration("", email, password);
      navigation.replace("LoginScreen");
    } catch (e) {
      setError("No se pudo registrar. Verifica tus datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none" />
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Contraseña" secureTextEntry />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Registrando..." : "Registrarse"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}> 
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 24 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 24 },
  input: { width: "80%", padding: 12, borderRadius: 8, backgroundColor: "#fff", marginBottom: 12, fontSize: 18 },
  button: { backgroundColor: "#6a4c93", padding: 14, borderRadius: 8, marginTop: 8 },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
  error: { color: "red", marginBottom: 10 },
  link: { color: "#6a4c93", marginTop: 12, fontSize: 16 }
});
