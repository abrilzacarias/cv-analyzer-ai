import { Target, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

interface JobAnalysisFormProps {
  jobDescription: string
  onJobDescriptionChange: (value: string) => void
  onAnalyze: () => void
  isAnalyzing: boolean
  uploadedFile: File | null
}

export function JobAnalysisForm({
  jobDescription,
  onJobDescriptionChange,
  onAnalyze,
  isAnalyzing,
  uploadedFile,
}: JobAnalysisFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          Puesto Objetivo
        </CardTitle>
        <CardDescription>Describe el trabajo al que quieres aplicar</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="job-title">Título del puesto</Label>
          <Input id="job-title" placeholder="ej. Desarrollador Frontend Senior" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="job-description">Descripción del trabajo</Label>
          <Textarea
            id="job-description"
            placeholder="Pega aquí la descripción del trabajo o menciona las habilidades clave requeridas..."
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            rows={4}
            className="mt-1"
          />
        </div>
        <Button
          onClick={onAnalyze}
          disabled={!uploadedFile || !jobDescription || isAnalyzing}
          className="w-full bg-blue-600 hover:bg-blue-700"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              Analizando...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Analizar CV
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}
