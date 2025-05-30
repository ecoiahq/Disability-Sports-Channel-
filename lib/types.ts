// Common types used throughout the application

export interface Article {
  id: number
  title: string
  excerpt: string
  content?: string
  image: string
  date: string
  author: string
  category: string
  url: string
}

export interface LiveEvent {
  id: number
  title: string
  image: string
  viewers?: string
  time?: string
  category: string
  url: string
}

export interface PodcastEpisode {
  id: number
  title: string
  guest: string
  description?: string
  image: string
  duration: string
  date?: string
  url: string
}

export interface VideoContent {
  id: number
  title: string
  description?: string
  image: string
  category: string
  duration?: string
  url: string
  views?: string
  date?: string
}
