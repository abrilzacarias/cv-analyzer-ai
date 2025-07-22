import { AnalysisProgress } from "@/components/results/AnalysisProgress"
import { AnalysisResults } from "@/components/results/AnalysisResults"
import { TranslationResults } from "@/components/results/TranslationResult"
import { EmptyState } from "@/components/results/EmptyState"

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
}: ResultsSectionProps) {
  return (
    <div className="space-y-6">
      {/* Analysis Progress */}
      {isAnalyzing && <AnalysisProgress progress={progress} />}

      {/* Analysis Results */}
      {analysisComplete && activeTab === "analyze" && <AnalysisResults onNewAnalysis={onNewAnalysis} />}

      {/* Translation Results */}
      {translationComplete && activeTab === "translate" && (
        <TranslationResults targetLanguage={targetLanguage} onNewTranslation={onNewTranslation} />
      )}

      {/* Empty State */}
      {!isAnalyzing && !analysisComplete && !isTranslating && !translationComplete && <EmptyState />}
    </div>
  )
}
