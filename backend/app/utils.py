import io
import pypdf
from fastapi import HTTPException

def extract_text_from_cv(filename: str, contents: bytes) -> str:
    """
    Extracts text from CV contents based on file type.
    Currently supports PDF and plain text files.
    """
    if filename.lower().endswith('.pdf'):
        try:
            pdf_file = io.BytesIO(contents)
            pdf_reader = pypdf.PdfReader(pdf_file)
            text = ""
            for page_num in range(len(pdf_reader.pages)):
                text += pdf_reader.pages[page_num].extract_text() or ""
            return text
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error processing PDF file: {e}")
    else:
        try:
            # Attempt to decode as UTF-8 for other file types
            cv_text = contents.decode('utf-8')
            return cv_text
        except UnicodeDecodeError:
            raise HTTPException(status_code=400, detail="Could not decode CV content. Only PDF and plain text files are currently supported.")
