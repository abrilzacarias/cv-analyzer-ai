from fastapi import APIRouter, UploadFile, File, Form, Header, HTTPException
from fastapi.responses import StreamingResponse
import io
import base64
from pydantic import BaseModel
from typing import List, Optional

from .model import analyze_cv_with_gemini, translate_text_with_gemini
from .utils import generate_ats_friendly_pdf, extract_text_from_cv

router = APIRouter()

# --- Pydantic Models for data validation ---
class Contact(BaseModel):
    location: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None

class Experience(BaseModel):
    title: str
    company: str
    dates: str
    description: List[str]

class Education(BaseModel):
    degree: str
    institution: str
    dates: str
    description: List[str]

class CVData(BaseModel):
    name: str
    title: Optional[str] = None
    contact: Optional[Contact] = None
    summary: Optional[str] = None
    experience: Optional[List[Experience]] = []
    education: Optional[List[Education]] = []
    skills: Optional[List[str]] = []
    languages: Optional[List[str]] = []

class RegenerationRequest(BaseModel):
    cv_data: CVData
    target_language: str

@router.post("/analyze")
async def analyze_cv(
    file: UploadFile = File(...),
    jobDescription: str = Form(...),
    accept_language: str = Header("es")
):
    try:
        contents = await file.read()
        cv_text = extract_text_from_cv(file.filename, contents)
        analysis_result = analyze_cv_with_gemini(cv_text, jobDescription, target_language=accept_language)
        return analysis_result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail="Ocurrió un error inesperado en el servidor.")

@router.post("/translate", summary="Translate a CV and return structured data and a Base64 PDF")
async def translate_cv(
    file: UploadFile = File(...),
    targetLanguage: str = Form(...)
):
    try:
        contents = await file.read()
        cv_text = extract_text_from_cv(file.filename, contents)
        
        translated_data = translate_text_with_gemini(cv_text, targetLanguage)
        
        pdf_bytes = generate_ats_friendly_pdf(translated_data, targetLanguage)
        pdf_base64 = base64.b64encode(pdf_bytes).decode('utf-8')

        return {
            "pdf_data": pdf_base64,
            "cv_data": translated_data
        }
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ocurrió un error inesperado en el servidor durante la traducción: {e}")

@router.post("/regenerate-pdf", summary="Regenerate a PDF from edited CV data")
async def regenerate_pdf(request: RegenerationRequest):
    try:
        pdf_bytes = generate_ats_friendly_pdf(request.cv_data.dict(), request.target_language)
        
        return StreamingResponse(
            io.BytesIO(pdf_bytes),
            media_type="application/pdf",
            headers={
                "Content-Disposition": f"attachment; filename=\"cv_regenerated.pdf\""
            }
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Ocurrió un error inesperado al regenerar el PDF: {e}")