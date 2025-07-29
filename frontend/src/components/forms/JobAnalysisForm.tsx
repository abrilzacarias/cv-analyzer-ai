import { Target, Sparkles, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';


interface JobAnalysisFormProps {
  jobDescription: string;
  onJobDescriptionChange: (value: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  uploadedFile: File | null;
}

export function JobAnalysisForm({
  jobDescription,
  onJobDescriptionChange,
  onAnalyze,
  isAnalyzing,
  uploadedFile,
}: JobAnalysisFormProps) {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="w-5 h-5" />
          {t('job_description_label')}
        </CardTitle>
        <CardDescription>{t('job_description_placeholder')}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="job-description">{t('job_description_label')}</Label>
          <Textarea
            id="job-description"
            placeholder={t('job_description_placeholder')}
            value={jobDescription}
            onChange={(e) => onJobDescriptionChange(e.target.value)}
            rows={6}
            className="mt-1"
          />
        </div>
        <Button
          onClick={onAnalyze}
          disabled={!uploadedFile || !jobDescription || isAnalyzing}
          className="w-full bg-primary hover:cursor-pointer"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t('analyzing_text')}
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              {t('analyze_button')}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
