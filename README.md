# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## VirtualizedTable Component

This project includes a custom VirtualizedTable component inspired by TanStack Virtual. It efficiently renders large datasets by only displaying visible rows.

### Known Limitations

**Zoom-Related Visual Gaps**: When using browser zoom (< 100%), you may notice small visual gaps above rows where borders and striped backgrounds don't extend all the way to the previous row. This is an **accepted tradeoff** of the virtualization approach:

- **Why it happens**: Row heights are measured once at initial render (typically 100% zoom). When you zoom out (e.g., 50% zoom), the actual content shrinks but the measured heights remain fixed, creating gaps above each row.

- **Why we accept it**: The alternative solutions (dynamic remeasurement, fixed heights, CSS tricks) all introduce worse problems:
  - Remeasuring on zoom causes visual chaos and performance issues
  - Fixed heights create excessive padding and break dynamic content
  - CSS tricks (box-shadow, filler divs) obscure content or fail at different zoom levels

- **Recommendation**: Use the table at 100% zoom for best visual fidelity. The gaps are purely cosmetic and don't affect functionality.

### Features That Work Perfectly ✅
- Native scrolling to any row (tested: row 100) at **all zoom levels** (50%-150%)
- All navigation methods: mousewheel, keyboard arrows, Page Up/Down, Home/End
- Drag-to-scroll with momentum
- Column reordering and visibility toggle
- Proper padding that scales with zoom
- Striped rows, borders, and hover effects (with minor gaps at zoom-out)

---

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
