import { useTranslation } from "react-i18next"
import { Sparkles } from "lucide-react"

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <div className="relative text-center py-12">
      <div className="absolute top-6 right-8 opacity-10">
        <Sparkles className="w-6 h-6 text-primary" />
      </div>

      <div className="relative z-10 px-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          <span className="bg-gradient-to-r from-foreground via-primary/80 to-foreground bg-clip-text text-transparent">
            {t("hero_title")}
          </span>
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          {t("hero_subtitle")}
        </p>

        <div className="mt-6 flex justify-center">
          <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
        </div>
      </div>
    </div>
  )
}
