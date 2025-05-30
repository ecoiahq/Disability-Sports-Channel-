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
  title: "Para Alpine Skiing | Disability Sports Channel",
  description:
    "Learn about para alpine skiing, including its history, rules, classification system, and latest news and videos.",
}

export default function ParaAlpineSkiingPage() {
  // Get sport information
  const sport = getSportBySlug("para-alpine-skiing") || {
    name: "Para Alpine Skiing",
    description:
      "Para alpine skiing is a Paralympic winter sport where athletes with physical disabilities compete in alpine skiing events. Athletes race down snow-covered slopes, navigating gates in various disciplines.",
    timeline: [
      {
        year: "1948",
        event: "Origins",
        description:
          "The foundations of para alpine skiing were laid when injured World War II veterans began skiing as part of their rehabilitation.",
      },
      {
        year: "1976",
        event: "Paralympic Debut",
        description:
          "Alpine skiing made its Paralympic debut at the first Winter Paralympic Games in Örnsköldsvik, Sweden.",
      },
      {
        year: "1984",
        event: "Expansion",
        description: "The Innsbruck 1984 Winter Paralympics saw a significant expansion of para alpine skiing events.",
      },
      {
        year: "1992",
        event: "Classification System",
        description: "A more comprehensive classification system was introduced for para alpine skiing.",
      },
      {
        year: "2006",
        event: "IPC Governance",
        description: "The International Paralympic Committee (IPC) took direct governance of para alpine skiing.",
      },
    ],
    rules: [
      {
        title: "Disciplines",
        content:
          "Para alpine skiing includes five disciplines: Downhill, Super-G, Giant Slalom, Slalom, and Super Combined. Each has different course setups and speed requirements.",
      },
      {
        title: "Equipment",
        content:
          "Athletes use specialized equipment based on their impairment, including sit-skis (a seated device mounted on a single ski), outriggers (modified poles with small skis attached), or prosthetic devices.",
      },
      {
        title: "Competition Format",
        content:
          "Athletes compete against others in their classification category. In technical events (Slalom and Giant Slalom), athletes take two runs, with the combined time determining the winner.",
      },
      {
        title: "Course Setup",
        content:
          "Courses are set with gates that athletes must navigate. The number and spacing of gates vary by discipline, with Slalom having the most gates and Downhill having the fewest.",
      },
    ],
    pointSystem:
      "Para alpine skiing uses a time-based scoring system. Athletes compete against others in their classification category, with the fastest time determining the winner. In technical events (Slalom and Giant Slalom), athletes take two runs, with the combined time determining the final result.",
    classification:
      "Para alpine skiing has three main categories: visually impaired (guided by a sighted skier), standing (for athletes who can stand on skis), and sitting (for athletes who use sit-skis). Within these categories, athletes are further classified based on their functional ability and impairment type.",
    coverImage: "/abstract-geometric-shapes.png",
  }

  // Get sport-specific news and videos
  const news = getSportNews("para-alpine-skiing")
  const videos = getSportVideos("para-alpine-skiing")

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
            <Image
              src={sport.coverImage || "/abstract-geometric-shapes.png"}
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
            <h2 className="text-2xl font-bold">Related Winter Sports</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <Link href="/sports/para-snowboarding" className="group">
                <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                  <div className="relative aspect-video">
                    <Image src="/abstract-geometric-shapes.png" alt="Para Snowboarding" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400">Para Snowboarding</h3>
                    </div>
                  </div>
                </Card>
              </Link>
              <Link href="/sports/para-biathlon" className="group">
                <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                  <div className="relative aspect-video">
                    <Image src="/abstract-geometric-shapes.png" alt="Para Biathlon" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400">Para Biathlon</h3>
                    </div>
                  </div>
                </Card>
              </Link>
              <Link href="/sports/para-ice-hockey" className="group">
                <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                  <div className="relative aspect-video">
                    <Image src="/abstract-geometric-shapes.png" alt="Para Ice Hockey" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400">Para Ice Hockey</h3>
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
