import { Sparkles, Target, Languages } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation } from "react-i18next"

export function FeaturesSection() {
  const { t } = useTranslation()

  return (
    <div className="mb-12">
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="group hover-lift text-center border shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="pt-6 pb-6">
            <div className="relative mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mx-auto group-hover:from-primary/15 group-hover:to-primary/8 transition-all duration-300">
                <Sparkles className="w-7 h-7 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <h3 className="font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
              {t("feature1_title")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("feature1_description")}</p>
          </CardContent>
        </Card>

        <Card className="group hover-lift text-center border shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="pt-6 pb-6">
            <div className="relative mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl flex items-center justify-center mx-auto group-hover:from-accent/15 group-hover:to-accent/8 transition-all duration-300">
                <Target className="w-7 h-7 text-accent group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <h3 className="font-semibold mb-3 text-foreground group-hover:text-accent transition-colors duration-300">
              {t("feature2_title")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("feature2_description")}</p>
          </CardContent>
        </Card>

        <Card className="group hover-lift text-center border shadow-sm hover:shadow-md transition-all duration-300">
          <CardContent className="pt-6 pb-6">
            <div className="relative mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-xl flex items-center justify-center mx-auto group-hover:from-secondary/15 group-hover:to-secondary/8 transition-all duration-300">
                <Languages className="w-7 h-7 text-secondary group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <h3 className="font-semibold mb-3 text-foreground group-hover:text-secondary transition-colors duration-300">
              {t("feature3_title")}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("feature3_description")}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
