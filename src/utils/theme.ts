import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getThemeFromStorage() {
  const theme = await AsyncStorage.getItem('theme');
  return theme || 'light';
}

export async function saveThemeToStorage(theme: string) {
  await AsyncStorage.setItem('theme', theme);
}

export const SKINS = {
  light: {
    name: "Luz",
    background: "#f7f6f3",
    primary: "#6a4c93",
    accent: "#b8c6db",
    text: "#222",
    card: "#fff",
    spiritual: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"
  },
  dark: {
    name: "Oscuridad",
    background: "#22223b",
    primary: "#9a8c98",
    accent: "#4a4e69",
    text: "#fff",
    card: "#2a2a40",
    spiritual: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
  },
  forest: {
    name: "Bosque",
    background: "#eafbe7",
    primary: "#3e885b",
    accent: "#a3c9a8",
    text: "#2d4739",
    card: "#fff",
    spiritual: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"
  },
  desert: {
    name: "Desierto",
    background: "#fdf6e3",
    primary: "#c2b280",
    accent: "#e2c275",
    text: "#7c6f57",
    card: "#fff8e1",
    spiritual: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80"
  }
};
