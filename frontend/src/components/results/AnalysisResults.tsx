import { SuggestionCard } from "./SuggestionCard";
import { useTranslation } from "react-i18next";
import {
  CheckCircle,
  AlertTriangle,
  Star,
  FileText,
  Award,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import type { AnalysisResult } from "./AnalysisResult";

interface AnalysisResultsProps {
  onNewAnalysis: () => void;
  analysisResult: AnalysisResult;
}

export function AnalysisResults({
  onNewAnalysis,
  analysisResult,
}: AnalysisResultsProps) {
  const { t } = useTranslation();
  const { matchScore, summary, strengths, improvements, suggestions } =
    analysisResult;

  return (
    <div className="space-y-6">
      {/* Resultado Principal */}
      <Card className="border shadow-sm   bg-gradient-to-br from-primary/5 via-background to-primary/3">
        <CardHeader className="pb-4">
          <CardTitle className="text-foreground flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center border border-primary/20">
              <CheckCircle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">
                {t("analysis_completed")}
              </h3>
              <div className="w-12 h-0.5 bg-gradient-to-r from-primary/50 to-transparent mt-1"></div>
            </div>
          </CardTitle>
          <CardDescription className="text-muted-foreground ml-15">
            {t("analysis_breakdown")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-lg font-medium text-foreground">
              {t("general_compatibility")}
            </span>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="text-3xl font-bold text-primary">
                {matchScore}%
              </span>
            </div>
          </div>
          <Progress value={matchScore} className="h-3" />
          <div className="flex justify-center pt-2">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
          </div>
        </CardContent>
      </Card>

      {/* Resumen */}
      <Card className="border shadow-sm  ">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-foreground">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center border border-accent/20">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <span>{t("custom_summary")}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
            <p className="text-sm text-foreground leading-relaxed">{summary}</p>
          </div>
        </CardContent>
      </Card>

      {/* Fortalezas y Mejoras */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border border-green-500/20 bg-gradient-to-br from-green-50/50 via-background to-green-50/30 dark:from-green-950/20 dark:via-background dark:to-green-950/10   shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5 flex items-center justify-center border border-green-500/20">
                <Star className="w-5 h-5 text-green-500 dark:text-green-400" />
              </div>
              <span>{t("your_strengths")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {strengths.map((strength, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {strength}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-amber-500/20 bg-gradient-to-br from-amber-50/50 via-background to-amber-50/30 dark:from-amber-950/20 dark:via-background dark:to-amber-950/10   shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-foreground flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/5 flex items-center justify-center border border-amber-500/20">
                <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400" />
              </div>
              <span>{t("improvements")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {improvements.map((improvement, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/5 border border-amber-500/10"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-foreground leading-relaxed">
                    {improvement}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sugerencias */}
      <div className="space-y-6">
        <SuggestionCard
          icon={<Award className="w-6 h-6 text-chart-3" />}
          title={t("skill_suggestions")}
          suggestions={suggestions.skills}
          emptyStateText={t("no_skill_suggestions")}
        />
        <SuggestionCard
          icon={<Award className="w-6 h-6 text-chart-4" />}
          title={t("experience_suggestions")}
          suggestions={suggestions.experience}
          emptyStateText={t("no_experience_suggestions")}
        />
        <SuggestionCard
          icon={<Award className="w-6 h-6 text-chart-5" />}
          title={t("format_suggestions")}
          suggestions={suggestions.format}
          emptyStateText={t("no_format_suggestions")}
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          className="flex-1 bg-transparent border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 hover:cursor-pointer"
          onClick={onNewAnalysis}
        >
          {t("analyze_another_cv")}
        </Button>
      </div>
    </div>
  );
}
