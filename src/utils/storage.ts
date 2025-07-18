import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getCredentials() {
  const email = await AsyncStorage.getItem('email');
  const password = await AsyncStorage.getItem('password');
  if (email && password) return { email, password };
  return null;
}

export async function saveCredentials(email: string, password: string) {
  await AsyncStorage.setItem('email', email);
  await AsyncStorage.setItem('password', password);
}

export async function removeCredentials() {
  await AsyncStorage.removeItem('email');
  await AsyncStorage.removeItem('password');
}
