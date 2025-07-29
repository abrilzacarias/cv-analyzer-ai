import os
import json
from dotenv import load_dotenv
import google.generativeai as genai
from fastapi import HTTPException

# Load environment variables from .env file
load_dotenv()

# Configure Google Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
model = genai.GenerativeModel('gemini-2.5-flash-lite')

GEMINI_GENERATION_CONFIG = genai.types.GenerationConfig(
    temperature=0.2,
    top_p=0.95,
    top_k=40,
    max_output_tokens=4096
)

def analyze_cv_with_gemini(cv_text: str, job_description: str, target_language: str = "es"):
    prompts = {
        "es": f"""
    Eres un asistente experto en reclutamiento y análisis de CV. Tu tarea es analizar un CV y compararlo con una descripción de puesto.
    Dirígete siempre al usuario directamente en segunda persona (tú). Tu tono debe ser profesional, alentador y constructivo.

    **Reglas Críticas:**
    1.  **Basa todas tus respuestas estrictamente en el contenido del CV proporcionado.** No inventes información, fechas, roles ni detalles que no estén en el documento.
    2.  **No emitas opiniones ni sugerencias sobre fechas** (por ejemplo, si las fechas de experiencia están en el futuro o son inconsistentes). Ignora completamente este aspecto.
    3.  Si no encuentras un problema claro o una sugerencia relevante para una categoría, devuelve un array vacío `[]` para esa categoría. No inventes sugerencias para rellenar.

    Debes proporcionar:
    1. Un porcentaje de compatibilidad (matchScore) entre 0 y 100.
    2. Un resumen conciso y personalizado sobre qué tan bien encaja tu perfil con el puesto.
    3. Una lista de tus fortalezas clave para este puesto, basadas en tu CV.
    4. Una lista de áreas concretas donde puedes mejorar tu CV para esta oferta.
    5. Sugerencias específicas y accionables en las siguientes categorías:
        - Habilidades (skills): ¿Qué habilidades mencionadas en la oferta podrías añadir o resaltar?
        - Experiencia (experience): ¿Cómo podrías describir mejor tu experiencia para este rol?
        - Formato (format): ¿Hay mejoras de formato que harían tu CV más legible?

    Formato de salida (JSON estricto):
    ```json
    {{
        "matchScore": <int>,
        "summary": "<string>",
        "strengths": ["<tu fortaleza 1>", "<tu fortaleza 2>"],
        "improvements": ["<tu área de mejora 1>", "<tu área de mejora 2>"],
        "suggestions": {{
            "skills": ["<sugerencia de habilidad 1>", "<sugerencia de habilidad 2>"],
            "experience": ["<sugerencia de experiencia 1>", "<sugerencia de experiencia 2>"],
            "format": ["<sugerencia de formato 1>", "<sugerencia de formato 2>"]
        }}
    }}
    ```

    CV del usuario:
    {cv_text}

    Descripción del Puesto:
    {job_description}
    """,
        "en": f"""
    You are an expert recruitment and CV analysis assistant. Your task is to analyze a CV and compare it against a job description.
    Always address the user directly in the second person (you). Your tone should be professional, encouraging, and constructive.

    **Critical Rules:**
    1.  **Base all your answers strictly on the content of the provided CV.** Do not invent information, dates, roles, or details that are not in the document.
    2.  **Do not provide opinions or suggestions about dates** (e.g., if experience dates are in the future or inconsistent). Completely ignore this aspect.
    3.  If you do not find a clear issue or a relevant suggestion for a category, return an empty array `[]` for that category. Do not invent suggestions to fill space.

    You must provide:
    1. A compatibility percentage (matchScore) between 0 and 100.
    2. A concise and personalized summary of how well your profile fits the position.
    3. A list of your key strengths for this role, based on your CV.
    4. A list of concrete areas where you can improve your CV for this opening.
    5. Specific, actionable suggestions in the following categories:
        - Skills: What skills mentioned in the job description could you add or highlight?
        - Experience: How can you better describe your experience for this role?
        - Format: Are there any formatting improvements that would make your CV more readable?

    Output format (Strict JSON):
    ```json
    {{
        "matchScore": <int>,
        "summary": "<string>",
        "strengths": ["<your strength 1>", "<your strength 2>"],
        "improvements": ["<your improvement area 1>", "<your improvement area 2>"],
        "suggestions": {{
            "skills": ["<skill suggestion 1>", "<skill suggestion 2>"],
            "experience": ["<experience suggestion 1>", "<experience suggestion 2>"],
            "format": ["<format suggestion 1>", "<format suggestion 2>"]
        }}
    }}
    ```

    User's CV:
    {cv_text}

    Job Description:
    {job_description}
    """
    }

    prompt = prompts.get(target_language.split('-')[0], prompts["es"])

    try:
        response = model.generate_content(prompt, generation_config=GEMINI_GENERATION_CONFIG)

        if not response.parts:
            print(f"Gemini response blocked. Feedback: {response.prompt_feedback}")
            if response.prompt_feedback and response.prompt_feedback.block_reason:
                error_detail = f"El contenido fue bloqueado por políticas de seguridad de Gemini (Razón: {response.prompt_feedback.block_reason.name}). Por favor, modifica el contenido de tu CV o la descripción del puesto."
                raise HTTPException(status_code=400, detail=error_detail)
            else:
                raise HTTPException(status_code=500, detail="La respuesta de Gemini fue bloqueada sin una razón específica.")

        response_text = response.text.strip()
        
        if response_text.startswith("```json"):
            json_string = response_text[len("```json"):].strip()
            if json_string.endswith("```"):
                json_string = json_string[:-len("```")].strip()
        else:
            json_string = response_text
        
        try:
            analysis_result = json.loads(json_string)
        except json.JSONDecodeError as e:
            print(f"JSON Decode Error. Gemini response was: {json_string}")
            raise HTTPException(status_code=500, detail=f"Error al procesar la respuesta de la IA. No es un JSON válido. {e}")

        required_keys = ["matchScore", "summary", "suggestions", "strengths", "improvements"]
        if not all(key in analysis_result for key in required_keys):
            print(f"Missing keys in Gemini response: {analysis_result.keys()}")
            raise HTTPException(status_code=500, detail="La respuesta de la IA no tiene el formato esperado.")

        return analysis_result

    except HTTPException:
        raise
    except Exception as e:
        print(f"Error inesperado al procesar con Gemini: {e}")
        raise HTTPException(status_code=500, detail="Ocurrió un error inesperado en el servidor al comunicarse con la IA.")

