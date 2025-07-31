import io
import pypdf
from fpdf import FPDF
from fastapi import HTTPException

def extract_text_from_cv(filename: str, contents: bytes) -> str:
    """
    Extracts text from CV contents based on file type.
    Supports PDF (.pdf) and plain text (.txt) files.
    """
    filename_lower = filename.lower()
    if filename_lower.endswith('.pdf'):
        try:
            pdf_file = io.BytesIO(contents)
            pdf_reader = pypdf.PdfReader(pdf_file)
            text = ""
            for page_num in range(len(pdf_reader.pages)):
                text += pdf_reader.pages[page_num].extract_text() or ""
            return text
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Error processing PDF file: {e}")
    elif filename_lower.endswith('.txt'):
        try:
            return contents.decode('utf-8')
        except UnicodeDecodeError:
            raise HTTPException(status_code=400, detail="Could not decode .txt file. Please ensure it is UTF-8 encoded.")
    else:
        raise HTTPException(status_code=415, detail="Unsupported file type. Please upload a .pdf or .txt file.")

class PDF(FPDF):
    def header(self):
        pass

    def footer(self):
        pass

    def print_section_title(self, title):
        self.set_font('Helvetica', 'B', 11)
        self.cell(0, 5, title.upper(), 0, 1, 'L')
        self.ln(1)
        self.set_draw_color(0, 0, 0)
        self.line(self.get_x(), self.get_y(), self.get_x() + 180, self.get_y())
        self.ln(3)

    def print_entry(self, title, subtitle, dates, description_items):
        # Save the starting Y position
        start_y = self.get_y()

        # Print the date first, aligned to the right, without moving down.
        self.set_font('Helvetica', '', 10)
        self.cell(0, 5, dates, 0, 0, 'R')

        # Return to the start of the line to print the title in a wrapping cell.
        self.set_xy(self.l_margin, start_y)
        self.set_font('Helvetica', 'B', 10)
        self.multi_cell(135, 5, title, 0, 'L')

        # After the multi_cell, the cursor is automatically at the correct Y position.
        if subtitle:
            self.set_font('Helvetica', 'I', 9)
            self.set_x(self.l_margin)
            self.cell(0, 4, subtitle, 0, 1, 'L')

        self.ln(1)
        self.set_font('Helvetica', '', 9)
        for item in description_items:
            self.set_x(self.l_margin + 2)
            self.multi_cell(0, 4, f'- {item}')
        self.set_x(self.l_margin) # Reset X after loop
        self.ln(3)


def generate_ats_friendly_pdf(data: dict, target_language: str = 'en') -> bytes:
    pdf = PDF('P', 'mm', 'A4')
    pdf.add_page()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.set_margins(15, 15, 15)

    get = lambda key, default='': data.get(key) or default

    # --- Language-specific titles ---
    titles = {
        'en': {
            'summary': 'Summary',
            'experience': 'Experience',
            'education': 'Education',
            'skills_languages': 'Skills & Languages',
            'skills': 'Skills:',
            'languages': 'Languages:'
        },
        'es': {
            'summary': 'Sobre Mí',
            'experience': 'Experiencia',
            'education': 'Educación',
            'skills_languages': 'Habilidades e Idiomas',
            'skills': 'Habilidades:',
            'languages': 'Idiomas:'
        }
    }
    lang_titles = titles.get(target_language, titles['en'])


    # --- Name and Title ---
    pdf.set_font('Helvetica', 'B', 22)
    pdf.cell(0, 9, get('name'), 0, 1, 'C')
    if data.get('title'):
        pdf.set_font('Helvetica', '', 11)
        pdf.cell(0, 5, get('title'), 0, 1, 'C')
    pdf.ln(4)

    # --- Contact Info ---
    contact = get('contact', {})
    contact_parts = [
        contact.get('location'),
        contact.get('phone'),
        contact.get('email'),
        contact.get('linkedin'),
        contact.get('github')
    ]
    contact_line = " | ".join(filter(None, contact_parts))
    pdf.set_font('Helvetica', '', 9)
    pdf.cell(0, 4, contact_line, 0, 1, 'C')
    pdf.ln(6)

    # --- Summary ---
    if data.get('summary'):
        pdf.print_section_title(lang_titles['summary'])
        pdf.set_font('Helvetica', '', 9)
        pdf.multi_cell(0, 4, get('summary'))
        pdf.ln(4)

    # --- Experience ---
    if data.get('experience'):
        pdf.print_section_title(lang_titles['experience'])
        for exp in get('experience', []):
            pdf.print_entry(
                exp.get('title') or '',
                exp.get('company') or '',
                exp.get('dates') or '',
                exp.get('description') or []
            )

    # --- Education ---
    if data.get('education'):
        pdf.print_section_title(lang_titles['education'])
        for edu in get('education', []):
            pdf.print_entry(
                edu.get('degree') or '',
                edu.get('institution') or '',
                edu.get('dates') or '',
                edu.get('description') or []
            )

    # --- Skills & Languages ---
    skills = get('skills', [])
    languages = get('languages', [])
    if skills or languages:
        pdf.print_section_title(lang_titles['skills_languages'])
        pdf.set_font('Helvetica', '', 9)
        if skills:
            pdf.set_font('Helvetica', 'B', 9)
            pdf.cell(0, 5, lang_titles['skills'], 0, 1)
            pdf.set_font('Helvetica', '', 9)
            pdf.multi_cell(0, 4, ", ".join(skills))
            pdf.ln(2)
        if languages:
            pdf.set_font('Helvetica', 'B', 9)
            pdf.cell(0, 5, lang_titles['languages'], 0, 1)
            pdf.set_font('Helvetica', '', 9)
            pdf.multi_cell(0, 4, ", ".join(languages))
            pdf.ln(2)

    return pdf.output()