import { useState } from "react";
import IconButton from "./IconButton";
import { CiDark, CiLight } from "react-icons/ci";



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

  const [theme, setTheme] = useState<"light" | "dark">(defaultTheme);

  function toggleTheme() {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    onChange(newTheme);
  }

  return (
    <IconButton
      className={className}
      style={style}
      icon={theme === "light" ? <CiDark size={iconSize} /> : <CiLight size={iconSize} />}
      onClick={toggleTheme}
    />
  )
}