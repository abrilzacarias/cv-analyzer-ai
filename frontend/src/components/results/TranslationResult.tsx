import { CheckCircle, Download, Pencil } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface TranslationResultsProps {
  targetLanguage: string;
  onNewTranslation: () => void;
  previewUrl: string | null;
  fileName: string;
  onEdit: () => void;
}

const languageMap: { [key: string]: string } = {
  en: "English",
  es: "Spanish",
};

export function TranslationResults({
  targetLanguage,
  onNewTranslation,
  previewUrl,
  fileName,
  onEdit,
}: TranslationResultsProps) {
  const { t } = useTranslation();

  if (!previewUrl) return null;

  const languageName = languageMap[targetLanguage] || targetLanguage;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-green-600 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {t("translation_complete_title")}
        </CardTitle>
        <CardDescription>
          {t("translation_complete_description", { language: languageName })}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-lg overflow-hidden">
          <iframe
            src={previewUrl}
            title={t("translation_preview_aria")}
            className="w-full h-[600px]"
            aria-label={t("translation_preview_aria")}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild className="flex-1">
            <a href={previewUrl} download={fileName}>
              <Download className="w-4 h-4 mr-2" />
              {t("download_translated_cv")}
            </a>
          </Button>
           <Button
            variant="outline"
            className="flex-1 hover:cursor-pointer"
            onClick={onEdit}
          >
            <Pencil className="w-4 h-4 mr-2" />
            {t("edit_translated_cv")}
          </Button>
          <Button
            variant="outline"
            className="flex-1 hover:cursor-pointer"
            onClick={onNewTranslation}
          >
            {t("new_translation")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
