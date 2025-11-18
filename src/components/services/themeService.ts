export function getTheme(): "light" | "dark" {
  const root = document.documentElement;
  const theme = root.getAttribute("data-theme");
  return theme === "dark" ? "dark" : "light";
}


export function setVariablesForTheme(theme: "light" | "dark"): void {
  document.documentElement.setAttribute("data-theme", theme);

  if (theme === "dark") {
    // body
    document.documentElement.style.setProperty('--nc-body-bg', 'var(--nc-black-600)');

    // buttons
    document.documentElement.style.setProperty('--nc-btn-dark-border', 'var(--nc-black-800)');
    document.documentElement.style.setProperty('--nc-btn-dark-bg', 'var(--nc-black-800)');
    document.documentElement.style.setProperty('--nc-btn-dark-hover-bg', 'var(--nc-black-700)');
    document.documentElement.style.setProperty('--nc-btn-dark-text', 'var(--nc-gray-300)');
    document.documentElement.style.setProperty('--nc-btn-outline-border', 'var(--nc-gray-500)');
    document.documentElement.style.setProperty('--nc-btn-outline-text', 'var(--nc-gray-300)');
    document.documentElement.style.setProperty('--nc-btn-outline-bg', 'transparent');
    document.documentElement.style.setProperty('--nc-btn-outline-hover-bg', 'var(--nc-black-800)');
    document.documentElement.style.setProperty('--nc-btn-outline-active-bg', 'var(--nc-black-700)');
    document.documentElement.style.setProperty('--nc-btn-red-border', 'var(--nc-red-950)');
    document.documentElement.style.setProperty('--nc-btn-red-bg', 'var(--nc-red-950)');
    document.documentElement.style.setProperty('--nc-btn-red-text', 'var(--nc-gray-300)');
    document.documentElement.style.setProperty('--nc-btn-red-hover-bg', 'var(--nc-red-900)');
    return;
  }

  if (theme === "light") {
    // body
    document.documentElement.style.setProperty('--nc-body-bg', 'var(--nc-white)');

    // buttons
    document.documentElement.style.setProperty('--nc-btn-dark-border', 'var(--nc-black)');
    document.documentElement.style.setProperty('--nc-btn-dark-bg', 'var(--nc-gray-800)');
    document.documentElement.style.setProperty('--nc-btn-dark-hover-bg', 'var(--nc-gray-950)');
    document.documentElement.style.setProperty('--nc-btn-dark-text', 'var(--nc-white)');
    document.documentElement.style.setProperty('--nc-btn-outline-border', 'var(--nc-gray-500)');
    document.documentElement.style.setProperty('--nc-btn-outline-text', 'var(--nc-gray-700)');
    document.documentElement.style.setProperty('--nc-btn-outline-bg', 'transparent');
    document.documentElement.style.setProperty('--nc-btn-outline-hover-bg', 'var(--nc-gray-100)');
    document.documentElement.style.setProperty('--nc-btn-outline-active-bg', 'var(--nc-gray-200)');
    document.documentElement.style.setProperty('--nc-btn-red-border', 'var(--nc-red-900)');
    document.documentElement.style.setProperty('--nc-btn-red-bg', 'var(--nc-red-900)');
    document.documentElement.style.setProperty('--nc-btn-red-text', 'var(--nc-white)');
    document.documentElement.style.setProperty('--nc-btn-red-hover-bg', 'var(--nc-red-800)');
  }
}


export function toggleTheme(): "light" | "dark" {
  const currentTheme = getTheme();
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  setVariablesForTheme(newTheme);
  return newTheme;
}


export function setTheme(theme: "light" | "dark"): void {
  setVariablesForTheme(theme);
}