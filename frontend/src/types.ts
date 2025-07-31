export interface Experience {
  title?: string;
  company?: string;
  dates?: string;
  description?: string[] | string;
}

export interface Education {
  degree?: string;
  institution?: string;
  dates?: string;
  description?: string[] | string;
}

// This type should be kept in sync with the backend Pydantic model
export interface CVData {
  name?: string;
  title?: string;
  contact?: {
    location?: string;
    phone?: string;
    email?: string;
    linkedin?: string;
    github?: string;
  };
  summary?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: string[] | string;
  languages?: string[] | string;
}