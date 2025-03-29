"use client"
import { RecoilRoot } from "recoil"
import { SidebarProvider } from "./contexts/SidebarContext"
import { ThemeProvider } from "./contexts/ThemeContext"

export default function Providers({ children }: {
  children: React.ReactNode
}) {
  return <div>
    <RecoilRoot>
      <ThemeProvider>
        <SidebarProvider>
          {children}
        </SidebarProvider>
      </ThemeProvider>
    </RecoilRoot>
  </div>

}
