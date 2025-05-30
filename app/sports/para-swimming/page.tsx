import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { getSportBySlug, getSportNews, getSportVideos } from "@/lib/sports-data"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react"
import SportHistoryTimeline from "@/components/sport-history-timeline"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"

export const metadata: Metadata = {
  title: "Para Swimming | Disability Sports Channel",
  description: "Learn about para swimming, watch videos, read news, and discover the rules and classification system.",
}

export default function ParaSwimmingPage() {
  // Get sport information with fallback data
  const sport = getSportBySlug("para-swimming") || {
    name: "Para Swimming",
    description:
      "Para swimming is an adaptation of swimming for athletes with disabilities. It is governed by the International Blind Sports Federation (IBSA) for visually impaired athletes and is part of the Paralympic Games program.",
    timeline: [
      {
        year: "1960",
        event: "Paralympic Debut",
        description: "Para swimming was first included in the Paralympic Games in Rome.",
      },
      {
        year: "1976",
        event: "Classification Development",
        description: "First formal classification system introduced for para swimming.",
      },
      {
        year: "1990",
        event: "IBSA Governance",
        description: "IBSA officially took over governance of para swimming for visually impaired athletes.",
      },
      {
        year: "2000",
        event: "Sydney Paralympics",
        description: "Sydney Paralympics saw increased participation and media coverage.",
      },
      {
        year: "2024",
        event: "Modern Era",
        description: "Continued growth and innovation in para swimming events and technology.",
      },
    ],
    rules: [
      {
        title: "Swimming Strokes",
        content:
          "Para swimming includes all four competitive swimming strokes: freestyle, backstroke, breaststroke, and butterfly. Athletes compete in individual medley and relay events.",
      },
      {
        title: "Tappers",
        content:
          "Visually impaired swimmers use tappers - assistants who use a pole to tap the swimmer when approaching the wall for turns and finishes.",
      },
      {
        title: "Starting Procedures",
        content:
          "Athletes may start from a starting block, poolside, or in the water depending on their classification and functional ability.",
      },
      {
        title: "Equipment Modifications",
        content:
          "Swimmers may use approved prosthetics and adaptive equipment. All equipment must be approved by technical officials before competition.",
      },
    ],
    classification:
      "Para swimming uses a sport class system from S1-S14. S1-S10 are for swimmers with physical impairments, S11-S13 for visual impairments, and S14 for intellectual impairments. Lower numbers indicate more severe impairments.",
    coverImage: "/para-swimming-competition.png",
  }

  const news = getSportNews("para-swimming")
  const videos = getSportVideos("para-swimming")

  // Create timeline events from the sport data
  const timelineEvents = sport.timeline
    ? sport.timeline.map((item) => ({
        year: item.year,
        title: item.event,
        description: item.description,
      }))
    : []

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src={sport.coverImage || "/para-swimming-competition.png"}
              alt={sport.name}
              fill
              className="object-cover object-center opacity-60"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
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

        {/* Sport History Timeline */}
        {timelineEvents.length > 0 && (
          <SportHistoryTimeline
            events={timelineEvents}
            subtitle="Explore the evolution of para swimming from its Paralympic debut to becoming one of the most popular Paralympic sports."
          />
        )}

        {/* Content Tabs */}
        <section className="bg-gray-950 py-16">
          <div className="container mx-auto px-4 md:px-6">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-8 grid w-full grid-cols-4 bg-gray-900/50">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="rules">Rules</TabsTrigger>
                <TabsTrigger value="classification">Classification</TabsTrigger>
                <TabsTrigger value="media">Videos & News</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-8">
                <div className="grid gap-8 md:grid-cols-2">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Key Facts</h3>
                      <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                          <Users className="mt-1 h-5 w-5 flex-shrink-0 text-teal-500" />
                          <div>
                            <p className="font-medium text-white">Events</p>
                            <p className="text-gray-400">Individual and relay races across all strokes</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-teal-500" />
                          <div>
                            <p className="font-medium text-white">Pool Length</p>
                            <p className="text-gray-400">50m Olympic-size swimming pools</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Calendar className="mt-1 h-5 w-5 flex-shrink-0 text-teal-500" />
                          <div>
                            <p className="font-medium text-white">Paralympic Sport Since</p>
                            <p className="text-gray-400">1960 Rome Paralympics</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-teal-500" />
                          <div>
                            <p className="font-medium text-white">Governing Body</p>
                            <p className="text-gray-400">World Para Swimming</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Swimming Strokes</h3>
                      <p className="mb-4 text-gray-300">
                        Para swimming includes all competitive swimming strokes with adaptations for different
                        impairments:
                      </p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Freestyle (front crawl)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Backstroke</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Breaststroke</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Butterfly</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Individual Medley (all four strokes)</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold text-white">Major Competitions</h3>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-lg bg-gray-800 p-4">
                        <h4 className="mb-2 font-bold text-white">Paralympic Games</h4>
                        <p className="text-sm text-gray-300">
                          The pinnacle of para swimming competition, held every four years with over 140 medal events.
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-800 p-4">
                        <h4 className="mb-2 font-bold text-white">World Championships</h4>
                        <p className="text-sm text-gray-300">
                          Organized by World Para Swimming every two years, featuring the top swimmers globally.
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-800 p-4">
                        <h4 className="mb-2 font-bold text-white">World Series</h4>
                        <p className="text-sm text-gray-300">
                          Annual series of competitions providing qualification opportunities for major championships.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rules" className="space-y-8">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <h3 className="mb-6 text-xl font-bold text-white">Official Rules</h3>
                    <div className="space-y-6">
                      {sport.rules.map((rule, index) => (
                        <div key={index}>
                          <h4 className="mb-2 text-lg font-medium text-teal-400">{rule.title}</h4>
                          <p className="text-gray-300">{rule.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-8 md:grid-cols-2">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Race Distances</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Sprint:</strong> 50m events in all strokes
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Middle Distance:</strong> 100m and 200m events
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Distance:</strong> 400m and 1500m freestyle
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Medley:</strong> 150m and 200m individual medley
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Starting Procedures</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Dive Start:</strong> From starting blocks for most swimmers
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Deck Start:</strong> From poolside for some classifications
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Water Start:</strong> Starting in the water for certain impairments
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Backstroke:</strong> Starting in water holding starting grips
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="classification" className="space-y-8">
                <Card className="bg-gray-900 border-gray-800">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-xl font-bold text-white">Classification System</h3>
                    <p className="mb-6 text-gray-300">{sport.classification}</p>

                    <h4 className="mb-3 text-lg font-medium text-teal-400">Sport Classes</h4>
                    <div className="overflow-hidden rounded-lg border border-gray-700">
                      <table className="w-full border-collapse text-left">
                        <thead className="bg-gray-800">
                          <tr>
                            <th className="p-3 text-white">Class Range</th>
                            <th className="p-3 text-white">Impairment Type</th>
                            <th className="p-3 text-white">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          <tr className="bg-gray-900">
                            <td className="p-3 font-medium text-teal-400">S1-S10</td>
                            <td className="p-3 text-gray-300">Physical</td>
                            <td className="p-3 text-gray-300">
                              Limb deficiencies, spinal cord injuries, cerebral palsy
                            </td>
                          </tr>
                          <tr className="bg-gray-900/70">
                            <td className="p-3 font-medium text-teal-400">S11-S13</td>
                            <td className="p-3 text-gray-300">Visual</td>
                            <td className="p-3 text-gray-300">Varying degrees of visual impairment</td>
                          </tr>
                          <tr className="bg-gray-900">
                            <td className="p-3 font-medium text-teal-400">S14</td>
                            <td className="p-3 text-gray-300">Intellectual</td>
                            <td className="p-3 text-gray-300">Intellectual impairment</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-8 md:grid-cols-2">
                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Classification Process</h3>
                      <ol className="space-y-4 text-gray-300">
                        <li className="flex items-start gap-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/50 text-sm font-medium text-teal-400">
                            1
                          </div>
                          <div>
                            <p className="font-medium text-white">Medical Assessment</p>
                            <p className="text-gray-400">Review of medical documentation and physical examination</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/50 text-sm font-medium text-teal-400">
                            2
                          </div>
                          <div>
                            <p className="font-medium text-white">Technical Assessment</p>
                            <p className="text-gray-400">Swimming-specific tests to evaluate functional ability</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/50 text-sm font-medium text-teal-400">
                            3
                          </div>
                          <div>
                            <p className="font-medium text-white">Water Assessment</p>
                            <p className="text-gray-400">Observation of swimming technique and functional capacity</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/50 text-sm font-medium text-teal-400">
                            4
                          </div>
                          <div>
                            <p className="font-medium text-white">Classification Assignment</p>
                            <p className="text-gray-400">Final sport class assigned based on all evaluations</p>
                          </div>
                        </li>
                      </ol>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Adaptive Equipment</h3>
                      <p className="mb-4 text-gray-300">
                        Swimmers may use various adaptive equipment based on their classification:
                      </p>
                      <div className="space-y-4">
                        <div className="rounded-lg bg-gray-800 p-4">
                          <h4 className="mb-2 font-bold text-white">Prosthetics</h4>
                          <p className="text-sm text-gray-300">
                            Approved prosthetic limbs may be worn during competition if they provide no advantage
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-800 p-4">
                          <h4 className="mb-2 font-bold text-white">Tappers</h4>
                          <p className="text-sm text-gray-300">
                            Visual impairment classes use tappers to signal turns and finishes
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-800 p-4">
                          <h4 className="mb-2 font-bold text-white">Starting Aids</h4>
                          <p className="text-sm text-gray-300">
                            Modified starting procedures and equipment based on functional ability
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-8">
                <div>
                  <h3 className="mb-6 text-2xl font-bold text-white">Latest Videos</h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    {videos && videos.length > 0 ? (
                      videos.slice(0, 3).map((video) => (
                        <Link key={video.id} href={video.url} className="group">
                          <div className="overflow-hidden rounded-lg bg-gray-900 transition-all duration-300 hover:bg-gray-800">
                            <div className="relative aspect-video overflow-hidden">
                              <Image
                                src={video.image || "/placeholder.svg"}
                                alt={video.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                              <div className="absolute bottom-3 left-3 flex items-center gap-2">
                                <Badge className="bg-teal-600 text-white">{video.category}</Badge>
                                <Badge variant="outline" className="border-gray-600 text-gray-300">
                                  {video.duration}
                                </Badge>
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="mb-2 text-lg font-bold text-white group-hover:text-teal-400">
                                {video.title}
                              </h4>
                              <p className="line-clamp-2 text-sm text-gray-300">{video.description}</p>
                              <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs text-gray-400">{video.date}</span>
                                <span className="text-xs text-gray-400">{video.views} views</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="col-span-full text-center">
                        <p className="text-gray-400">No videos available for {sport.name} at this time.</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                      View All Videos <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="mb-6 text-2xl font-bold text-white">Latest News</h3>
                  <div className="grid gap-6 md:grid-cols-3">
                    {news && news.length > 0 ? (
                      news.slice(0, 3).map((article) => (
                        <Link key={article.id} href={article.url} className="group">
                          <div className="overflow-hidden rounded-lg bg-gray-900 transition-all duration-300 hover:bg-gray-800">
                            <div className="relative aspect-video overflow-hidden">
                              <Image
                                src={article.image || "/placeholder.svg"}
                                alt={article.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                              <div className="absolute bottom-3 left-3">
                                <Badge className="bg-teal-600 text-white">{article.category}</Badge>
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="mb-2 text-lg font-bold text-white group-hover:text-teal-400">
                                {article.title}
                              </h4>
                              <p className="line-clamp-2 text-sm text-gray-300">{article.excerpt}</p>
                              <div className="mt-3 flex items-center justify-between">
                                <span className="text-xs text-gray-400">{article.date}</span>
                                <span className="text-xs text-gray-400">By {article.author}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div className="col-span-full text-center">
                        <p className="text-gray-400">No news articles available for {sport.name} at this time.</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-6 text-center">
                    <Button variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                      View All News <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
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
              <Link href="/sports/para-archery" className="group">
                <Card className="overflow-hidden bg-gray-900 transition-colors hover:bg-gray-800">
                  <div className="relative aspect-video">
                    <Image src="/para-archery-competition.png" alt="Para Archery" fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-lg font-bold text-white group-hover:text-teal-400">Para Archery</h3>
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
                  <ArrowRight className="h-4 w-4" />
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
