# 🤖 AI Assistant Guidelines for CV Analyzer

This file defines the **rules, context, technical goals, and product goals** for an AI coding assistant collaborating on the **CV Analyzer AI Assistant** project.

---

## 🎯 Project Objective

Build a web application that:

1. Analyzes a CV (PDF, DOCX, or TXT file) to determine how well it matches a **desired job position**.
2. Automatically translates the CV into a **target language** selected by the user.
3. Uses **large language models (LLMs)** to generate contextual, relevant feedback for the end user.

---

## 🧱 General Architecture

### 📦 Backend
- Framework: **FastAPI**
- Main endpoints:
  - `POST /analyze`: analyzes the CV according to the target position
  - `POST /translate`: translates the CV to the indicated language
- File upload via `UploadFile`, processed **in memory**, not stored on disk
- Current support for PDF and TXT files
- Integrated with **Google Gemini API**, model `gemini-pro`

### 💻 Frontend
- Framework: **React (Vite)**
- Styling: **Tailwind CSS**, with support for **dark mode**
- Internationalization: **i18n** for dynamic language support
- Main form:
  - Field to upload a CV file
  - Input for desired job title or target language
  - Language selector in the UI

---

## 🤖 LLM Integration (Google Gemini)

- Current model: `gemini-pro` via `google.generativeai`
- Methods:
  - `generate_content()` for prompt-based generation

## 📌 AI Assistant Rules
- Always ask whether to respond in Spanish or English if unclear.
- Clearly separate prompt text from code, especially when collaborating on backend.
- Validate file type before processing. Prioritize PDF, then plain text.
- Never save files locally. Use in-memory processing (UploadFile.file.read()).
- Suggest safe and explicit prompts for LLMs.
- Check that api_key and model configuration are set before calling the model.
- When translating: avoid literal translation of acronyms, names, or technical terms.
- Respond concisely and professionally, emulating a technical assistant tone.
- Identify potential errors and suggest meaningful debugging steps
- Remember that this app is production-oriented: always suggest robust solutions

## 🧪 Best Practices
- Keep routes organized in a module like routers/cv.py
- Use APIRouter() with route prefixes /analyze and /translate
- Document each route using @router.post(..., summary="...")
- On the frontend, validate file extensions before upload
- Handle network errors gracefully and provide clear user feedback