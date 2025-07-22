import { Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"

interface AnalysisResultsProps {
  onNewAnalysis: () => void
}

export function AnalysisResults({ onNewAnalysis }: AnalysisResultsProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-green-600">¡Análisis Completado!</CardTitle>
          <CardDescription>Aquí tienes las sugerencias para mejorar tu CV</CardDescription>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sugerencias de Mejora</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
              <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                Habilidades
              </Badge>
              <p className="text-sm text-foreground">
                Agrega "React Hooks" y "TypeScript" a tu sección de habilidades técnicas para mejor alineación con el
                puesto.
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-950/30 rounded-lg">
              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                Experiencia
              </Badge>
              <p className="text-sm text-foreground">
                Cuantifica tus logros: "Mejoré el rendimiento de la aplicación en un 40%" es más impactante que "Mejoré
                el rendimiento".
              </p>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg">
              <Badge
                variant="secondary"
                className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
              >
                Formato
              </Badge>
              <p className="text-sm text-foreground">
                Considera usar viñetas más concisas en la descripción de tus responsabilidades laborales.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compatibilidad con el Puesto</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Compatibilidad General</span>
              <span className="text-2xl font-bold text-green-600">85%</span>
            </div>
            <Progress value={85} className="h-2" />

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-green-600 mb-1">Fortalezas</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Experiencia en React</li>
                  <li>• Conocimiento de Git</li>
                  <li>• Trabajo en equipo</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-orange-600 mb-1">A mejorar</p>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Certificaciones</li>
                  <li>• Proyectos personales</li>
                  <li>• Idiomas</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button variant="outline" className="flex-1 bg-transparent">
          <Download className="w-4 h-4 mr-2" />
          Descargar Reporte
        </Button>
        <Button className="flex-1 bg-blue-600 hover:bg-blue-700" onClick={onNewAnalysis}>
          Nuevo Análisis
        </Button>
      </div>
    </>
  )
}
