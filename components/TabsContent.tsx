import { Tabs, TabsContent as ShadcnTabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { ReactNode } from "react"

interface TabContent {
  label: string
  content: ReactNode
}

interface TabsContentProps {
  overviewContent?: ReactNode
  rulesContent?: ReactNode
  classificationContent?: ReactNode
  mediaContent?: ReactNode
  tabContents?: TabContent[]
}

export default function TabsContent({
  overviewContent,
  rulesContent,
  classificationContent,
  mediaContent,
  tabContents,
}: TabsContentProps) {
  // If tabContents is provided, use that format
  if (tabContents) {
    return (
      <section className="bg-gray-950 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <Tabs defaultValue={tabContents[0]?.label.toLowerCase()} className="w-full">
            <TabsList
              className="mb-8 grid w-full bg-gray-900/50"
              style={{ gridTemplateColumns: `repeat(${tabContents.length}, 1fr)` }}
            >
              {tabContents.map((tab) => (
                <TabsTrigger key={tab.label} value={tab.label.toLowerCase()}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabContents.map((tab) => (
              <ShadcnTabsContent key={tab.label} value={tab.label.toLowerCase()} className="space-y-8">
                <div className="prose prose-invert max-w-none">{tab.content}</div>
              </ShadcnTabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    )
  }

  // Default format with specific content props
  return (
    <section className="bg-gray-950 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-8 grid w-full grid-cols-4 bg-gray-900/50">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="classification">Classification</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <ShadcnTabsContent value="overview" className="space-y-8">
            <div className="prose prose-invert max-w-none">{overviewContent}</div>
          </ShadcnTabsContent>

          <ShadcnTabsContent value="rules" className="space-y-8">
            <div className="prose prose-invert max-w-none">{rulesContent}</div>
          </ShadcnTabsContent>

          <ShadcnTabsContent value="classification" className="space-y-8">
            <div className="prose prose-invert max-w-none">{classificationContent}</div>
          </ShadcnTabsContent>

          <ShadcnTabsContent value="media" className="space-y-8">
            <div className="prose prose-invert max-w-none">{mediaContent}</div>
          </ShadcnTabsContent>
        </Tabs>
      </div>
    </section>
  )
}
