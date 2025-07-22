import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface AnalysisProgressProps {
  progress: number
}

export function AnalysisProgress({ progress }: AnalysisProgressProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Analizando tu CV...</CardTitle>
        <CardDescription>Nuestro AI está procesando tu información</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progress} className="mb-2" />
        <p className="text-sm text-muted-foreground">{progress}% completado</p>
      </CardContent>
    </Card>
  )
}
