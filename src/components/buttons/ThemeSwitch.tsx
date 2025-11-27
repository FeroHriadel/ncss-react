import IconButton from "./IconButton";
import { CiDark, CiLight } from "react-icons/ci";
import useTheme from "../services/themeService";



export interface ThemeSwitchProps {
  className?: string;
  style?: React.CSSProperties;
  onChange?: (newTheme: "light" | "dark") => void;
  iconSize?: number;
}


export default function ThemeSwitch({ 
  className, 
  style, 
  onChange = () => {},  
  iconSize = 18,
}: ThemeSwitchProps) {

  // values
  const { toggleTheme, theme } = useTheme();

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