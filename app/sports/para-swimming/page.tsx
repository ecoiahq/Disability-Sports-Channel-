import Hero from "@/components/Hero"
import SportHistoryTimeline from "@/components/SportHistoryTimeline"
import TabsContent from "@/components/TabsContent"
import Card from "@/components/Card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Para Swimming | Sports | IBSA",
  description:
    "Explore Para Swimming at IBSA. Learn about the history, rules, classification, and media related to this sport.",
}

const ParaSwimmingPage = () => {
  const heroContent = {
    title: "Para Swimming",
    description: "Para swimming is a sport governed by the International Blind Sports Federation (IBSA).",
    image: "/images/sports/para-swimming-hero.jpg",
    alt: "Para Swimming athletes in action",
  }

  const timelineEvents = [
    { year: 1960, event: "Para swimming was first included in the Paralympic Games in Rome." },
    { year: 1990, event: "IBSA officially took over governance of Para swimming." },
    { year: 2000, event: "Sydney Paralympics saw increased participation and media coverage." },
    { year: 2024, event: "Continued growth and innovation in Para swimming events." },
  ]

  const overviewContent = (
    <>
      <p>
        Para swimming is an adaptation of swimming for athletes with disabilities. It is governed by the International
        Blind Sports Federation (IBSA) for visually impaired athletes and is part of the Paralympic Games program.
      </p>
      <Card title="Key Facts">
        <ul>
          <li>Governed by IBSA for visually impaired athletes.</li>
          <li>Part of the Paralympic Games.</li>
          <li>Includes various swimming strokes and distances.</li>
        </ul>
      </Card>
    </>
  )

  const rulesContent = (
    <>
      <p>
        Para swimming rules are based on the standard swimming rules with modifications to accommodate athletes with
        disabilities. These modifications may include the use of tappers for visually impaired swimmers.
      </p>
      <Card title="Rule Highlights">
        <ul>
          <li>Use of tappers to signal turns and finishes for visually impaired swimmers.</li>
          <li>Adaptations for starting positions.</li>
          <li>Modified rules for specific disability classifications.</li>
        </ul>
      </Card>
    </>
  )

  const classificationContent = (
    <>
      <p>
        Classification in Para swimming is a system that groups athletes with similar impairments together for
        competition. This ensures fair competition by minimizing the impact of impairment on performance.
      </p>
      <Card title="Classification Groups">
        <ul>
          <li>S1-S10: Swimmers with physical impairments.</li>
          <li>S11-S13: Swimmers with visual impairments.</li>
          <li>S14: Swimmers with intellectual impairments.</li>
        </ul>
      </Card>
    </>
  )

  const mediaContent = (
    <>
      <p>Explore media related to Para swimming, including photos, videos, and news articles.</p>
      <Card title="Featured Media">
        <p>Coming soon...</p>
      </Card>
    </>
  )

  const tabsData = [
    { label: "Overview", content: overviewContent },
    { label: "Rules", content: rulesContent },
    { label: "Classification", content: classificationContent },
    { label: "Media", content: mediaContent },
  ]

  return (
    <div>
      <Hero {...heroContent} />
      <SportHistoryTimeline events={timelineEvents} />
      <TabsContent tabs={tabsData} />
    </div>
  )
}

export default ParaSwimmingPage
