import type React from "react";
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { MainContent } from "@/components/layout/MainContent";
import { Footer } from "@/components/layout/Footer";
import { useTranslation } from 'react-i18next';
import type { AnalysisResult } from "@/components/results/AnalysisResult";
import { toast } from "sonner";
import { CVEditFormModal } from "../forms/CVEditFormModal";

const API_URL = import.meta.env.VITE_API_URL;

// This type should be kept in sync with the backend Pydantic model
interface CVData {
  name?: string;
  title?: string;
  contact?: {
    location?: string;
    phone?: string;
    email?: string;
    linkedin?: string;
    github?: string;
  };
  summary?: string;
  experience?: Array<{
    title?: string;
    company?: string;
    dates?: string;
    description?: string[];
  }>;
  education?: Array<{
    degree?: string;
    institution?: string;
    dates?: string;
    description?: string[];
  }>;
  skills?: string[];
  languages?: string[];
}

function CVAnalyzer() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [targetLanguage, setTargetLanguage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [translationPreviewUrl, setTranslationPreviewUrl] = useState<string | null>(null);
  const [editableCvData, setEditableCvData] = useState<CVData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("analyze");
  const { i18n, t } = useTranslation();

  const GENERIC_ERROR_MESSAGE = "An unexpected error occurred. Please try again later.";

  const handleNewAnalysis = () => {
    setAnalysisResult(null)
    setJobDescription("")
    setAnalysisProgress(0)
    setError(null)
  }

  useEffect(() => {
    return () => {
      if (translationPreviewUrl) {
        window.URL.revokeObjectURL(translationPreviewUrl);
      }
    };
  }, [translationPreviewUrl]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setAnalysisResult(null);
    setTranslationPreviewUrl(null);
    setEditableCvData(null);
    setError(null);
  };

  const handleTranslate = async () => {
    if (!uploadedFile || !targetLanguage) return;
    setIsTranslating(true);
    setTranslationPreviewUrl(null);
    setEditableCvData(null);
    setError(null);
    // Reset analysis state
    setAnalysisResult(null);
    setAnalysisProgress(0);

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("targetLanguage", targetLanguage);

    try {
      const res = await fetch(`${API_URL}/translate`, { method: "POST", body: formData });
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.detail || `Error: ${res.statusText}`);
      }
      const result = await res.json();
      setEditableCvData(result.cv_data);
      const blob = await fetch(`data:application/pdf;base64,${result.pdf_data}`).then(res => res.blob());
      setTranslationPreviewUrl(URL.createObjectURL(blob));
    } catch (error: any) {
      setError(error.message || GENERIC_ERROR_MESSAGE);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile || !jobDescription) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);
    setAnalysisResult(null);
    setError(null);
    // Reset translation state
    setTranslationPreviewUrl(null);
    setEditableCvData(null);

    // Simulate progress smoothly
    const interval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 10;
      });
    }, 600);

    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("jobDescription", jobDescription);

    try {
      const res = await fetch(`${API_URL}/analyze`, {
        method: "POST",
        headers: {
          'Accept-Language': i18n.language,
        },
        body: formData,
      });
      
      clearInterval(interval); // Stop simulating when fetch is done

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ detail: `Error: ${res.statusText}` }));
        throw new Error(errorData.detail);
      }

      const result = await res.json();
      setAnalysisResult(result);
      setAnalysisProgress(100); // Mark as complete
    } catch (error: any) {
      console.error("Error en análisis:", error);
      setError(error.message || GENERIC_ERROR_MESSAGE);
      setAnalysisProgress(0); // Reset on error
    } finally {
      // Delay hiding the progress bar to show 100%
      setTimeout(() => {
        setIsAnalyzing(false);
      }, 1000);
    }
  };

  const handleRegeneratePdf = async (updatedData: CVData) => {
    if (!targetLanguage) return;
    setIsRegenerating(true);
    setError(null);

    const transformedData = {
      ...updatedData,
      // Ensure skills and languages are arrays of strings
      skills: Array.isArray(updatedData.skills) ? updatedData.skills : (updatedData.skills as unknown as string || '').split('\n').map(s => s.trim()).filter(Boolean),
      languages: Array.isArray(updatedData.languages) ? updatedData.languages : (updatedData.languages as unknown as string || '').split('\n').map(s => s.trim()).filter(Boolean),
      
      // Ensure experience and education descriptions are arrays of strings
      experience: updatedData.experience?.map(exp => ({
        ...exp,
        description: Array.isArray(exp.description) ? exp.description : (exp.description as unknown as string || '').split('\n').map(s => s.trim()).filter(Boolean),
      })),
      education: updatedData.education?.map(edu => ({
        ...edu,
        description: Array.isArray(edu.description) ? edu.description : (edu.description as unknown as string || '').split('\n').map(s => s.trim()).filter(Boolean),
      })),
    };

    try {
      const res = await fetch(`${API_URL}/regenerate-pdf`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cv_data: transformedData, target_language: targetLanguage }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.detail || `Error: ${res.statusText}`);
      }
      const blob = await res.blob();
      if (translationPreviewUrl) {
        window.URL.revokeObjectURL(translationPreviewUrl);
      }
      setTranslationPreviewUrl(URL.createObjectURL(blob));
      setEditableCvData(updatedData); 
      setIsEditing(false);
      toast.success(t("common.success.generic"))
    } catch (error: any) {
      setError(error.message || GENERIC_ERROR_MESSAGE);
    } finally {
      setIsRegenerating(false);
    }
  };
  
  const handleNewTranslation = () => {
    setTranslationPreviewUrl(null);
    setEditableCvData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MainContent
        uploadedFile={uploadedFile}
        onFileUpload={handleFileUpload}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        jobDescription={jobDescription}
        onJobDescriptionChange={setJobDescription}
        targetLanguage={targetLanguage}
        onTargetLanguageChange={setTargetLanguage}
        onAnalyze={handleAnalyze}
        onTranslate={handleTranslate}
        isAnalyzing={isAnalyzing}
        isTranslating={isTranslating}
        analysisComplete={analysisResult !== null}
        translationComplete={translationPreviewUrl !== null}
        progress={analysisProgress}
        onNewAnalysis={handleNewAnalysis}
        onNewTranslation={handleNewTranslation}
        analysisResult={analysisResult}
        translationResult={translationPreviewUrl}
        error={error}
        onEdit={() => setIsEditing(true)}
      />
      <Footer />
      {isEditing && editableCvData && (
        <CVEditFormModal
          isOpen={isEditing}
          onClose={() => setIsEditing(false)}
          cvData={editableCvData}
          targetLanguage={targetLanguage}
          onSubmit={handleRegeneratePdf}
          error={error}
        />

      )}
    </div>
  );
}

export default CVAnalyzer;