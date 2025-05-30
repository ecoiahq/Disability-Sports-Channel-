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
  title: "Para Athletics | Disability Sports Channel",
  description: "Learn about para athletics, watch videos, read news, and discover the rules and classification system.",
}

export default function ParaAthleticsPage() {
  const sport = getSportBySlug("para-athletics")
  const news = getSportNews("para-athletics")
  const videos = getSportVideos("para-athletics")

  if (!sport) {
    return <div>Sport not found</div>
  }

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
              src={sport.coverImage || "/placeholder.svg"}
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
            subtitle="Explore the evolution of para athletics from its origins at Stoke Mandeville to becoming one of the largest Paralympic sports."
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
                            <p className="font-medium text-white">Event Types</p>
                            <p className="text-gray-400">Track, field, road events</p>
                          </div>
                        </li>
                        <li className="flex items-start gap-3">
                          <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-teal-500" />
                          <div>
                            <p className="font-medium text-white">Competition Format</p>
                            <p className="text-gray-400">Individual events with heats, semifinals, and finals</p>
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
                            <p className="text-gray-400">World Para Athletics (WPA)</p>
                          </div>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Equipment</h3>
                      <p className="mb-4 text-gray-300">
                        Para athletics utilizes specialized equipment to enable athletes with different impairments to
                        compete:
                      </p>
                      <ul className="space-y-2 text-gray-300">
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Racing wheelchairs for track events</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Throwing frames for seated throwing events</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Prosthetic limbs for running and jumping</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Guide runners and tethers for visually impaired athletes</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Modified implements for throwing events</span>
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
                          The pinnacle of para athletics competition, held every four years as part of the Paralympic
                          Games.
                        </p>
                      </div>
                      <div className="rounded-lg bg-gray-800 p-4">
                        <h4 className="mb-2 font-bold text-white">World Championships</h4>
                        <p className="text-sm text-gray-300">
                          Organized by World Para Athletics every two years, featuring the top athletes from around the
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
                      <h3 className="mb-4 text-xl font-bold text-white">Key Adaptations</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Visually impaired runners may compete with guide runners connected by a tether</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Seated throwers use secured throwing frames</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Acoustic signals may be used for visually impaired athletes in jumping events</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>Modified starting positions for athletes with different impairments</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-900 border-gray-800">
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold text-white">Competition Rules</h3>
                      <ul className="space-y-3 text-gray-300">
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>False Starts:</strong> Disqualification after one false start in sprint events
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Lane Violations:</strong> Staying within lanes for sprint events, with specific
                            rules for wheelchair racers
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Throwing Events:</strong> Six attempts per athlete, with the best distance counting
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="mt-1 h-1.5 w-1.5 rounded-full bg-teal-500"></div>
                          <span>
                            <strong>Guide Runners:</strong> Must not pull or push the athlete and must finish behind the
                            athlete
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

                    <h4 className="mb-3 text-lg font-medium text-teal-400">Classification Categories</h4>
                    <div className="overflow-hidden rounded-lg border border-gray-700">
                      <table className="w-full border-collapse text-left">
                        <thead className="bg-gray-800">
                          <tr>
                            <th className="p-3 text-white">Category</th>
                            <th className="p-3 text-white">Description</th>
                            <th className="p-3 text-white">Examples</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                          <tr className="bg-gray-900">
                            <td className="p-3 font-medium text-teal-400">T/F11-13</td>
                            <td className="p-3 text-gray-300">Visual impairment (T=track, F=field)</td>
                            <td className="p-3 text-gray-300">T12 100m, F13 long jump</td>
                          </tr>
                          <tr className="bg-gray-900/70">
                            <td className="p-3 font-medium text-teal-400">T/F20</td>
                            <td className="p-3 text-gray-300">Intellectual impairment</td>
                            <td className="p-3 text-gray-300">T20 1500m, F20 shot put</td>
                          </tr>
                          <tr className="bg-gray-900">
                            <td className="p-3 font-medium text-teal-400">T/F31-38</td>
                            <td className="p-3 text-gray-300">Coordination impairments (cerebral palsy)</td>
                            <td className="p-3 text-gray-300">T34 800m, F38 javelin</td>
                          </tr>
                          <tr className="bg-gray-900/70">
                            <td className="p-3 font-medium text-teal-400">T/F40-41</td>
                            <td className="p-3 text-gray-300">Short stature</td>
                            <td className="p-3 text-gray-300">T41 100m, F40 shot put</td>
                          </tr>
                          <tr className="bg-gray-900">
                            <td className="p-3 font-medium text-teal-400">T/F42-47</td>
                            <td className="p-3 text-gray-300">Limb deficiencies and impaired range of movement</td>
                            <td className="p-3 text-gray-300">T44 200m, F46 javelin</td>
                          </tr>
                          <tr className="bg-gray-900/70">
                            <td className="p-3 font-medium text-teal-400">T/F51-57</td>
                            <td className="p-3 text-gray-300">Wheelchair athletes (spinal cord injuries)</td>
                            <td className="p-3 text-gray-300">T54 marathon, F55 discus</td>
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
                            <p className="text-gray-400">Sport-specific tests to evaluate functional ability</p>
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
                      <h3 className="mb-4 text-xl font-bold text-white">Classification Challenges</h3>
                      <p className="mb-4 text-gray-300">
                        The classification system in para athletics faces several ongoing challenges:
                      </p>
                      <div className="space-y-4">
                        <div className="rounded-lg bg-gray-800 p-4">
                          <h4 className="mb-2 font-bold text-white">Diverse Impairments</h4>
                          <p className="text-sm text-gray-300">
                            Accommodating the wide range of physical, visual, and intellectual impairments
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-800 p-4">
                          <h4 className="mb-2 font-bold text-white">Technology Impact</h4>
                          <p className="text-sm text-gray-300">
                            Addressing how advances in prosthetics and equipment affect competition fairness
                          </p>
                        </div>
                        <div className="rounded-lg bg-gray-800 p-4">
                          <h4 className="mb-2 font-bold text-white">Event Viability</h4>
                          <p className="text-sm text-gray-300">
                            Balancing the need for fair competition with having enough athletes in each class
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
                    {videos.slice(0, 3).map((video) => (
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
                    ))}
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
                    {news.slice(0, 3).map((article) => (
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
                    ))}
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
      </main>
      <EnhancedFooter />
    </div>
  )
}
