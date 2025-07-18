import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
// Aquí deberías tener un servicio para recuperación de contraseña

export default function ForgotPasswordScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRecover = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // await recoverPassword(email);
      setSuccess("Si el correo existe, recibirás instrucciones.");
    } catch (e) {
      setError("No se pudo enviar el correo. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar contraseña</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Email" autoCapitalize="none" />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {success ? <Text style={styles.success}>{success}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleRecover} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? "Enviando..." : "Recuperar"}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}> 
        <Text style={styles.link}>Volver a iniciar sesión</Text>
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
  success: { color: "green", marginBottom: 10 },
  link: { color: "#6a4c93", marginTop: 12, fontSize: 16 }
});
