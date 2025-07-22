import { BarChart3, Languages } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JobAnalysisForm } from "@/components/forms/JobAnalysisForm"
import { TranslationForm } from "@/components/forms/TranslationForm"

interface AnalysisSectionProps {
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
  uploadedFile: File | null
}

export function AnalysisSection({
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
  uploadedFile,
}: AnalysisSectionProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="mb-8">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="analyze" className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4" />
          Análisis por Puesto
        </TabsTrigger>
        <TabsTrigger value="translate" className="flex items-center gap-2">
          <Languages className="w-4 h-4" />
          Traducción
        </TabsTrigger>
      </TabsList>

      <TabsContent value="analyze" className="space-y-6">
        <JobAnalysisForm
          jobDescription={jobDescription}
          onJobDescriptionChange={onJobDescriptionChange}
          onAnalyze={onAnalyze}
          isAnalyzing={isAnalyzing}
          uploadedFile={uploadedFile}
        />
      </TabsContent>

      <TabsContent value="translate" className="space-y-6">
        <TranslationForm
          targetLanguage={targetLanguage}
          onTargetLanguageChange={onTargetLanguageChange}
          onTranslate={onTranslate}
          isTranslating={isTranslating}
          uploadedFile={uploadedFile}
        />
      </TabsContent>
    </Tabs>
  )
}
