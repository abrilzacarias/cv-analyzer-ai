
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash2 } from "lucide-react";

// --- Zod Schema for Validation ---
const contactSchema = z.object({
  location: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  linkedin: z
  .string()
  .optional()
  .refine((val) => {
    if (!val) return true; 
    return /^((https?:\/\/)?(www\.)?linkedin\.com\/.+)/.test(val);
  }, {
    message: "Debe ser una URL válida de LinkedIn (ej: linkedin.com/nombre)",
  }),
  github: z.string().url().optional(),
});

const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  dates: z.string().optional(),
  description: z.array(z.string()).optional(),
});

const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  dates: z.string().optional(),
  description: z.array(z.string()).optional(),
});

const cvDataSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().optional(),
  contact: contactSchema.optional(),
  summary: z.string().optional(),
  experience: z.array(experienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  skills: z.string().optional(),
  languages: z.array(z.string()).optional(),
});

interface CVEditFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  cvData: CVData;
  targetLanguage: string;
  onSubmit: (updatedData: CVData) => void;
  error?: string | null;

}


export function CVEditFormModal({ isOpen, onClose, cvData, targetLanguage, onSubmit, error }: CVEditFormModalProps) {
  const { t } = useTranslation();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CVData>({
    resolver: zodResolver(cvDataSchema),
    defaultValues: cvData,
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: "experience",
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: "education",
  });

  const handleInternalSubmit = (data: CVData) => {
    onSubmit(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="xl:min-w-6xl max-w-4xl">
        <DialogHeader>
          <DialogTitle>{t("editCV.title")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleInternalSubmit)}>
          <ScrollArea className="h-[70vh] p-4">
            <div className="space-y-6">
              {/* Personal Info */}
              <div className="p-4 border rounded-md">
                <h3 className="text-lg font-semibold mb-2">{t("editCV.personalInfo")}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">{t("editCV.name")}</Label>
                    <Input id="name" {...register("name")} />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="title">{t("editCV.jobTitle")}</Label>
                    <Input id="title" {...register("title")} />
                  </div>
                  <div>
                    <Label htmlFor="email">{t("editCV.email")}</Label>
                    <Input id="email" type="email" {...register("contact.email")} />
                  </div>
                   <div>
                    <Label htmlFor="phone">{t("editCV.phone")}</Label>
                    <Input id="phone" {...register("contact.phone")} />
                  </div>
                  <div>
                    <Label htmlFor="location">{t("editCV.location")}</Label>
                    <Input id="location" {...register("contact.location")} />
                  </div>
                  <div>
                    <Label htmlFor="linkedin">{t("editCV.linkedin")}</Label>
                    <Input id="linkedin" {...register("contact.linkedin")} />
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 border rounded-md">
                <Label htmlFor="summary" className="text-lg font-semibold">{t("editCV.summary")}</Label>
                <Textarea id="summary" {...register("summary")} className="mt-2" rows={6} />
              </div>

              {/* Experience */}
              <div className="p-4 border rounded-md">
                <h3 className="text-lg font-semibold mb-2">{t("editCV.experience")}</h3>
                {experienceFields.map((field, index) => (
                  <div key={field.id} className="p-3 my-2 border rounded-md relative">
                    <div className="grid grid-cols-2 gap-4">
                      <Input {...register(`experience.${index}.title`)} placeholder={t("editCV.jobTitle")} />
                      <Input {...register(`experience.${index}.company`)} placeholder={t("editCV.company")} />
                      <Input {...register(`experience.${index}.dates`)} placeholder={t("editCV.dates")} />
                    </div>
                    <Textarea {...register(`experience.${index}.description`)} placeholder={t("editCV.description")} className="mt-2" rows={6} />
                    <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1" onClick={() => removeExperience(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendExperience({ title: "", company: "", dates: "", description: [] })}>
                  {t("editCV.addExperience")}
                </Button>
              </div>

              {/* Education */}
              <div className="p-4 border rounded-md">
                 <h3 className="text-lg font-semibold mb-2">{t("editCV.education")}</h3>
                {educationFields.map((field, index) => (
                  <div key={field.id} className="p-3 my-2 border rounded-md relative">
                    <div className="grid grid-cols-2 gap-4">
                      <Input {...register(`education.${index}.degree`)} placeholder={t("editCV.degree")} />
                      <Input {...register(`education.${index}.institution`)} placeholder={t("editCV.institution")} />
                      <Input {...register(`education.${index}.dates`)} placeholder={t("editCV.dates")} />
                    </div>
                     <Textarea {...register(`education.${index}.description`)} placeholder={t("editCV.description")} className="mt-2" rows={6} />
                    <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1" onClick={() => removeEducation(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button type="button" variant="outline" onClick={() => appendEducation({ degree: "", institution: "", dates: "", description: [] })}>
                  {t("editCV.addEducation")}
                </Button>
              </div>
              
              {/* Skills & Languages */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 border rounded-md">
                    <Label htmlFor="skills" className="text-lg font-semibold">{t("editCV.skills")}</Label>
                    <Textarea id="skills" {...register("skills")} placeholder={t("editCV.skillsPlaceholder")} className="mt-2" rows={4} />
                </div>
                <div className="p-4 border rounded-md">
                    <Label htmlFor="languages" className="text-lg font-semibold">{t("editCV.languages")}</Label>
                    <Textarea id="languages" {...register("languages")} placeholder={t("editCV.languagesPlaceholder")} className="mt-2" rows={4} />
                </div>
              </div>

            </div>
          </ScrollArea>
          <DialogFooter className="mt-4">
            {error && <p className="text-red-500 text-sm mb-2">{t('common.error.generic')}</p>}
            <DialogClose asChild>
              <Button type="button" className="hover:cursor-pointer" variant="outline">{t("common.cancel")}</Button>
            </DialogClose>
            <Button type="submit" className="hover:cursor-pointer bg-primary">
              {t("editCV.saveAndGenerate")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
