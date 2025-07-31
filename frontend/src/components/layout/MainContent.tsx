import type React from "react"
import { HeroSection } from "@/components/sections/HeroSection"
import { FileUpload } from "@/components/forms/UploadFile"
import { AnalysisSection } from "@/components/sections/AnalysisSection"
import { ResultsSection } from "@/components/results/ResultsSection"
import { FeaturesSection } from "@/components/sections/FeaturesSection"
import { AnalysisResult } from "@/components/results/AnalysisResult"

interface MainContentProps {
  uploadedFile: File | null
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  activeTab: string
  onTabChange: (value: string) => void
  jobDescription: string
  onJobDescriptionChange: (value: string) => void
  targetLanguage: string
  onTargetLanguageChange: (value: string) => void
  onAnalyze: () => void
  onTranslate: () => void
  isAnalyzing: boolean
  isTranslating: boolean
  analysisComplete: boolean
  translationComplete: boolean
  progress: number
  onNewAnalysis: () => void
  onNewTranslation: () => void
  analysisResult: AnalysisResult | null
  translationResult: string | null
  error: string | null
  onEdit: () => void
}

export function MainContent({
  uploadedFile,
  onFileUpload,
  activeTab,
  onTabChange,
  jobDescription,
  onJobDescriptionChange,
  targetLanguage,
  onTargetLanguageChange,
  onAnalyze,
  onTranslate,
  isAnalyzing,
  isTranslating,
  analysisComplete,
  translationComplete,
  progress,
  onNewAnalysis,
  onNewTranslation,
  analysisResult,
  translationResult,
  error,
  onEdit
}: MainContentProps) {
  return (
    <main className="container mx-auto px-4 pb-8 max-w-4xl">
      <HeroSection />
      
      <FeaturesSection />

      <FileUpload 
        uploadedFile={uploadedFile} 
        onFileUpload={onFileUpload} 
      />

      <AnalysisSection
        activeTab={activeTab}
        onTabChange={onTabChange}
        jobDescription={jobDescription}
        onJobDescriptionChange={onJobDescriptionChange}
        targetLanguage={targetLanguage}
        onTargetLanguageChange={onTargetLanguageChange}
        onAnalyze={onAnalyze}
        onTranslate={onTranslate}
        isAnalyzing={isAnalyzing}
        isTranslating={isTranslating}
        uploadedFile={uploadedFile}
      />

      <ResultsSection
        isAnalyzing={isAnalyzing}
        isTranslating={isTranslating}
        analysisComplete={analysisComplete}
        translationComplete={translationComplete}
        progress={progress}
        activeTab={activeTab}
        targetLanguage={targetLanguage}
        onNewAnalysis={onNewAnalysis}
        onNewTranslation={onNewTranslation}
        analysisResult={analysisResult}
        translationResult={translationResult}
        error={error}
        onEdit={onEdit}
        uploadedFile={uploadedFile}
      />

    </main>
  )
}
