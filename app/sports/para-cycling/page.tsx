import Hero from "@/components/Hero"
import TabsContent from "@/components/TabsContent"
import SportHistoryTimeline from "@/components/SportHistoryTimeline"
import type { Metadata } from "next"
import { getImageByName } from "@/utils/helpers"

export const metadata: Metadata = {
  title: "Para Cycling | Sports | ND Para Sport",
  description: "Para Cycling at ND Para Sport",
}

const ParaCyclingPage = async () => {
  const heroImage = await getImageByName("para-cycling-hero.webp")

  const timelineEvents = [
    { year: 1984, event: "Para cycling included in the Paralympic Games" },
    { year: 2004, event: "Handcycling introduced to the Paralympic program" },
    { year: 2012, event: "London Paralympics sees increased participation and media coverage" },
    { year: 2020, event: "Tokyo Paralympics showcases advancements in cycling technology" },
  ]

  const overviewContent = (
    <>
      <p>
        Para cycling includes track and road cycling events for athletes with physical disabilities. It encompasses
        various classifications based on impairment, ensuring fair competition.
      </p>
      <p>
        Athletes use adapted bicycles, handcycles, tandems, or tricycles depending on their classification. The sport
        demands strength, endurance, and strategic racing skills.
      </p>
    </>
  )

  const rulesContent = (
    <>
      <p>
        Para cycling follows the rules set by the UCI (Union Cycliste Internationale) with specific adaptations for
        para-athletes. These adaptations address equipment modifications and classification-specific regulations.
      </p>
      <p>
        Key rules include equipment standards, start procedures, and guidelines for drafting and course navigation.
        Penalties are enforced for rule violations to ensure fair play.
      </p>
    </>
  )

  const classificationContent = (
    <>
      <p>
        Para cycling classification groups athletes based on their functional abilities. This ensures that athletes
        compete against others with similar levels of impairment.
      </p>
      <p>
        Classifications include categories for cyclists with cerebral palsy (C classes), visual impairments (B classes),
        upper limb impairments (H classes for handcycles), and other physical impairments (T classes for tricycles).
      </p>
    </>
  )

  const mediaContent = (
    <>
      <p>
        Explore videos, images, and news articles showcasing para cycling events and athletes. Stay updated on the
        latest competitions, athlete profiles, and technological advancements in adaptive cycling equipment.
      </p>
      <p>
        Follow the journey of para-cyclists as they push boundaries and inspire audiences worldwide. Discover the
        dedication, skill, and sportsmanship that define this exciting sport.
      </p>
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
      <Hero title="Para Cycling" image={heroImage} alt="Para Cycling Hero Image" />

      <div className="container mx-auto py-8">
        <SportHistoryTimeline events={timelineEvents} />

        <TabsContent tabs={tabsData} />
      </div>
    </div>
  )
}

export default ParaCyclingPage
