import CVAnalyzer from "./components/sections/CVAnalyzer";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="cv-analyzer-theme">
      <CVAnalyzer />
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}

export default App;
