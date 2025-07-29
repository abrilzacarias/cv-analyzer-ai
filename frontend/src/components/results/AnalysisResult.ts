export type AnalysisResult = {
  matchScore: number
  summary: string
  strengths: string[]
  improvements: string[]
  suggestions: {
    skills: string[]
    experience: string[]
    format: string[]
  }
}
