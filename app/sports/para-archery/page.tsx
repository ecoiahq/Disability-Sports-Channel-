import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import EnhancedFooter from "@/components/enhanced-footer"
import SiteHeader from "@/components/site-header"
import SportHistoryTimeline from "@/components/sport-history-timeline"
import { getSportBySlug, getSportNews, getSportVideos } from "@/lib/sports-data"

export const metadata = {
  title: "Para Archery | Disability Sports Channel",
  description:
    "Learn about para archery, including its history, rules, classification system, and latest news and videos.",
}

export default function ParaArcheryPage() {
  // Get sport information
  const sport = getSportBySlug("para-archery") || {
    name: "Para Archery",
    description:
      "Para archery is a Paralympic sport where athletes with physical disabilities compete in archery events. Athletes shoot arrows at a target from a set distance and aim to get the highest score.",
    timeline: [
      {
        year: "1948",
        event: "Origins",
        description:
          "Para archery was one of the original sports in the first Stoke Mandeville Games, organized by Sir Ludwig Guttmann.",
      },
      {
        year: "1960",
        event: "Paralympic Debut",
        description: "Archery was included in the first Paralympic Games in Rome.",
      },
      {
        year: "1984",
        event: "Classification System",
        description: "A formal classification system was introduced for para archery.",
      },
      {
        year: "2009",
        event: "World Archery Governance",
        description: "World Archery took over governance of para archery from the IPC.",
      },
      {
        year: "2016",
        event: "Rio Paralympics",
        description: "Para archery featured 9 medal events at the Rio Paralympic Games.",
      },
    ],
    rules: [
      {
        title: "Competition Format",
        content:
          "Para archery follows the same rules as Olympic archery. Athletes shoot arrows at a target from a set distance (70m for recurve, 50m for compound) and aim to get the highest score.",
      },
      {
        title: "Equipment",
        content:
          "Athletes use either recurve bows (used in the Olympics) or compound bows (which use a levering system). Some athletes may use assistive devices based on their classification.",
      },
      {
        title: "Scoring",
        content:
          "The target has 10 concentric rings, with points from 1 (outer ring) to 10 (inner ring). The competition consists of a ranking round followed by head-to-head elimination matches.",
      },
      {
        title: "Divisions",
        content:
          "Para archery has two main divisions: Open (for athletes who can shoot from a standing or seated position) and W1 (for athletes with impairments in arms and legs).",
      },
    ],
    pointSystem:
      "Para archery uses the same scoring system as Olympic archery. The target has 10 concentric rings, with points from 1 (outer ring) to 10 (inner ring). In the elimination rounds, the athlete with the highest score in a set earns 2 points, and tied sets earn 1 point each. The first athlete to reach 6 points wins the match.",
    classification:
      "Para archery has two main sport classes: Open division (for athletes who can shoot from a standing or seated position) and W1 division (for athletes with impairments affecting both arms and legs). Within these divisions, athletes may compete in recurve or compound bow categories.",
    coverImage: "/para-archery-competition.png",
  }

  // Get sport-specific news and videos
  const news = getSportNews("para-archery")
  const videos = getSportVideos("para-archery")

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
            <Image
              src={sport.coverImage || "/para-archery-competition.png"}
              alt={sport.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 lg:p-8">
              <div className="container">
                <h1 className="text-3xl font-bold md:text-4xl lg:text-5xl">{sport.name}</h1>
                <p className="mt-2 max-w-2xl text-gray-300 md:text-lg">{sport.description}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 md:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="news">News</TabsTrigger>
                <TabsTrigger value="videos">Videos</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="mt-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <h2 className="text-2xl font-bold">Rules</h2>
                    <div className="mt-4 space-y-6">
                      {sport.rules.map((rule, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-semibold text-teal-400">{rule.title}</h3>
                          <p className="mt-2 text-gray-300">{rule.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Classification</h2>
                    <p className="mt-4 text-gray-300">{sport.classification}</p>

                    <h2 className="mt-8 text-2xl font-bold">Point System</h2>
                    <p className="mt-4 text-gray-300">{sport.pointSystem}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="history" className="mt-6">
                <h2 className="text-2xl font-bold">History of {sport.name}</h2>
                <SportHistoryTimeline timeline={sport.timeline} />
              </TabsContent>
              <TabsContent value="news" className="mt-6">
                <h2 className="text-2xl font-bold">Latest News</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {news && news.length > 0 ? (
                    news.map((article) => (
                      <Link key={article.id} href={article.url} className="group">
                        <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                          <div className="relative aspect-video">
                            <Image
                              src={article.image || "/placeholder.svg"}
                              alt={article.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="line-clamp-2 text-lg font-bold group-hover:text-teal-400">
                              {article.title}
                            </h3>
                            <p className="mt-2 line-clamp-3 text-sm text-gray-300">{article.excerpt}</p>
                            <div className="mt-4 flex items-center justify-between">
                              <span className="text-xs text-gray-400">{article.date}</span>
                              <span className="text-xs font-medium text-teal-400">Read more</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full text-center">
                      <p className="text-gray-400">No news articles available for {sport.name} at this time.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="videos" className="mt-6">
                <h2 className="text-2xl font-bold">Videos</h2>
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {videos && videos.length > 0 ? (
                    videos.map((video) => (
                      <Link key={video.id} href={video.url} className="group">
                        <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                          <div className="relative aspect-video">
                            <Image
                              src={video.image || "/placeholder.svg"}
                              alt={video.title}
                              fill
                              className="object-cover"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="h-6 w-6"
                                >
                                  <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                              </div>
                            </div>
                            <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs">
                              {video.duration}
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="line-clamp-2 text-lg font-bold group-hover:text-teal-400">{video.title}</h3>
                            <p className="mt-2 line-clamp-2 text-sm text-gray-300">{video.description}</p>
                            <div className="mt-4 flex items-center justify-between">
                              <span className="text-xs text-gray-400">{video.views} views</span>
                              <span className="text-xs font-medium text-teal-400">Watch now</span>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))
                  ) : (
                    <div className="col-span-full text-center">
                      <p className="text-gray-400">No videos available for {sport.name} at this time.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Related Sports */}
        <section className="border-t border-gray-800 py-8 md:py-12">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold">Related Sports</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <Link href="/sports/para-athletics" className="group">
                <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                  <div className="relative aspect-video">
                    <Image src="/para-athletics-track.png" alt="Para Athletics" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400">Para Athletics</h3>
                    </div>
                  </div>
                </Card>
              </Link>
              <Link href="/sports/para-swimming" className="group">
                <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                  <div className="relative aspect-video">
                    <Image src="/para-swimming-competition.png" alt="Para Swimming" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400">Para Swimming</h3>
                    </div>
                  </div>
                </Card>
              </Link>
              <Link href="/sports/wheelchair-basketball" className="group">
                <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                  <div className="relative aspect-video">
                    <Image
                      src="/wheelchair-basketball-action.png"
                      alt="Wheelchair Basketball"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400">Wheelchair Basketball</h3>
                    </div>
                  </div>
                </Card>
              </Link>
            </div>
            <div className="mt-8 flex justify-center">
              <Button asChild variant="outline" className="border-teal-600 text-teal-400 hover:bg-teal-950">
                <Link href="/sports" className="flex items-center gap-2">
                  View All Sports
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <EnhancedFooter />
    </div>
  )
}
