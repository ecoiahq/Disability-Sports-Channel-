"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Clock, ChevronDown, ChevronUp } from "lucide-react"
import type { SportTimeline } from "@/lib/sports-data"

interface TimelineEvent {
  year: string
  title?: string
  event?: string
  description: string
}

interface SportHistoryTimelineProps {
  timeline?: SportTimeline[] | TimelineEvent[]
  events?: TimelineEvent[]
  title?: string
  subtitle?: string
}

export default function SportHistoryTimeline({
  timeline = [],
  events = [],
  title = "SPORT HISTORY",
  subtitle,
}: SportHistoryTimelineProps) {
  // Combine and normalize data from either timeline or events prop
  const timelineData =
    timeline.length > 0
      ? timeline.map((item) => ({
          year: item.year,
          title: "event" in item ? item.event : (item as TimelineEvent).title || "",
          description: item.description,
        }))
      : events.map((item) => ({
          year: item.year,
          title: item.title || item.event || "",
          description: item.description,
        }))

  // If no data is available, don't render the component
  if (timelineData.length === 0) {
    return null
  }

  return (
    <section className="py-24 border-t border-gray-800/50 relative overflow-hidden bg-gray-950">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950/95 to-gray-950"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-900/20 px-4 py-2 mb-4">
            <div className="h-2 w-2 rounded-full bg-teal-400"></div>
            <span className="text-sm font-medium text-teal-300">{title}</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            THE TIMELINE
          </h2>
          {subtitle && <p className="text-lg text-gray-300 max-w-3xl mx-auto">{subtitle}</p>}
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-teal-500/10 via-teal-500/30 to-teal-500/10"></div>

            <div className="space-y-12">
              {timelineData.map((item, index) => (
                <TimelineItem
                  key={index}
                  year={item.year}
                  event={item.title}
                  description={item.description}
                  side={index % 2 === 0 ? "left" : "right"}
                  additionalContent={"additionalContent" in item ? (item as any).additionalContent : undefined}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface TimelineItemProps {
  year: string
  event: string
  description: string
  side: "left" | "right"
  additionalContent?: React.ReactNode
}

function TimelineItem({ year, event, description, side, additionalContent }: TimelineItemProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Determine if this is a major milestone event
  const isMajorEvent =
    event.toLowerCase().includes("paralympic") ||
    event.toLowerCase().includes("world championship") ||
    event.toLowerCase().includes("origins")

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`relative flex items-center ${side === "right" ? "md:justify-start" : "md:justify-end"}`}
    >
      <div
        className={`absolute left-0 md:left-1/2 w-4 h-4 ${isMajorEvent ? "bg-teal-500" : "bg-gray-500"} rounded-full transform ${
          side === "right" ? "md:translate-x-0 md:-translate-x-2" : "md:-translate-x-2"
        } z-10`}
      ></div>

      <div
        className={`bg-gradient-to-br from-gray-900 to-gray-900/50 border border-gray-800/50 p-6 rounded-xl w-full md:max-w-[45%] ${
          side === "right" ? "md:ml-8" : "md:mr-8"
        } hover:border-teal-900/50 transition-colors duration-300 cursor-pointer`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="inline-flex items-center gap-2 rounded-full bg-teal-900/20 px-3 py-1 mb-3">
          <Clock className="h-3 w-3 text-teal-400" />
          <p className="text-xs text-teal-400 font-medium">{year}</p>
        </div>

        <div className="flex items-center justify-between">
          <h3 className={`text-xl font-bold ${isMajorEvent ? "text-teal-400" : "text-white"}`}>{event}</h3>
          <button
            className="text-gray-400 hover:text-teal-400 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              setIsExpanded(!isExpanded)
            }}
          >
            {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="pt-2">
                <p className="text-sm text-gray-300">{description}</p>
                {additionalContent && <div className="mt-3 border-t border-gray-700 pt-3">{additionalContent}</div>}
              </div>
            </motion.div>
          ) : (
            <p className="text-sm text-gray-300 line-clamp-2 mt-2">{description}</p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
