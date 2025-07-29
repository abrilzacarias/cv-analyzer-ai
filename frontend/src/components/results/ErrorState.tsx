import { useTranslation } from "react-i18next"
import { AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ErrorState() {
  const { t } = useTranslation()

  return (
    <Card className="border border-red-500/20 bg-gradient-to-br from-red-50/50 via-background to-red-50/30 dark:from-red-950/20 dark:via-background dark:to-red-950/10 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-3 text-foreground">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 flex items-center justify-center border border-red-500/20 animate-error-pulse">
            <AlertTriangle className="h-6 w-6 text-red-500 dark:text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{t("error_unexpected")}</h3>
            <div className="w-32 h-0.5 bg-gradient-to-r from-red-500/50 to-transparent mt-1"></div>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/10 animate-error-fade-in">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("error_try_again")}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
