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

    // text
    document.documentElement.style.setProperty('--nc-text-color', 'var(--nc-gray-300)');
    document.documentElement.style.setProperty('--nc-header-text-color', 'var(--nc-gray-200)');

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
    document.documentElement.style.setProperty('--nc-btn-transparent-hover-bg', 'var(--nc-black-700)');
    document.documentElement.style.setProperty('--nc-btn-transparent-active-bg', 'var(--nc-black-800)');
    document.documentElement.style.setProperty('--nc-icon-btn-hover-bg', 'var(--nc-black-800)');
    document.documentElement.style.setProperty('--nc-icon-btn-active-bg', 'var(--nc-black-700)');
    document.documentElement.style.setProperty('--nc-icon-btn-text', 'var(--nc-gray-300)');
    document.documentElement.style.setProperty('--nc-theme-switch-text', 'var(--nc-gray-300)');

    // cards
    document.documentElement.style.setProperty('--nc-card-bg', 'var(--nc-black-700)');
    document.documentElement.style.setProperty('--nc-card-shadow', '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)');
    document.documentElement.style.setProperty('--nc-card-border', 'var(--nc-gray-500)');

    // modals
    document.documentElement.style.setProperty('--nc-modal-content-bg', 'var(--nc-black-600)');
    document.documentElement.style.setProperty('--nc-modal-content-shadow', '0 4px 6px rgba(255, 255, 255, 0.1), 0 10px 10px -1px rgba(255, 255, 255, 0.06)');
    return;
  }

  if (theme === "light") {
    // body
    document.documentElement.style.setProperty('--nc-body-bg', 'var(--nc-white)');

    // text
    document.documentElement.style.setProperty('--nc-text-color', 'var(--nc-gray-700)');
    document.documentElement.style.setProperty('--nc-header-text-color', 'var(--nc-gray-800)');

    // buttons
    document.documentElement.style.setProperty('--nc-btn-dark-border', 'var(--nc-black-950)');
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
    document.documentElement.style.setProperty('--nc-icon-btn-hover-bg', 'var(--nc-gray-100)');
    document.documentElement.style.setProperty('--nc-icon-btn-active-bg', 'var(--nc-gray-200)');
    document.documentElement.style.setProperty('--nc-icon-btn-text', 'var(--nc-gray-700)');
    document.documentElement.style.setProperty('--nc-theme-switch-text', 'var(--nc-gray-700)');

    // cards
    document.documentElement.style.setProperty('--nc-card-bg', 'transparent');
    document.documentElement.style.setProperty('--nc-card-shadow', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)');
    document.documentElement.style.setProperty('--nc-card-border', 'var(--nc-gray-300)');

    // modals
    document.documentElement.style.setProperty('--nc-modal-content-bg', 'var(--nc-white)');
    document.documentElement.style.setProperty('--nc-modal-content-shadow', '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)');
    return;
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