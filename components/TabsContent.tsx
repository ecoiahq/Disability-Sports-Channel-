import type { ReactNode } from "react"

interface TabsContentProps {
  value: string
  children: ReactNode
  className?: string
}

export default function TabsContent({ value, children, className = "" }: TabsContentProps) {
  return (
    <div role="tabpanel" data-value={value} className={`mt-6 ${className}`}>
      {children}
    </div>
  )
}
