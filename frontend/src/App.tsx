import type React from "react"
import { useState } from "react"
import { ThemeProvider } from "./theme-provider"
import { Header } from "./components/layout/Header"
import { MainContent } from "./components/layout/MainContent"
import { Footer } from "./components/layout/Footer"

function CVAnalyzer() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [targetLanguage, setTargetLanguage] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [translationComplete, setTranslationComplete] = useState(false)
  const [progress, setProgress] = useState(0)
  const [activeTab, setActiveTab] = useState("analyze")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleAnalyze = async () => {
    if (!uploadedFile || !jobDescription) return

    setIsAnalyzing(true)
    setProgress(0)
    setAnalysisComplete(false)

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsAnalyzing(false)
          setAnalysisComplete(true)
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const handleTranslate = async () => {
    if (!uploadedFile || !targetLanguage) return

    setIsTranslating(true)
    setTranslationComplete(false)

    setTimeout(() => {
      setIsTranslating(false)
      setTranslationComplete(true)
    }, 2000)
  }

  const handleNewAnalysis = () => {
    setAnalysisComplete(false)
    setJobDescription("")
  }

  const handleNewTranslation = () => {
    setTranslationComplete(false)
    setTargetLanguage("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <MainContent
        uploadedFile={uploadedFile}
        onFileUpload={handleFileUpload}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        jobDescription={jobDescription}
        onJobDescriptionChange={setJobDescription}
        targetLanguage={targetLanguage}
        onTargetLanguageChange={setTargetLanguage}
        onAnalyze={handleAnalyze}
        onTranslate={handleTranslate}
        isAnalyzing={isAnalyzing}
        isTranslating={isTranslating}
        analysisComplete={analysisComplete}
        translationComplete={translationComplete}
        progress={progress}
        onNewAnalysis={handleNewAnalysis}
        onNewTranslation={handleNewTranslation}
      />

      <Footer />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="cv-analyzer-theme">
      <CVAnalyzer />
    </ThemeProvider>
  )
}

export default App
