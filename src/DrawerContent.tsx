import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from "./contexts/ThemeContext";

export default function DrawerContent(props) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <DrawerContentScrollView {...props} style={{ backgroundColor: theme.background }}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.primary }]}>BeCalm</Text>
      </View>
      <DrawerItemList {...props} />
      <TouchableOpacity style={[styles.logoutBtn, { backgroundColor: theme.primary }]} onPress={() => props.navigation.navigate('SplashScreen')}>
        <Text style={{ color: theme.card, fontWeight: 'bold' }}>Cerrar sesión</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  header: { padding: 24, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  logoutBtn: { margin: 24, padding: 12, borderRadius: 8, alignItems: 'center' }
});
