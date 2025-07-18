import React, { createContext, useState, useEffect } from "react";
import { getThemeFromStorage, saveThemeToStorage, SKINS } from "../utils/theme";

export const ThemeContext = createContext({
  theme: SKINS.light,
  setTheme: (theme: string) => {},
});

export const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("light");
  useEffect(() => { getThemeFromStorage().then(setThemeName); }, []);
  const changeTheme = (newTheme: string) => {
    setThemeName(newTheme);
    saveThemeToStorage(newTheme);
  };
  const theme = SKINS[themeName] || SKINS.light;
  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
