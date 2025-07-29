import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/theme-toggle"
import { LanguageToggle } from "@/components/layout/LanguageToggle"

export function Header() {
  return (
    <header className="border-b text-foreground bg-card/60 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-32 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <div className="flex items-center space-x-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
}
