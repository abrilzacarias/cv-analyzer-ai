import { Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function EmptyState() {
  return (
    <Card className="border-dashed">
      <CardContent className="pt-6">
        <div className="text-center text-muted-foreground">
          <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Los resultados aparecerán aquí</p>
          <p className="text-sm mt-1">Sube tu CV y selecciona una opción para comenzar</p>
        </div>
      </CardContent>
    </Card>
  )
}
