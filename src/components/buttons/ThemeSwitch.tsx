import { useEffect, useState } from "react";
import IconButton from "./IconButton";
import { CiDark, CiLight } from "react-icons/ci";
import useTheme from "../services/themeService";



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

  // values
  const [firstRender, setFirstRender] = useState(true);
  const { toggleTheme, setTheme, theme } = useTheme();

  // apply default theme on first render
  useEffect(() => {
    if (!firstRender) return;
    setFirstRender(false);
    if (theme !== defaultTheme) { setTheme(defaultTheme); }
  }, [theme, firstRender]);
  

  // helpers
  const handleThemeChange = () => {
    const newTheme = toggleTheme();
    onChange(newTheme);
  }

  // render
  return (
    <IconButton
      className={className}
      style={style}
      icon={theme === "light" ? <CiDark size={iconSize} /> : <CiLight size={iconSize} />}
      onClick={handleThemeChange}
    />
  )
}