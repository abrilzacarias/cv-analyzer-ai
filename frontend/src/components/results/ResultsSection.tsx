import { AnalysisProgress } from "@/components/results/AnalysisProgress"
import { AnalysisResults } from "@/components/results/AnalysisResults"
import { TranslationResults } from "@/components/results/TranslationResult"
import { EmptyState } from "@/components/results/EmptyState"
import { ErrorState } from "@/components/results/ErrorState"
import type { AnalysisResult } from "./AnalysisResult"

interface ResultsSectionProps {
  isAnalyzing: boolean
  isTranslating: boolean
  analysisComplete: boolean
  translationComplete: boolean
  progress: number
  activeTab: string
  targetLanguage: string
  onNewAnalysis: () => void
  onNewTranslation: () => void
  analysisResult: AnalysisResult | null
  translationResult: string | null
  error: string | null
}

export function ResultsSection({
  isAnalyzing,
  isTranslating,
  analysisComplete,
  translationComplete,
  progress,
  activeTab,
  targetLanguage,
  onNewAnalysis,
  onNewTranslation,
  analysisResult,
  translationResult,
  error,
}: ResultsSectionProps) {
  const showEmptyState = !isAnalyzing && !analysisComplete && !isTranslating && !translationComplete && !error;

  return (
    <div className="space-y-6 mt-8">
      {/* Error State */}
      {error && <ErrorState />}

      {/* Analysis Progress */}
      {isAnalyzing && !error && <AnalysisProgress progress={progress} />}

      {/* Analysis Results */}
      {analysisComplete && analysisResult && !error && (
        <AnalysisResults onNewAnalysis={onNewAnalysis} analysisResult={analysisResult} />
      )}

      {/* Translation Results */}
      {translationComplete && translationResult && !error && (
        <TranslationResults 
          targetLanguage={targetLanguage} 
          onNewTranslation={onNewTranslation} 
          translationResult={translationResult} 
        />
      )}

      {/* Empty State */}
      {showEmptyState && <EmptyState />}
    </div>
  )
}
