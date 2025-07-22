"use client"

import type React from "react"
import { Upload, FileText, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface FileUploadProps {
  uploadedFile: File | null
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function FileUpload({ uploadedFile, onFileUpload }: FileUploadProps) {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Sube tu CV
        </CardTitle>
        <CardDescription>Formatos soportados: PDF, DOC, DOCX</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <input type="file" accept=".pdf,.doc,.docx" onChange={onFileUpload} className="hidden" id="cv-upload" />
          <label htmlFor="cv-upload" className="cursor-pointer">
            {uploadedFile ? (
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="w-6 h-6" />
                <span className="font-medium">{uploadedFile.name}</span>
              </div>
            ) : (
              <div>
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-foreground mb-2">Haz clic para subir tu CV</p>
                <p className="text-sm text-muted-foreground">o arrastra y suelta aquí</p>
              </div>
            )}
          </label>
        </div>
      </CardContent>
    </Card>
  )
}
