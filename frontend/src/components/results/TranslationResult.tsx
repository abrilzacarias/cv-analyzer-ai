import { CheckCircle, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface TranslationResultsProps {
  targetLanguage: string
  onNewTranslation: () => void
  translationResult: string | null
}

const getLanguageName = (code: string): string => {
  const languages: Record<string, string> = {
    en: "inglés",
    fr: "francés",
    de: "alemán",
    it: "italiano",
    pt: "portugués",
    zh: "chino",
    ja: "japonés",
    ko: "coreano",
  }
  return languages[code] || "idioma seleccionado"
}

const getTranslationPreview = (code: string): string => {
  const previews: Record<string, string> = {
    en: "Software Developer with 5+ years of experience in web development...",
    fr: "Développeur logiciel avec plus de 5 ans d'expérience en développement web...",
    de: "Software-Entwickler mit über 5 Jahren Erfahrung in der Webentwicklung...",
    it: "Sviluppatore software con oltre 5 anni di esperienza nello sviluppo web...",
    pt: "Desenvolvedor de software com mais de 5 anos de experiência em desenvolvimento web...",
    zh: "拥有5年以上网络开发经验的软件开发人员...",
    ja: "ウェブ開発で5年以上の経験を持つソフトウェア開発者...",
    ko: "웹 개발 분야에서 5년 이상의 경험을 가진 소프트웨어 개발자...",
  }
  return previews[code] || "Traducción completada..."
}

export function TranslationResults({ targetLanguage, onNewTranslation, translationResult }: TranslationResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-600 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          ¡Traducción Completada!
        </CardTitle>
        <CardDescription>
          Tu CV ha sido traducido al {getLanguageName(targetLanguage)} manteniendo el formato profesional
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Vista previa de la traducción:</h4>
          <p className="text-sm text-muted-foreground">{translationResult}</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="flex-1 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Descargar CV Traducido
          </Button>
          <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={onNewTranslation}>
            Nueva Traducción
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
