import CVAnalyzer from "./components/sections/CVAnalyzer"
import { ThemeProvider } from "./theme-provider"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cv-analyzer-theme">
      <CVAnalyzer />
    </ThemeProvider>
  )
}

export default App
