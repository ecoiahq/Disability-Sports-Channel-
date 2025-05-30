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
  title: "Para Archery | Disability Sports Channel",
  description: "Learn about para archery, watch videos, read news, and discover the rules and classification system.",
}

export default function ParaArcheryPage() {
  // Get sport information with fallback data
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
    classification:
      "Para archery has two main sport classes: Open division (for athletes who can shoot from a standing or seated position) and W1 division (for athletes with impairments affecting both arms and legs). Within these divisions, athletes may compete in recurve or compound bow categories.",
    coverImage: "/para-archery-competition.png",
  }

  const news = getSportNews("para-archery")
  const videos = getSportVideos("para-archery")

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
              src={sport.coverImage || "/para-archery-competition.png"}
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
            subtitle="Explore the evolution of para archery from its origins at Stoke Mandeville to becoming a core Paralympic sport."
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
                            <p className="font-medium text-white">Competition Format</p>
                            <p className="text-gray-400">Individual ranking and elimination rounds</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-teal-500" />
                          <div>
                            <p className="font-medium text-white">Distance</p>
                            <p className="text-gray-400">70m for recurve, 50m for compound</p>
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
                            <p className="text-gray-400">World Archery</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Equipment</h3>
                      <p className="mb-4 text-gray-300">
                        Para archery utilizes specialized equipment to enable athletes with different impairments to
                        compete:
                      </p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Recurve bows (Olympic style)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Compound bows with levering system</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Assistive devices for drawing and releasing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Wheelchair shooting platforms</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Modified grips and releases</span>
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
                          The pinnacle of para archery competition, held every four years as part of the Paralympic
                          Games.
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-800 p-4">
                        <h4 className="mb-2 font-bold text-white">World Championships</h4>
                        <p className="text-sm text-gray-300">
                          Organized by World Archery every two years, featuring the top para archers from around the
                          world.
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-800 p-4">
                        <h4 className="mb-2 font-bold text-white">Regional Championships</h4>
                        <p className="text-sm text-gray-300">
                          Continental competitions such as European Championships, Pan American Games, and Asian Para
                          Games.
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
                      <h3 className="mb-4 text-xl font-bold text-white">Scoring System</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Target has 10 concentric rings with points from 1-10</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Gold ring (center) scores 9 or 10 points</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Elimination rounds use set system (first to 6 set points wins)</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Each set consists of 3 arrows per athlete</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Competition Format</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Ranking Round:</strong> 72 arrows shot to determine seeding
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Elimination Rounds:</strong> Head-to-head matches using set system
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Time Limits:</strong> 2 minutes per end for individual events
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Mixed Team:</strong> Teams of one male and one female athlete
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
                            <th className="p-3 text-white">Class</th>
                            <th className="p-3 text-white">Description</th>
                            <th className="p-3 text-white">Bow Types</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          <tr className="bg-gray-900">
                            <td className="p-3 font-medium text-teal-400">Open</td>
                            <td className="p-3 text-gray-300">
                              Athletes who can shoot from standing or seated position
                            </td>
                            <td className="p-3 text-gray-300">Recurve & Compound</td>
                          </tr>
                          <tr className="bg-gray-900/70">
                            <td className="p-3 font-medium text-teal-400">W1</td>
                            <td className="p-3 text-gray-300">Athletes with impairments affecting arms and legs</td>
                            <td className="p-3 text-gray-300">Recurve & Compound</td>
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
                            <p className="text-gray-400">Archery-specific tests to evaluate functional ability</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-900/50 text-sm font-medium text-teal-400">
                            3
                          </div>
                          <div>
                            <p className="font-medium text-white">Observation in Competition</p>
                            <p className="text-gray-400">
                              Assessment during actual competition to confirm classification
                            </p>
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
                      <h3 className="mb-4 text-xl font-bold text-white">Assistive Devices</h3>
                      <p className="mb-4 text-gray-300">
                        Athletes may use various assistive devices based on their classification:
                      </p>
                      <div className="space-y-4">
                        <div className="rounded-lg bg-gray-800 p-4">
                          <h4 className="mb-2 font-bold text-white">W1 Class</h4>
                          <p className="text-sm text-gray-300">
                            May use assistive devices for drawing, holding, and releasing the bowstring
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-800 p-4">
                          <h4 className="mb-2 font-bold text-white">Open Class</h4>
                          <p className="text-sm text-gray-300">
                            Limited assistive devices allowed, must demonstrate functional ability
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-800 p-4">
                          <h4 className="mb-2 font-bold text-white">Equipment Rules</h4>
                          <p className="text-sm text-gray-300">
                            All equipment must comply with World Archery regulations and be approved by classifiers
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
