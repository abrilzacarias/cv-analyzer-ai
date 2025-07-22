import { Sparkles, Target, Languages } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function FeaturesSection() {
  return (
    <div className="mt-16 grid md:grid-cols-3 gap-6">
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold mb-2">Análisis Inteligente</h3>
          <p className="text-sm text-muted-foreground">
            IA avanzada analiza tu CV y proporciona sugerencias personalizadas
          </p>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Target className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="font-semibold mb-2">Optimización Específica</h3>
          <p className="text-sm text-muted-foreground">
            Adapta tu CV para puestos específicos y mejora tus posibilidades
          </p>
        </CardContent>
      </Card>

      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Languages className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold mb-2">Traducción Automática</h3>
          <p className="text-sm text-muted-foreground">
            Traduce tu CV a múltiples idiomas manteniendo el contexto profesional
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
