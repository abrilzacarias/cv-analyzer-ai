# CV Analyzer AI

CV Analyzer AI is a powerful web application designed to help job seekers optimize their resumes. Powered by Large Language Models (LLMs), it analyzes your CV against a job description, suggests improvements, translates content, and lets you generate a polished PDF — all in one place.

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

<img width="1919" height="870" alt="image" src="https://github.com/user-attachments/assets/7e6e7233-5d7b-4e05-b9ac-480286e411ce" />

<img width="1916" height="869" alt="image" src="https://github.com/user-attachments/assets/f87d6664-d826-4dd3-80cc-a9166de6b3db" />

<img width="1919" height="871" alt="image" src="https://github.com/user-attachments/assets/c1ed19ed-6f86-41fa-9032-33440a48528f" />

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
- **Northflank (CI/CD)**: The application is deployed using [Northflank](https://northflank.com/), with automatic builds and deployments triggered on every push to the main branch.

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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
