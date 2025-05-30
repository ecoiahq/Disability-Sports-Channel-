import type { Article, PodcastEpisode, VideoContent } from "@/lib/types"

/**
 * Data Service
 *
 * This file contains mock data for the application.
 * In a production environment, this would be replaced with API calls.
 */

export const getFeaturedArticles = (): Article[] => {
  return [
    {
      id: 1,
      title: "Dunn breaks world record in 100m freestyle S14",
      excerpt:
        "British swimmer Reece Dunn has broken his own world record in the men's 100m freestyle S14 at the World Para Swimming Championships in Manchester.",
      image: "/para-swimming-competition.png",
      date: "May 2, 2025",
      author: "James Wilson",
      category: "Para Swimming",
      url: "/news/dunn-breaks-world-record-100m-freestyle",
    },
    {
      id: 2,
      title: "Alcott and Schroder to meet in wheelchair tennis final",
      excerpt:
        "Dylan Alcott and Niels Schroder will face off in the wheelchair tennis final after both players secured straight-sets victories in their respective semi-finals.",
      image: "/wheelchair-tennis-match.png",
      date: "May 2, 2025",
      author: "Sarah Johnson",
      category: "Wheelchair Tennis",
      url: "/news/alcott-schroder-wheelchair-tennis-final",
    },
  ]
}

export const getLatestArticles = (): Article[] => {
  return [
    {
      id: 1,
      title: "Stubbs secures gold in dramatic para archery final",
      excerpt:
        "Great Britain's John Stubbs claimed gold in the para archery final with a perfect 10 on his final arrow to edge out China's Zhao Lixue by a single point.",
      image: "/para-archery-competition.png",
      date: "May 2, 2025",
      author: "Michael Chen",
      category: "Para Archery",
      url: "/news/stubbs-gold-para-archery-final",
    },
    {
      id: 2,
      title: "Paralympic Committee announces new classification guidelines for Paris 2024",
      excerpt:
        "The International Paralympic Committee has released updated classification guidelines for the Paris 2024 Paralympic Games, with several key changes to existing categories.",
      image: "/placeholder.svg?key=o63e0",
      date: "May 2, 2025",
      author: "Emma Parker",
      category: "Paralympic News",
      url: "/news/paralympic-committee-new-classification-guidelines",
    },
    {
      id: 3,
      title: "Boccia world rankings updated ahead of World Championships",
      excerpt:
        "The World Boccia Federation has released updated world rankings ahead of next month's World Championships in São Paulo, Brazil.",
      image: "/placeholder.svg?key=j85s8",
      date: "May 2, 2025",
      author: "David Thompson",
      category: "Boccia",
      url: "/news/boccia-world-rankings-update",
    },
    {
      id: 4,
      title: "Para snowboard season to begin with World Cup in Finland",
      excerpt:
        "The 2025-26 Para Snowboard World Cup season will kick off in Finland this November, with over 100 athletes from 25 countries expected to compete.",
      image: "/placeholder.svg?key=rjch1",
      date: "May 2, 2025",
      author: "Lisa Anderson",
      category: "Winter Sports",
      url: "/news/para-snowboard-world-cup-finland",
    },
    {
      id: 5,
      title: "New technology enhances viewing experience for visually impaired fans",
      excerpt:
        "A groundbreaking new technology is set to transform how visually impaired fans experience para sport events, with audio description and haptic feedback.",
      image: "/placeholder.svg?key=ahpsh",
      date: "May 1, 2025",
      author: "Robert Johnson",
      category: "Technology",
      url: "/news/new-technology-visually-impaired-fans",
    },
    {
      id: 6,
      title: "Paris 2024 Paralympic ticket sales break records",
      excerpt:
        "Ticket sales for the Paris 2024 Paralympic Games have broken all previous records, with over 2.5 million tickets already sold 15 months before the event.",
      image: "/placeholder.svg?key=mqz4p",
      date: "May 1, 2025",
      author: "Sophie Martin",
      category: "Paralympic News",
      url: "/news/paris-2024-ticket-sales-record",
    },
  ]
}

