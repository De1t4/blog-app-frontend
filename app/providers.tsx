// app/providers.tsx
'use client'
export function Providers({children}: { children: React.ReactNode }) {
  return (
      <main className="dark text-foreground bg-background">
        {children}
      </main>
  )
}