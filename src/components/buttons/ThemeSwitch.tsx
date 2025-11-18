import { useState, useEffect } from "react";
import IconButton from "./IconButton";
import { CiDark, CiLight } from "react-icons/ci";
import { toggleTheme, setTheme, getTheme } from "../services/themeService";



export interface ThemeSwitchProps {
  className?: string;
  style?: React.CSSProperties;
  defaultTheme?: "light" | "dark";
  onChange?: (newTheme: "light" | "dark") => void;
  iconSize?: number;
}


export default function ThemeSwitch({ 
  className, 
  style, 
  onChange = () => {}, 
  defaultTheme = "light", 
  iconSize = 18,
}: ThemeSwitchProps) {

  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">(getTheme());

  // helpers
  const handleThemeChange = () => {
    const newTheme = toggleTheme();
    setCurrentTheme(newTheme);
    onChange(newTheme);
  }

  // use default theme on mount
  useEffect(() => { 
    setTheme(defaultTheme);
    setCurrentTheme(defaultTheme);
  }, [defaultTheme]);

  // render
  return (
    <IconButton
      className={className}
      style={style}
      icon={currentTheme === "light" ? <CiDark size={iconSize} /> : <CiLight size={iconSize} />}
      onClick={handleThemeChange}
    />
  )
}