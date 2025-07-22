import { Languages } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

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
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="w-5 h-5" />
          Traducir CV
        </CardTitle>
        <CardDescription>Traduce tu CV a otro idioma manteniendo el formato profesional</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="target-language">Idioma de destino</Label>
          <Select value={targetLanguage} onValueChange={onTargetLanguageChange}>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Selecciona un idioma" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">🇺🇸 Inglés</SelectItem>
              <SelectItem value="fr">🇫🇷 Francés</SelectItem>
              <SelectItem value="de">🇩🇪 Alemán</SelectItem>
              <SelectItem value="it">🇮🇹 Italiano</SelectItem>
              <SelectItem value="pt">🇧🇷 Portugués</SelectItem>
              <SelectItem value="zh">🇨🇳 Chino</SelectItem>
              <SelectItem value="ja">🇯🇵 Japonés</SelectItem>
              <SelectItem value="ko">🇰🇷 Coreano</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={onTranslate}
          disabled={!uploadedFile || !targetLanguage || isTranslating}
          className="w-full bg-green-600 hover:bg-green-700"
          size="lg"
        >
          {isTranslating ? (
            <>
              <Languages className="w-4 h-4 mr-2 animate-spin" />
              Traduciendo...
            </>
          ) : (
            <>
              <Languages className="w-4 h-4 mr-2" />
              Traducir CV
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
