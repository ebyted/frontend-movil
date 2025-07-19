import React, { createContext, useState, useEffect } from "react";
import { getThemeFromStorage, saveThemeToStorage, SKINS } from "../utils/theme";
import axios from "axios";

export const ThemeContext = createContext({
  theme: SKINS.light,
  setTheme: (theme: string) => {},
});

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("light");
  useEffect(() => {
    async function loadTheme() {
      // Try to load from backend first
      try {
        const res = await axios.get("/profile/skin");
        if (res.data && res.data.skin) {
          setThemeName(res.data.skin);
          await saveThemeToStorage(res.data.skin);
          return;
        }
      } catch (e) {}
      // Fallback to local storage
      getThemeFromStorage().then(setThemeName);
    }
    loadTheme();
  }, []);
  const changeTheme = async (newTheme: string) => {
    setThemeName(newTheme);
    await saveThemeToStorage(newTheme);
    // Sync with backend
    try {
      await axios.post("/profile/skin", { skin: newTheme });
    } catch (e) {}
  };
  const theme = SKINS[themeName] || SKINS.light;
  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
