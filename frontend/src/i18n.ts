import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      es: {
        translation: {
          "app_name": "CV Analyzer AI",
          "hero_title": "Analiza tu CV con IA",
          "hero_subtitle": "Obtén sugerencias personalizadas y mejora tu compatibilidad laboral.",
          "analyze_tab": "Analizar CV",
          "translate_tab": "Traducir CV",
          "translating_text": "Traduciendo...",
          "upload_cv_label": "Sube tu CV (PDF)",
          "job_description_label": "Descripción del Puesto",
          "job_description_placeholder": "Ej: Desarrollador Fullstack con React y Node.js",
          "analyze_button": "Analizar CV",
          "analyzing_text": "Analizando...",
          "translation_target_language_label": "Idioma de destino",
          "placeholder": "Selecciona un idioma",
          "translate_button": "Traducir CV",
          "translate_description": "Traduce tu CV a otro idioma manteniendo el formato profesional",
          "results_section_title": "Resultados del Análisis",
          "match_score": "Puntaje de Compatibilidad",
          "summary": "Resumen",
          "suggestions": "Sugerencias de Mejora",
          "skills": "Habilidades",
          "experience": "Experiencia",
          "format": "Formato",
          "strengths": "Fortalezas",
          "improvements": "Áreas de Mejora",
          "empty_state_title": "¡Comienza tu análisis o traducción de CV!",
          "empty_state_description": "Sube tu CV para empezar.",
          "translation_result_title": "Resultado de la Traducción",
          "language_toggle_es": "Español",
          "language_toggle_en": "Inglés",
          "features_title": "Características Clave",
          "feature1_title": "Análisis Inteligente",
          "feature1_description": "Obtén un análisis detallado de tu CV en relación con el puesto deseado, identificando fortalezas y áreas de mejora.",
          "feature2_title": "Sugerencias Personalizadas",
          "feature2_description": "Recibe recomendaciones específicas sobre habilidades, experiencia y formato para optimizar tu CV.",
          "feature3_title": "Traducción Instantánea",
          "feature3_description": "Traduce tu CV a múltiples idiomas con un solo clic, facilitando tu postulación a nivel global.",
          "formats_supported": "Formatos soportados: PDF*",
          "click_to_upload": "Haz clic para subir tu CV",
          "or_drag_and_drop": "o arrastra y suelta aquí",
          "footer_text": "Optimiza tu CV con inteligencia artificial y mejora tus oportunidades laborales.",
          "follow_me": "Sígueme",
          "analysis_completed": "¡Análisis Completado!",
          "analysis_breakdown": "Este es el desglose de la compatibilidad de tu CV con la oferta.",
          "general_compatibility": "Compatibilidad General",
          "custom_summary": "Resumen Personalizado",
          "your_strengths": "Tus Fortalezas",
          "skill_suggestions": "Sugerencias de Habilidades",
          "experience_suggestions": "Sugerencias de Experiencia",
          "format_suggestions": "Sugerencias de Formato",
          "no_skill_suggestions": "No hay sugerencias de habilidades.",
          "no_experience_suggestions": "No hay sugerencias de experiencia.",
          "no_format_suggestions": "No hay sugerencias de formato.",
          "download_report": "Descargar Reporte",
          "analyze_another_cv": "Analizar Otro CV",
          "error_unexpected": "Ha ocurrido un error inesperado.",
          "error_try_again": "Por favor, inténtalo de nuevo más tarde.",
          "progress_starting": "Iniciando análisis...",
          "progress_extracting": "Extrayendo información...",
          "progress_analyzing": "Analizando habilidades...",
          "progress_generating": "Generando sugerencias...",
          "progress_finishing": "Finalizando análisis...",
          "progress_analyzing_cv": "Analizando tu CV...",
          "progress_processing": "Nuestra IA está procesando tu información",
          "progress_completed": "% completado",
          "translation_complete_title": "¡Traducción Completada!",
          "translation_complete_description": "Tu CV ha sido traducido al {{language}}. Puedes previsualizarlo a continuación y descargarlo.",
          "translation_preview_aria": "Vista previa del CV traducido",
          "download_translated_cv": "Descargar CV Traducido",
          "new_translation": "Nueva Traducción",
          "edit_translated_cv": "Editar CV Traducido",
          "common": {
            "cancel": "Cancelar",
            "generating": "Generando...",
            "error": {
              "generic": "Ha ocurrido un error."
            },
            "success": {
              "generic": "¡Guardado exitosamente!"
            }
          },
          "editCV": {
            "title": "Editar CV",
            "personalInfo": "Información Personal",
            "name": "Nombre Completo",
            "jobTitle": "Puesto de Trabajo",
            "email": "Correo Electrónico",
            "phone": "Teléfono",
            "location": "Ubicación",
            "linkedin": "Perfil de LinkedIn",
            "summary": "Resumen Profesional",
            "experience": "Experiencia Laboral",
            "company": "Empresa",
            "dates": "Fechas",
            "description": "Descripción",
            "addExperience": "Añadir Experiencia",
            "education": "Educación",
            "degree": "Título / Grado",
            "institution": "Institución",
            "addEducation": "Añadir Educación",
            "skills": "Habilidades",
            "skillsPlaceholder": "Ej: React, Node.js, Python",
            "languages": "Idiomas",
            "languagesPlaceholder": "Ej: Español (Nativo), Inglés (Profesional)",
            "saveAndGenerate": "Guardar y Generar PDF"
          }
        }
      },
      en: {
        translation: {
          "app_name": "CV Analyzer AI",
          "hero_title": "Analyze Your CV with AI",
          "hero_subtitle": "Get personalized suggestions and improve your job compatibility.",
          "analyze_tab": "Analyze CV",
          "translate_tab": "Translate CV",
          "translating_text": "Translating...",
          "upload_cv_label": "Upload your CV (PDF)",
          "job_description_label": "Job Description",
          "job_description_placeholder": "E.g., Fullstack Developer with React and Node.js",
          "analyze_button": "Analyze CV",
          "translation_target_language_label": "Target Language",
          "placeholder": "Select a language",
          "translate_button": "Translate CV",
          "translate_description": "Translate your CV to another language while maintaining professional formatting",
          "results_section_title": "Analysis Results",
          "match_score": "Match Score",
          "summary": "Summary",
          "suggestions": "Improvement Suggestions",
          "skills": "Skills",
          "experience": "Experience",
          "format": "Format",
          "strengths": "Strengths",
          "improvements": "Areas for Improvement",
          "empty_state_title": "Start your CV analysis or translation!",
          "empty_state_description": "Upload your CV to get started.",
          "translation_result_title": "Translation Result",
          "language_toggle_es": "Spanish",
          "language_toggle_en": "English",
          "features_title": "Key Features",
          "feature1_title": "Intelligent Analysis",
          "feature1_description": "Get a detailed analysis of your CV in relation to the desired position, identifying strengths and areas for improvement.",
          "feature2_title": "Personalized Suggestions",
          "feature2_description": "Receive specific recommendations on skills, experience, and format to optimize your CV.",
          "feature3_title": "Instant Translation",
          "feature3_description": "Translate your CV into multiple languages with a single click, facilitating your global application.",
          "formats_supported": "Supported formats: PDF*",
          "click_to_upload": "Click to upload your CV",
          "or_drag_and_drop": "or drag and drop here",
          "footer_text": "Optimize your CV with artificial intelligence and enhance your job opportunities.",
          "follow_me": "Follow me",
          "analysis_completed": "Analysis Completed!",
          "analysis_breakdown": "This is the breakdown of your CV's compatibility with the offer.",
          "general_compatibility": "General Compatibility",
          "custom_summary": "Personalized Summary",
          "your_strengths": "Your Strengths",
          "skill_suggestions": "Skill Suggestions",
          "experience_suggestions": "Experience Suggestions",
          "format_suggestions": "Format Suggestions",
          "no_skill_suggestions": "No skill suggestions.",
          "no_experience_suggestions": "No experience suggestions.",
          "no_format_suggestions": "No format suggestions.",
          "download_report": "Download Report",
          "analyze_another_cv": "Analyze Another CV",
          "error_unexpected": "An unexpected error has occurred.",
          "error_try_again": "Please try again later.",
          "progress_starting": "Starting analysis...",
          "progress_extracting": "Extracting information...",
          "progress_analyzing": "Analyzing skills...",
          "progress_generating": "Generating suggestions...",
          "progress_finishing": "Finalizing analysis...",
          "progress_analyzing_cv": "Analyzing your CV...",
          "progress_processing": "Our AI is processing your information",
          "progress_completed": "% completed",
          "translation_complete_title": "Translation Complete!",
          "translation_complete_description": "Your CV has been translated to {{language}}. You can preview it below and download it.",
          "translation_preview_aria": "Translated CV Preview",
          "download_translated_cv": "Download Translated CV",
          "new_translation": "New Translation",
          "edit_translated_cv": "Edit Translated CV",
          "common": {
            "cancel": "Cancel",
            "generating": "Generating...",
            "error": {
              "generic": "An error has occurred."
            },
            "success": {
              "generic": "Saved successfully!"
            }
          },
          "editCV": {
            "title": "Edit CV",
            "personalInfo": "Personal Information",
            "name": "Full Name",
            "jobTitle": "Job Title",
            "email": "Email",
            "phone": "Phone",
            "location": "Location",
            "linkedin": "LinkedIn Profile",
            "summary": "Professional Summary",
            "experience": "Work Experience",
            "company": "Company",
            "dates": "Dates",
            "description": "Description",
            "addExperience": "Add Experience",
            "education": "Education",
            "degree": "Degree",
            "institution": "Institution",
            "addEducation": "Add Education",
            "skills": "Skills",
            "skillsPlaceholder": "e.g., React, Node.js, Python",
            "languages": "Languages",
            "languagesPlaceholder": "e.g., Spanish (Native), English (Professional)",
            "saveAndGenerate": "Save and Generate PDF"
          }
        }
      }
    }
  });