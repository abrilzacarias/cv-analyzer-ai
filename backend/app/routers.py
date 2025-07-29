from fastapi import APIRouter, UploadFile, File, Form, Header, HTTPException
from .model import analyze_cv_with_gemini
from .utils import extract_text_from_cv

router = APIRouter()

@router.post("/analyze")
async def analyze_cv(
    file: UploadFile = File(...),
    jobDescription: str = Form(...),
    accept_language: str = Header("es") # Default to Spanish if header is not present
):
    try:
        contents = await file.read()
        cv_text = extract_text_from_cv(file.filename, contents)
        #print(f"CV recibido: {file.filename}")
        #print(f"Descripción del puesto: {jobDescription}")
        analysis_result = analyze_cv_with_gemini(cv_text, jobDescription, target_language=accept_language)
        return analysis_result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Catch-all for any other unexpected errors
        raise HTTPException(status_code=500, detail="Ocurrió un error inesperado en el servidor.")


@router.post("/translate")
async def translate_cv(
    file: UploadFile = File(...),
    targetLanguage: str = Form(...)
):
    contents = await file.read()

    # Simulación de traducción
    print(f"CV recibido: {file.filename}")
    print(f"Idioma de destino: {targetLanguage}")
    print(f"CV tamaño: {len(contents)} bytes")

    # Aquí podrías traducir usando Google Translate API o Gemini
    result = {
        "translatedText": "This is a simulated translation of the CV.",
    }

    return result