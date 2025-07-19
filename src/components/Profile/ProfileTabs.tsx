import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, ScrollView } from 'react-native';
import { getProfile, updateProfile, getHeartRate, getDashboard, getAchievements, changePassword } from '../../services/profile';

export default function ProfileTabs() {
  const [tab, setTab] = useState('datos');
  const [profile, setProfile] = useState<any>(null);
  const [heartRate, setHeartRate] = useState<any>(null);
  const [dashboard, setDashboard] = useState<any>(null);
  const [achievements, setAchievements] = useState<any>(null);
  const [passwords, setPasswords] = useState({ old: '', new: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (tab === 'datos') getProfile().then(setProfile);
    if (tab === 'cardio') getHeartRate().then(setHeartRate);
    if (tab === 'dashboard') getDashboard().then(setDashboard);
    if (tab === 'logros') getAchievements().then(setAchievements);
  }, [tab]);

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 }}>
        <Button title="Datos" onPress={() => setTab('datos')} />
        <Button title="Cardio" onPress={() => setTab('cardio')} />
        <Button title="Dashboard" onPress={() => setTab('dashboard')} />
        <Button title="Logros" onPress={() => setTab('logros')} />
        <Button title="Contraseña" onPress={() => setTab('password')} />
      </View>
      <ScrollView style={{ flex: 1 }}>
        {tab === 'datos' && profile && (
          <View style={{ padding: 16 }}>
            <Text>Nombre completo: {profile.fullName}</Text>
            <Text>Email: {profile.email}</Text>
            {/* Agrega edición si lo deseas */}
          </View>
        )}
        {tab === 'cardio' && heartRate && (
          <View style={{ padding: 16 }}>
            <Text>Frecuencia cardíaca: {heartRate.value} bpm</Text>
            <Text>Fecha: {heartRate.date}</Text>
          </View>
        )}
        {tab === 'dashboard' && dashboard && (
          <View style={{ padding: 16 }}>
            <Text>Resumen: {dashboard.summary}</Text>
            {/* Muestra más datos si lo deseas */}
          </View>
        )}
        {tab === 'logros' && achievements && (
          <View style={{ padding: 16 }}>
            <Text>Logros:</Text>
            {achievements.map((a: any, i: number) => (
              <Text key={i}>- {a.name}: {a.description}</Text>
            ))}
          </View>
        )}
        {tab === 'password' && (
          <View style={{ padding: 16 }}>
            <Text>Cambiar contraseña</Text>
            <TextInput
              placeholder="Contraseña actual"
              secureTextEntry
              value={passwords.old}
              onChangeText={t => setPasswords(p => ({ ...p, old: t }))}
              style={{ marginVertical: 8, borderWidth: 1, borderColor: '#ccc', padding: 8 }}
            />
            <TextInput
              placeholder="Nueva contraseña"
              secureTextEntry
              value={passwords.new}
              onChangeText={t => setPasswords(p => ({ ...p, new: t }))}
              style={{ marginVertical: 8, borderWidth: 1, borderColor: '#ccc', padding: 8 }}
            />
            <Button title="Guardar" onPress={async () => {
              try {
                await changePassword(passwords.old, passwords.new);
                setMessage('Contraseña cambiada correctamente');
              } catch {
                setMessage('Error al cambiar la contraseña');
              }
            }} />
            {message ? <Text style={{ color: 'green', marginTop: 8 }}>{message}</Text> : null}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
