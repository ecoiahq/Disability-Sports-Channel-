import Image from "next/image"
import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"
import SportTimelineComponent from "@/components/sport-timeline"
import { getSportBySlug } from "@/lib/sports-data"

export const metadata: Metadata = {
  title: "Para Athletics | Disability Sports Channel",
  description: "Learn about para athletics, watch videos, read news, and discover the rules and classification system.",
}

export default function ParaAthleticsPage() {
  const sport = getSportBySlug("para-athletics")

  if (!sport) {
    return <div>Sport not found</div>
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src={sport.coverImage || "/placeholder.svg"}
              alt="Para Athletics"
              fill
              className="object-cover object-center opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
          </div>

          <div className="container relative z-10 mx-auto px-4 py-24 md:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">{sport.name}</h1>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">{sport.description}</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button className="bg-teal-600 hover:bg-teal-500">Watch Live</Button>
                <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  Learn the Rules
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-950 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="mb-8 text-3xl font-bold text-white">Sport Timeline</h2>
            <SportTimelineComponent timeline={sport.timeline} />
          </div>
        </section>
      </main>
      <EnhancedFooter />
    </div>
  )
}
