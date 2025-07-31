import { AnalysisProgress } from "@/components/results/AnalysisProgress"
import { AnalysisResults } from "@/components/results/AnalysisResults"
import { TranslationResults } from "@/components/results/TranslationResult"
import { EmptyState } from "@/components/results/EmptyState"
import { ErrorState } from "@/components/results/ErrorState"
import type { AnalysisResult } from "./AnalysisResult"

interface ResultsSectionProps {
  isAnalyzing: boolean;
  isTranslating: boolean;
  analysisComplete: boolean;
  translationComplete: boolean;
  progress: number;
  activeTab: string;
  targetLanguage: string;
  onNewAnalysis: () => void;
  onNewTranslation: () => void;
  analysisResult: AnalysisResult | null;
  translationResult: string | null;
  error: string | null;
  uploadedFile: File | null;
  onEdit: () => void;
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
  uploadedFile,
  onEdit,
}: ResultsSectionProps) {
  const showEmptyState = !isAnalyzing && !analysisComplete && !isTranslating && !translationComplete && !error;

  const originalFileName = uploadedFile?.name.split('.').slice(0, -1).join('.') || 'cv';
  const translatedFileName = `${originalFileName}_${targetLanguage}.pdf`;

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
          previewUrl={translationResult}
          fileName={translatedFileName}
          onEdit={onEdit}
        />
      )}

      {/* Empty State */}
      {showEmptyState && <EmptyState />}
    </div>
  );
}
