import { useState } from "react";



export default function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">(getTheme());

  function getTheme(): "light" | "dark" {
    const root = document.documentElement;
    const theme = root.getAttribute("data-theme");
    return theme === "dark" ? "dark" : "light";
  }

  function toggleTheme(): "light" | "dark" {
    const currentTheme = getTheme();
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    setVariablesForTheme(newTheme);
    setThemeState(newTheme);
    return newTheme;
  }


  function setTheme(theme: "light" | "dark"): void {
    setVariablesForTheme(theme);
    setThemeState(theme);
  }

  function setVariablesForTheme(theme: "light" | "dark"): void {
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
      document.documentElement.style.setProperty('--nc-btn-transparent-bg', 'transparent');
      document.documentElement.style.setProperty('--nc-btn-transparent-hover-bg', 'var(--nc-black-700)');
      document.documentElement.style.setProperty('--nc-btn-transparent-active-bg', 'var(--nc-black-800)');
      document.documentElement.style.setProperty('--nc-btn-transparent-border', 'transparent');
      document.documentElement.style.setProperty('--nc-btn-transparent-text', 'var(--nc-gray-300)');
      document.documentElement.style.setProperty('--nc-icon-btn-hover-bg', 'var(--nc-black-800)');
      document.documentElement.style.setProperty('--nc-icon-btn-active-bg', 'var(--nc-black-700)');
      document.documentElement.style.setProperty('--nc-icon-btn-text', 'var(--nc-gray-300)');
      document.documentElement.style.setProperty('--nc-theme-switch-text', 'var(--nc-gray-300)');

      // cards
      document.documentElement.style.setProperty('--nc-card-bg', 'var(--nc-black-700)');
      document.documentElement.style.setProperty('--nc-card-shadow', '0 4px 6px -1px rgba(255, 255, 255, 0.1), 0 2px 4px -1px rgba(255, 255, 255, 0.06)');
      document.documentElement.style.setProperty('--nc-card-border', 'var(--nc-gray-500)');

      // dialogs
      document.documentElement.style.setProperty('--nc-modal-content-bg', 'var(--nc-black-600)');
      document.documentElement.style.setProperty('--nc-modal-content-shadow', '0 4px 6px rgba(255, 255, 255, 0.1), 0 10px 10px -1px rgba(255, 255, 255, 0.06)');

      //dropdowns
      document.documentElement.style.setProperty('--nc-dropdown-options-bg', 'var(--nc-black-700)');
      document.documentElement.style.setProperty('--nc-dropdown-options-border', 'var(--nc-gray-500)');
      document.documentElement.style.setProperty('--nc-dropdown-options-shadow', '0 4px 6px rgba(255, 255, 255, 0.1), 0 10px 10px -1px rgba(255, 255, 255, 0.06)');
      document.documentElement.style.setProperty('--nc-multiselect-text', 'var(--nc-gray-300)');
      document.documentElement.style.setProperty('--nc-multiselect-bg', 'var(--nc-black-800)');
      document.documentElement.style.setProperty('--nc-multiselect-options-bg', 'var(--nc-black-700)');
      document.documentElement.style.setProperty('--nc-multiselect-options-border', 'var(--nc-gray-500)');
      document.documentElement.style.setProperty('--nc-multiselect-options-shadow', '0 4px 6px rgba(255, 255, 255, 0.1), 0 10px 10px -1px rgba(255, 255, 255, 0.06)');
      document.documentElement.style.setProperty('--nc-multiselect-option-hover-bg', 'var(--nc-black-600)');
      document.documentElement.style.setProperty('--nc-multiselect-icon', 'var(--nc-gray-300)');

      // inputs
      document.documentElement.style.setProperty('--nc-checkbox-border', 'var(--nc-gray-300)');
      document.documentElement.style.setProperty('--nc-checkbox-checked-bg', 'var(--nc-gray-300)');
      document.documentElement.style.setProperty('--nc-checkbox-hover-bg', 'var(--nc-gray-400)');
      document.documentElement.style.setProperty('--nc-checkbox-icon', 'var(--nc-black-600)');
      document.documentElement.style.setProperty('--nc-checkbox-label', 'var(--nc-gray-300)');
      document.documentElement.style.setProperty('--nc-input-label', 'var(--nc-gray-400)');
      document.documentElement.style.setProperty('--nc-input-border', 'var(--nc-gray-500)');
      document.documentElement.style.setProperty('--nc-input-bg', 'var(--nc-black-700)');
      document.documentElement.style.setProperty('--nc-input-text', 'var(--nc-gray-300)');
      document.documentElement.style.setProperty('--nc-input-hover-bg', 'var(--nc-black-600)');
      document.documentElement.style.setProperty('--nc-input-placeholder', 'var(--nc-gray-400)');
      document.documentElement.style.setProperty('--nc-input-message-text', 'var(--nc-gray-400)');
      document.documentElement.style.setProperty('--nc-input-error-text', 'var(--nc-red-300)');
      document.documentElement.style.setProperty('--nc-switch-track-unchecked-bg', 'var(--nc-black-800)');
      document.documentElement.style.setProperty('--nc-switch-track-checked-bg', 'var(--nc-gray-500)');
      document.documentElement.style.setProperty('--nc-switch-track-checked-hover-bg', 'var(--nc-gray-400)');
      document.documentElement.style.setProperty('--nc-switch-thumb-bg', 'var(--nc-black-600)');

      // pills
      document.documentElement.style.setProperty('--nc-pill-bg', 'var(--nc-black-500)');
      document.documentElement.style.setProperty('--nc-pill-text', 'var(--nc-gray-300)');
      
      // tables
      document.documentElement.style.setProperty('--nc-table-header-border', 'var(--nc-gray-700)');
      document.documentElement.style.setProperty('--nc-table-header-bg', 'var(--nc-black-700)');
      document.documentElement.style.setProperty('--nc-table-text', 'var(--nc-gray-300)');
      document.documentElement.style.setProperty('--nc-table-text-light', 'var(--nc-gray-400)');
      document.documentElement.style.setProperty('--nc-table-scrollbar-bg', 'var(--nc-black-800)');
      document.documentElement.style.setProperty('--nc-table-scrollbar-thumb-bg', 'var(--nc-gray-600)');
      document.documentElement.style.setProperty('--nc-table-applied-filters-bg', 'var(--nc-black-700)');
      document.documentElement.style.setProperty('--nc-table-row-bg', 'var(--nc-black-800)');
      document.documentElement.style.setProperty('--nc-table-row-striped-bg', 'var(--nc-black-700)');
      document.documentElement.style.setProperty('--nc-table-row-hover-bg', 'var(--nc-black-600)');

      // toasts
      document.documentElement.style.setProperty('--nc-toast-bg', 'var(--nc-black-700)');
      document.documentElement.style.setProperty('--nc-toast-text', 'var(--nc-gray-300)');
      document.documentElement.style.setProperty('--nc-toast-border', 'var(--nc-gray-500)');
      document.documentElement.style.setProperty('--nc-toast-shadow', '0 4px 6px rgba(255, 255, 255, 0.1), 0 10px 10px -1px rgba(255, 255, 255, 0.06)');
      document.documentElement.style.setProperty('--nc-toast-error-bg', 'var(--nc-red-950)');
      document.documentElement.style.setProperty('--nc-toast-error-text', 'var(--nc-gray-300)');
      document.documentElement.style.setProperty('--nc-toast-error-border', 'var(--nc-black-700)');

      //navs
      document.documentElement.style.setProperty('--nc-nav-bg', 'var(--nc-black-700)');
      document.documentElement.style.setProperty('--nc-nav-text', 'var(--nc-gray-300)');
      document.documentElement.style.setProperty('--nc-nav-text-hover', 'var(--nc-white)');
      document.documentElement.style.setProperty('--nc-nav-option-hover-bg', 'var(--nc-black-600)');
      document.documentElement.style.setProperty('--nc-nav-border', 'var(--nc-gray-500)');
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
      document.documentElement.style.setProperty('--nc-btn-transparent-bg', 'transparent');
      document.documentElement.style.setProperty('--nc-btn-transparent-hover-bg', 'var(--nc-gray-100)');
      document.documentElement.style.setProperty('--nc-btn-transparent-active-bg', 'var(--nc-gray-200)');
      document.documentElement.style.setProperty('--nc-btn-transparent-border', 'transparent');
      document.documentElement.style.setProperty('--nc-btn-transparent-text', 'var(--nc-gray-700)');
      document.documentElement.style.setProperty('--nc-icon-btn-hover-bg', 'var(--nc-gray-100)');
      document.documentElement.style.setProperty('--nc-icon-btn-active-bg', 'var(--nc-gray-200)');
      document.documentElement.style.setProperty('--nc-icon-btn-text', 'var(--nc-gray-700)');
      document.documentElement.style.setProperty('--nc-theme-switch-text', 'var(--nc-gray-700)');

      // cards
      document.documentElement.style.setProperty('--nc-card-bg', 'transparent');
      document.documentElement.style.setProperty('--nc-card-shadow', '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)');
      document.documentElement.style.setProperty('--nc-card-border', 'var(--nc-gray-300)');

      // dialogs
      document.documentElement.style.setProperty('--nc-modal-content-bg', 'var(--nc-white)');
      document.documentElement.style.setProperty('--nc-modal-content-shadow', '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)');

      // dropdowns
      document.documentElement.style.setProperty('--nc-dropdown-options-bg', 'var(--nc-white)');
      document.documentElement.style.setProperty('--nc-dropdown-options-border', 'var(--nc-gray-300)');
      document.documentElement.style.setProperty('--nc-dropdown-options-shadow', '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)');
      document.documentElement.style.setProperty('--nc-multiselect-text', 'var(--nc-gray-700)');
      document.documentElement.style.setProperty('--nc-multiselect-bg', 'transparent');
      document.documentElement.style.setProperty('--nc-multiselect-options-bg', 'var(--nc-white)');
      document.documentElement.style.setProperty('--nc-multiselect-options-border', 'var(--nc-gray-300)');
      document.documentElement.style.setProperty('--nc-multiselect-options-shadow', '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)');
      document.documentElement.style.setProperty('--nc-multiselect-option-hover-bg', 'var(--nc-gray-100)');
      document.documentElement.style.setProperty('--nc-multiselect-icon', 'var(--nc-gray-500)');

      // inputs
      document.documentElement.style.setProperty('--nc-checkbox-border', 'var(--nc-gray-800)');
      document.documentElement.style.setProperty('--nc-checkbox-checked-bg', 'var(--nc-gray-800)');
      document.documentElement.style.setProperty('--nc-checkbox-hover-bg', 'var(--nc-gray-950)');
      document.documentElement.style.setProperty('--nc-checkbox-icon', 'var(--nc-white)');
      document.documentElement.style.setProperty('--nc-checkbox-label', 'var(--nc-gray-700)');
      document.documentElement.style.setProperty('--nc-input-label', 'var(--nc-gray-600)');
      document.documentElement.style.setProperty('--nc-input-border', 'var(--nc-gray-300)');
      document.documentElement.style.setProperty('--nc-input-bg', 'var(--nc-gray-100)');
      document.documentElement.style.setProperty('--nc-input-text', 'var(--nc-gray-700)');
      document.documentElement.style.setProperty('--nc-input-hover-bg', 'var(--nc-gray-200)');
      document.documentElement.style.setProperty('--nc-input-placeholder', 'var(--nc-gray-600)');
      document.documentElement.style.setProperty('--nc-input-message-text', 'var(--nc-gray-600)');
      document.documentElement.style.setProperty('--nc-input-error-text', 'var(--nc-red-900)');
      document.documentElement.style.setProperty('--nc-switch-track-unchecked-bg', 'var(--nc-gray-500)');
      document.documentElement.style.setProperty('--nc-switch-track-checked-bg', 'var(--nc-gray-800)');
      document.documentElement.style.setProperty('--nc-switch-track-checked-hover-bg', 'var(--nc-gray-950)');
      document.documentElement.style.setProperty('--nc-switch-thumb-bg', 'var(--nc-gray-100)');

      // pills
      document.documentElement.style.setProperty('--nc-pill-bg', 'var(--nc-gray-100)');
      document.documentElement.style.setProperty('--nc-pill-text', 'var(--nc-gray-600)');

      // tables
      document.documentElement.style.setProperty('--nc-table-header-border', 'var(--nc-gray-300)');
      document.documentElement.style.setProperty('--nc-table-header-bg', 'var(--nc-gray-200)');
      document.documentElement.style.setProperty('--nc-table-text', 'var(--nc-gray-700)');
      document.documentElement.style.setProperty('--nc-table-text-light', 'var(--nc-gray-600)');
      document.documentElement.style.setProperty('--nc-table-scrollbar-bg', 'var(--nc-gray-50)');
      document.documentElement.style.setProperty('--nc-table-scrollbar-thumb-bg', 'var(--nc-gray-400)');
      document.documentElement.style.setProperty('--nc-table-applied-filters-bg', 'var(--nc-gray-200)');
      document.documentElement.style.setProperty('--nc-table-row-bg', 'var(--nc-white)');
      document.documentElement.style.setProperty('--nc-table-row-striped-bg', 'var(--nc-gray-100)');
      document.documentElement.style.setProperty('--nc-table-row-hover-bg', 'var(--nc-gray-200)');

      // toasts
      document.documentElement.style.setProperty('--nc-toast-bg', 'var(--nc-white)');
      document.documentElement.style.setProperty('--nc-toast-text', 'var(--nc-gray-700)');
      document.documentElement.style.setProperty('--nc-toast-border', 'var(--nc-gray-300)');
      document.documentElement.style.setProperty('--nc-toast-shadow', '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)');
      document.documentElement.style.setProperty('--nc-toast-error-bg', 'var(--nc-red-900)');
      document.documentElement.style.setProperty('--nc-toast-error-text', 'var(--nc-white)');
      document.documentElement.style.setProperty('--nc-toast-error-border', 'var(--nc-black-800)');

      //navs
      document.documentElement.style.setProperty('--nc-nav-bg', 'var(--nc-gray-200)');
      document.documentElement.style.setProperty('--nc-nav-text', 'var(--nc-gray-700)');
      document.documentElement.style.setProperty('--nc-nav-text-hover', 'var(--nc-gray-900)');
      document.documentElement.style.setProperty('--nc-nav-option-hover-bg', 'var(--nc-gray-100)');
      document.documentElement.style.setProperty('--nc-nav-border', 'var(--nc-gray-300)');
    }
  }

  return { theme, toggleTheme, setTheme, getTheme };

}