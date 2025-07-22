from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="CV AI Assistant",
    description="API para análisis de CVs, sugerencias personalizadas y traducción",
    version="0.1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(suggestions.router, prefix="/suggestions", tags=["Sugerencias"])

