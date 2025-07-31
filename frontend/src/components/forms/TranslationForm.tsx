import { Languages, Loader2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"

interface TranslationFormProps {
  targetLanguage: string
  onTargetLanguageChange: (value: string) => void
  onTranslate: () => void
  isTranslating: boolean
  uploadedFile: File | null
}

export function TranslationForm({
  targetLanguage,
  onTargetLanguageChange,
  onTranslate,
  isTranslating,
  uploadedFile,
}: TranslationFormProps) {
  const { t } = useTranslation()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="w-5 h-5" />
          {t("translate_button")}
        </CardTitle>
        <CardDescription>{t("translate_description")}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="target-language">{t("translation_target_language_label")}</Label>
          <Select value={targetLanguage} onValueChange={onTargetLanguageChange}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={t("placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">🇺🇸 English</SelectItem>
                <SelectItem value="es">🇪🇸 Spanish</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={onTranslate}
          disabled={!uploadedFile || !targetLanguage || isTranslating}
          className="w-full bg-primary hover:cursor-pointer"
          size="lg"
        >
          {isTranslating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t("translating_text")}
            </>
          ) : (
            <>
              <Languages className="w-4 h-4 mr-2" />
              {t("translate_tab")}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
