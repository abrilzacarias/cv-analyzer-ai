import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"

// Script para mostrar el tema actual
setTimeout(() => {
  const updateThemeIndicator = () => {
    const themeElement = document.getElementById("current-theme")
    const isDark = document.documentElement.classList.contains("dark")
    if (themeElement) {
      themeElement.textContent = isDark ? "🌙 Oscuro" : "☀️ Claro"
    }
  }

  // Observar cambios en las clases del HTML
  const observer = new MutationObserver(updateThemeIndicator)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  })

  updateThemeIndicator()
}, 1000)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