// Add more detailed information to live events
export function getLiveEvents() {
  return [
    {
      id: 1,
      title: "Wheelchair Basketball: USA vs Canada - Semifinal",
      category: "Wheelchair Basketball",
      image: "/wheelchair-basketball-action.png",
      url: "/live/wheelchair-basketball-usa-canada-semifinal",
      viewers: "12,458",
    },
    {
      id: 2,
      title: "Para Archery World Cup - Medal Rounds",
      category: "Para Archery",
      image: "/para-archery-competition.png",
      url: "/live/para-archery-world-cup-medal-rounds",
      viewers: "8,921",
    },
    {
      id: 3,
      title: "Blind Football: Brazil vs Spain",
      category: "Blind Football",
      image: "/placeholder.svg?height=340&width=600&query=blind football match action",
      url: "/live/blind-football-brazil-spain",
      viewers: "7,345",
    },
  ]
}

// Add date field to upcoming events
export function getUpcomingEvents() {
  return [
    {
      id: 1,
      title: "Para Swimming World Series - London",
      category: "Para Swimming",
      image: "/para-swimming-competition.png",
      time: "Tomorrow, 14:00 BST",
      date: "May 5, 2025",
      url: "/live/para-swimming-world-series-london",
      viewers: "Starts in 22 hours",
    },
    {
      id: 2,
      title: "Wheelchair Rugby League - Finals",
      category: "Wheelchair Rugby",
      image: "/placeholder.svg?key=7ywek",
      time: "May 6, 19:30 BST",
      date: "May 6, 2025",
      url: "/live/wheelchair-rugby-league-finals",
      viewers: "Starts in 2 days",
    },
    {
      id: 3,
      title: "Para Athletics Grand Prix - Paris",
      category: "Para Athletics",
      image: "/para-athletics-track.png",
      time: "May 8, 12:00 CEST",
      date: "May 8, 2025",
      url: "/live/para-athletics-grand-prix-paris",
      viewers: "Starts in 4 days",
    },
    {
      id: 4,
      title: "Sitting Volleyball World Cup - Quarterfinals",
      category: "Sitting Volleyball",
      image: "/placeholder.svg?height=340&width=600&query=sitting volleyball match",
      time: "May 10, 16:00 BST",
      date: "May 10, 2025",
      url: "/live/sitting-volleyball-world-cup-quarterfinals",
      viewers: "Starts in 6 days",
    },
  ]
}

export const getPodcasts = (): PodcastEpisode[] => {
  return [
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
      image: "/placeholder.svg?height=400&width=400&query=coach with para athletes training",
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
      image: "/placeholder.svg?height=400&width=400&query=sports technology and equipment",
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
      image: "/placeholder.svg?height=400&width=400&query=sports marketing meeting",
      duration: "47:30",
      date: "March 27, 2025",
      url: "/podcasts/business-para-sports",
    },
  ]
}

export const getContentGrid = (category: string): VideoContent[] => {
  // This would typically come from an API or CMS based on the category
  return [
    {
      id: 1,
      title: "Para Athletics World Championships Highlights",
      image: "/para-athletics-track.png",
      category: "Athletics",
      url: "/watch/para-athletics-highlights",
    },
    {
      id: 2,
      title: "Wheelchair Rugby: The Clash of Titans",
      image: "/placeholder.svg?key=yemx0",
      category: "Rugby",
      url: "/watch/wheelchair-rugby-titans",
    },
    {
      id: 3,
      title: "Swimming Stars: Path to Paris 2024",
      image: "/para-swimming-competition.png",
      category: "Swimming",
      url: "/watch/swimming-paris-2024",
    },
    {
      id: 4,
      title: "Inside Look: GB Sitting Volleyball Team",
      image: "/placeholder.svg?height=400&width=600&query=sitting volleyball team",
      category: "Volleyball",
      url: "/watch/sitting-volleyball-gb",
    },
  ]
}

export const getSportsCategories = () => {
  return [
    { name: "Wheelchair Basketball", url: "/sports/wheelchair-basketball" },
    { name: "Para Athletics", url: "/sports/para-athletics" },
    { name: "Para Swimming", url: "/sports/para-swimming" },
    { name: "Sitting Volleyball", url: "/sports/sitting-volleyball" },
    { name: "Wheelchair Rugby", url: "/sports/wheelchair-rugby" },
    { name: "Para Cycling", url: "/sports/para-cycling" },
    { name: "All Sports", url: "/sports" },
  ]
}
