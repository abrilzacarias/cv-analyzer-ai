import { useTranslation } from "react-i18next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain } from "lucide-react"

interface AnalysisProgressProps {
  progress: number
}

export function AnalysisProgress({ progress }: AnalysisProgressProps) {
  const { t } = useTranslation()

  const getProgressMessage = (progress: number) => {
    if (progress < 25) return t("progress_starting")
    if (progress < 50) return t("progress_extracting")
    if (progress < 75) return t("progress_analyzing")
    if (progress < 95) return t("progress_generating")
    return t("progress_finishing")
  }

  return (
    <Card className="border shadow-sm bg-gradient-to-br from-primary/5 via-background to-primary/3 animate-progress-entrance">
      <CardHeader className="pb-4">
        <CardTitle className="text-foreground flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-primary/8 flex items-center justify-center border border-primary/25 shadow-sm animate-progress-pulse">
            <Brain className="w-6 h-6 text-primary animate-progress-brain" />
          </div>
          <div>
            <h3 className="text-xl font-semibold">{t("progress_analyzing_cv")}</h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-primary/50 to-transparent mt-1 animate-progress-line"></div>
          </div>
        </CardTitle>
        <CardDescription className="text-muted-foreground ml-15 animate-progress-fade-in">
          {t("progress_processing")}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 animate-progress-message">
          <p className="text-sm font-medium text-foreground">{getProgressMessage(progress)}</p>
        </div>

        <div className="space-y-3">
          <Progress value={progress} className="h-3 animate-progress-bar" />

          {/* Información del progreso */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground animate-progress-text">{progress}{t("progress_completed")}</p>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-primary animate-progress-dot-1"></div>
              <div className="w-2 h-2 rounded-full bg-primary/60 animate-progress-dot-2"></div>
              <div className="w-2 h-2 rounded-full bg-primary/30 animate-progress-dot-3"></div>
            </div>
          </div>
        </div>

        {/* Línea decorativa */}
        <div className="flex justify-center pt-2">
          <div className="w-56 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-progress-decoration"></div>
        </div>
      </CardContent>
    </Card>
  )
}
