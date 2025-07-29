import type React from "react"
import { useState, useEffect } from "react"
import { Header } from "@/components/layout/Header"
import { MainContent } from "@/components/layout/MainContent"
import { Footer } from "@/components/layout/Footer"
import { useTranslation } from 'react-i18next';
import type { AnalysisResult } from "@/components/results/AnalysisResult"

const API_URL = import.meta.env.VITE_API_URL

function CVAnalyzer() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [jobDescription, setJobDescription] = useState("")
  const [targetLanguage, setTargetLanguage] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null)
  const [translationResult, setTranslationResult] = useState<string | null>(null)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("analyze")
  const { i18n } = useTranslation();

  const GENERIC_ERROR_MESSAGE = "Ocurrió un error. Por favor, inténtalo de nuevo más tarde."

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isAnalyzing && analysisProgress < 90) {
      timer = setTimeout(() => {
        setAnalysisProgress(prev => prev + 10)
      }, 500)
    }
    return () => {
      clearTimeout(timer)
    }
  }, [isAnalyzing, analysisProgress])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const allowedTypes = ["application/pdf", "text/plain", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    if (!allowedTypes.includes(file.type)) {
      setError(GENERIC_ERROR_MESSAGE)
      setUploadedFile(null)
      return
    }

    setUploadedFile(file)
    setAnalysisResult(null)
    setTranslationResult(null)
    setError(null)
  }

  const handleAnalyze = async () => {
    if (!uploadedFile || !jobDescription) return

    setIsAnalyzing(true)
    setAnalysisProgress(0)
    setAnalysisResult(null)
    setError(null)

    const formData = new FormData()
    formData.append("file", uploadedFile)
    formData.append("jobDescription", jobDescription)

    try {
      const res = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: {
          'Accept-Language': i18n.language,
        },
        body: formData,
      })
      
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`)
      }

      const result = await res.json()
      setAnalysisResult(result)
    } catch (error) {
      console.error("Error en análisis:", error)
      setError(GENERIC_ERROR_MESSAGE)
    } finally {
      setAnalysisProgress(100)
      setTimeout(() => {
        setIsAnalyzing(false)
      }, 1000)
    }
  }

  const handleTranslate = async () => {
    if (!uploadedFile || !targetLanguage) return

    setIsTranslating(true)
    setTranslationResult(null)
    setError(null)

    const formData = new FormData()
    formData.append("file", uploadedFile)
    formData.append("target_language", targetLanguage)

    try {
      const res = await fetch(`${API_URL}/translate/`, {
        method: "POST",
        body: formData,
      })
      
      if (!res.ok) {
        throw new Error(`Error: ${res.statusText}`)
      }

      const result = await res.json()
      setTranslationResult(result.translated_text)
    } catch (error) {
      console.error("Error en traducción:", error)
      setError(GENERIC_ERROR_MESSAGE)
    } finally {
      setIsTranslating(false)
    }
  }

  const handleNewAnalysis = () => {
    setAnalysisResult(null)
    setJobDescription("")
    setAnalysisProgress(0)
    setError(null)
  }

  const handleNewTranslation = () => {
    setTranslationResult(null)
    setTargetLanguage("")
    setError(null)
  }

  const analysisComplete = analysisResult !== null
  const translationComplete = translationResult !== null

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
        progress={analysisProgress}
        onNewAnalysis={handleNewAnalysis}
        onNewTranslation={handleNewTranslation}
        analysisResult={analysisResult}
        translationResult={translationResult}
        error={error}
      />

      <Footer />
    </div>
  )
}

export default CVAnalyzer