import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation();

  const handleGmailClick = () => {
    const email = "abrilzacarias6@gmail.com";
    const subject = "Contacto desde CV Analyzer";
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(
      subject
    )}`;
    window.open(gmailUrl, "_blank");
  };

  return (
    <footer className="border-t bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto py-8 px-32">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-3 max-w-md">
            <h3 className="font-semibold text-foreground">CV Analyzer AI</h3>
            <p className="text-sm text-muted-foreground">{t("footer_text")}</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium text-foreground">{t("follow_me")}</h4>
            <div className="flex space-x-3">
              <a
                href="https://github.com/tu-usuario"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/tu-perfil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <button
                onClick={handleGmailClick}
                className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform hover:cursor-pointer"
                aria-label="Enviar email via Gmail"
                title="Abrir Gmail"
              >
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
