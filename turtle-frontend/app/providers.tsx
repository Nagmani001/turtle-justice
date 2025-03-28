"use client"
import { SidebarProvider } from "./contexts/SidebarContext"
import { ThemeProvider } from "./contexts/ThemeContext"

export default function Providers({ children }: {
  children: React.ReactNode
}) {
  return <div>
    <ThemeProvider>
      <SidebarProvider>
        {children}
      </SidebarProvider>
    </ThemeProvider>
  </div>

}
