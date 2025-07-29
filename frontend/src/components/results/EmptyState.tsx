import { Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "react-i18next"

export function EmptyState() {
  const { t } = useTranslation()

  return (
    <Card className="border-dashed">
      <CardContent className="pt-6">
        <div className="text-center text-muted-foreground">
          <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>{t("empty_state_title")}</p>
          <p className="text-sm mt-1">{t("empty_state_description")}</p>
        </div>
      </CardContent>
    </Card>
  )
}
