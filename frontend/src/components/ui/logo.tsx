import { Sparkles } from "lucide-react"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <Sparkles className="w-5 h-5 text-white" />
      </div>
      <h1 className="text-xl font-bold text-accent-foreground">CV Analyzer AI</h1>
    </div>
  )
}
