# CV Analyzer AI

CV Analyzer AI is a powerful web application designed to help job seekers optimize their resumes. By leveraging the power of Large Language Models (LLMs), this tool provides intelligent analysis, personalized suggestions, and instant translation, making it an essential asset for anyone looking to enhance their career opportunities.

## ✨ Key Features

- **🤖 AI-Powered CV Analysis**: Upload your CV and a job description to receive a detailed analysis of how well your resume matches the position. The tool provides a compatibility score and a summary of your strengths and weaknesses.
- **💡 Personalized Suggestions**: Get actionable recommendations to improve your CV. The AI identifies areas for improvement in your skills, experience, and formatting to better align with the job requirements.
- **🌐 Instant Translation**: Translate your CV into multiple languages with a single click. The app preserves the professional structure of your document, making it easy to apply for jobs globally.
- **✍️ Interactive CV Editor**: After translating your CV, you can edit the generated content directly in the browser to make fine-tuned adjustments.
- **📄 PDF Regeneration**: Once you've edited the translated CV, you can instantly regenerate a new, polished PDF document.
- **🌎 Bilingual Interface**: Full support for both English and Spanish, adapting to your browser's language settings.
- **🌙 Dark Mode**: A sleek, modern interface with support for both light and dark modes for a comfortable user experience.

## 📸 Screenshots

Here are a few snapshots of the application in action.

*Main view for CV Analysis and Translation.*
![CV Analyzer Dashboard](https://i.imgur.com/m8S5gI2.png)

*Example of a CV analysis result, showing the compatibility score and detailed suggestions.*
![Analysis Result](https://i.imgur.com/mXbBv7o.png)

*The CV editor modal, allowing for real-time changes to the translated content before regenerating the PDF.*
![CV Editor](https://i.imgur.com/tqZ3yN9.png)

## 🛠️ Technologies Used

This project is built with a modern tech stack, ensuring a robust and scalable application.

### Backend

- **Framework**: [**FastAPI**](https://fastapi.tiangolo.com/) - A high-performance Python web framework for building APIs.
- **Language**: **Python 3.11**
- **LLM Integration**: [**Google Gemini Pro**](https://ai.google.dev/) via the `google-generativeai` library.
- **Data Validation**: [**Pydantic**](https://docs.pydantic.dev/) - For robust data validation and settings management.
- **PDF Handling**:
  - `PyPDF2` for text extraction from uploaded PDF files.
  - `fpdf2` for generating new PDF documents from structured data.
- **Environment Variables**: `python-dotenv` for managing environment variables.

### Frontend

- **Framework**: [**React**](https://react.dev/) (with [**Vite**](https://vitejs.dev/)) - A fast, modern toolchain for building React applications.
- **Language**: **TypeScript**
- **Styling**: [**Tailwind CSS**](https://tailwindcss.com/) - A utility-first CSS framework for rapid UI development.
- **UI Components**: Built using [**shadcn/ui**](https://ui.shadcn.com/), which provides accessible and reusable components.
- **Form Management**: [**React Hook Form**](https://react-hook-form.com/) for efficient and scalable form state management.
- **Schema Validation**: [**Zod**](https://zod.dev/) for type-safe schema declaration and validation.
- **Internationalization (i18n)**: [**i18next**](https://www.i18next.com/) to support multiple languages in the UI.
- **Toast Notifications**: [**Sonner**](https://sonner.emilkowal.ski/) for clean and simple toast notifications.

### Deployment

- **Containerization**: [**Docker**](https://www.docker.com/) and **Docker Compose** are used to containerize the frontend and backend services for consistent development and easy deployment.

## 📂 Project Structure

```
.
├── backend/
│   ├── app/
│   │   ├── main.py       # FastAPI app entrypoint
│   │   ├── model.py      # LLM interaction logic
│   │   ├── routers.py    # API endpoint definitions
│   │   └── utils.py      # PDF processing utilities
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── App.tsx       # Main application component
│   │   └── i18n.ts       # Language configurations
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml    # Docker services definition
└── README.md             # This file
```
