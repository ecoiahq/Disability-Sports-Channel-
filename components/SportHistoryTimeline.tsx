import { Card, CardContent } from "@/components/ui/card"

interface TimelineEvent {
  year: number | string
  event?: string
  title?: string
  description?: string
}

interface SportHistoryTimelineProps {
  events: TimelineEvent[]
  subtitle?: string
}

export default function SportHistoryTimeline({ events, subtitle }: SportHistoryTimelineProps) {
  return (
    <section className="bg-gray-900 py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">Sport History</h2>
          {subtitle && <p className="text-xl text-gray-300">{subtitle}</p>}
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-teal-500 transform -translate-x-1/2"></div>

          <div className="space-y-12">
            {events.map((event, index) => (
              <div key={index} className="relative flex items-center">
                {/* Timeline dot */}
                <div className="absolute left-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 transform -translate-x-1/2">
                  <div className="h-3 w-3 rounded-full bg-white"></div>
                </div>

                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "ml-auto pl-8 text-left"}`}>
                  <Card className="bg-gray-800 border-gray-700">
                    <CardContent className="p-6">
                      <div className="mb-2 text-2xl font-bold text-teal-400">{event.year}</div>
                      {event.title && <h3 className="mb-2 text-lg font-semibold text-white">{event.title}</h3>}
                      <p className="text-gray-300">{event.description || event.event}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
