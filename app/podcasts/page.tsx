import Link from "next/link"
import Image from "next/image"
import { Headphones } from "lucide-react"
import EnhancedFooter from "@/components/enhanced-footer"
import SiteHeader from "@/components/site-header"

export default function PodcastsPage() {
  // This would typically come from an API or CMS
  const podcasts = [
    {
      id: 1,
      title: "The Journey to Paralympic Gold",
      guest: "Emma Parker",
      description: "Emma shares her incredible journey from rehabilitation to winning Paralympic gold in Tokyo.",
      image: "/female-paralympic-athlete.png",
      duration: "42:15",
      date: "May 1, 2025",
      url: "/podcasts/journey-to-gold",
    },
    {
      id: 2,
      title: "Coaching Elite Para Athletes",
      guest: "James Wilson",
      description:
        "Top coach James Wilson discusses the unique challenges and rewards of training Paralympic champions.",
      image: "/placeholder.svg?key=48771",
      duration: "38:50",
      date: "April 24, 2025",
      url: "/podcasts/coaching-elite",
    },
    {
      id: 3,
      title: "Technology in Para Sports",
      guest: "Dr. Sarah Chen",
      description:
        "Dr. Chen explores how cutting-edge technology is revolutionizing para sports equipment and performance.",
      image: "/placeholder.svg?key=4tcvc",
      duration: "45:22",
      date: "April 17, 2025",
      url: "/podcasts/technology-para-sports",
    },
    {
      id: 4,
      title: "Mental Health in Elite Para Sport",
      guest: "Dr. Michael Torres",
      description:
        "Sports psychologist Dr. Torres discusses the mental challenges faced by para athletes at the highest level.",
      image: "/sports-psychology-session.png",
      duration: "51:08",
      date: "April 10, 2025",
      url: "/podcasts/mental-health-elite",
    },
    {
      id: 5,
      title: "Breaking Barriers in Para Swimming",
      guest: "Sophia Lee",
      description:
        "Multiple gold medalist Sophia Lee talks about her career and breaking world records in para swimming.",
      image: "/para-swimming-competition.png",
      duration: "39:45",
      date: "April 3, 2025",
      url: "/podcasts/breaking-barriers-swimming",
    },
    {
      id: 6,
      title: "The Business of Para Sports",
      guest: "Robert Johnson",
      description: "Sports marketing expert Robert Johnson discusses the growing commercial appeal of para sports.",
      image: "/placeholder.svg?key=52gj1",
      duration: "47:30",
      date: "March 27, 2025",
      url: "/podcasts/business-para-sports",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-teal-900/40 to-black py-12">
          <div className="container px-4 md:px-6">
            <div className="flex items-center gap-3">
              <Headphones className="h-8 w-8 text-teal-500" />
              <h1 className="text-3xl font-bold md:text-4xl">Para Sport Talks</h1>
            </div>
            <p className="mt-2 max-w-2xl text-gray-300">
              Our exclusive podcast series featuring in-depth conversations with para athletes, coaches, and experts
              from around the world.
            </p>
          </div>
        </section>
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {podcasts.map((podcast) => (
                <Link key={podcast.id} href={podcast.url} className="group">
                  <div className="overflow-hidden rounded-lg bg-gray-900 transition-colors hover:bg-gray-800">
                    <div className="relative">
                      <Image
                        src={podcast.image || "/placeholder.svg"}
                        alt={podcast.title}
                        width={400}
                        height={400}
                        className="aspect-square object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-500">
                          <Headphones className="h-8 w-8 text-black" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs font-medium">
                        {podcast.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-medium group-hover:text-teal-400">{podcast.title}</h3>
                      <p className="mt-1 text-sm text-gray-400">with {podcast.guest}</p>
                      <p className="mt-2 text-sm text-gray-300">{podcast.description}</p>
                      <p className="mt-3 text-xs text-gray-500">{podcast.date}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <EnhancedFooter />
    </div>
  )
}
