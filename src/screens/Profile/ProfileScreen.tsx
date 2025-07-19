import React, { useContext } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ProfileTabs from '../../components/Profile/ProfileTabs';
import { ThemeContext } from "../../contexts/ThemeContext";

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const { theme } = useContext(ThemeContext);
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <TouchableOpacity
        style={{
          alignSelf: 'flex-end',
          margin: 16,
          padding: 10,
          backgroundColor: theme.primary,
          borderRadius: 8
        }}
        onPress={() => navigation.navigate("SkinSelectorScreen")}
      >
        <Text style={{ color: theme.card, fontWeight: 'bold' }}>Cambiar Skin</Text>
      </TouchableOpacity>
      <ProfileTabs />
    </View>
  );
}


