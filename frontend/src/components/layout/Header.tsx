import { Logo } from "@/components/ui/logo"
import { ThemeToggle } from "@/theme-toggle"

export function Header() {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Logo />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
