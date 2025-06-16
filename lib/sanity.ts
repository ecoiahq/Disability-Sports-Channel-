import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

// Check if Sanity is configured
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01"

export const sanityConfigured = !!(projectId && dataset)

// Create client configuration
const config = {
  projectId: projectId || "",
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  perspective: "published" as const,
}

// Only create client if Sanity is configured
export const client = sanityConfigured ? createClient(config) : null

// Create client for server-side operations (with token if needed)
export const serverClient = sanityConfigured
  ? createClient({
      ...config,
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    })
  : null

const builder = sanityConfigured && client ? imageUrlBuilder(client) : null

export function urlFor(source: any) {
  if (!builder) return null
  return builder.image(source)
}

// GROQ queries with caching tags
export const ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  featured,
  sportTags,
  author->{
    name,
    slug
  },
  category->{
    title,
    slug
  }
}`

export const FEATURED_ARTICLES_QUERY = `*[_type == "article" && featured == true] | order(publishedAt desc) [0...2] {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  sportTags,
  author->{
    name,
    slug
  },
  category->{
    title,
    slug
  }
}`

export const LATEST_ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc) [0...6] {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  sportTags,
  author->{
    name,
    slug
  },
  category->{
    title,
    slug
  }
}`

export const ARTICLE_BY_SLUG_QUERY = `*[_type == "article" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  excerpt,
  content,
  featuredImage,
  publishedAt,
  sportTags,
  author->{
    name,
    slug,
    image,
    bio
  },
  category->{
    title,
    slug
  }
}`

// Cached fetch functions
export async function fetchArticles() {
  if (!sanityConfigured || !client) return []

  try {
    return await client.fetch(
      ARTICLES_QUERY,
      {},
      {
        cache: "force-cache",
        next: { tags: ["articles"], revalidate: 60 },
      },
    )
  } catch (error) {
    console.error("Error fetching articles:", error)
    return []
  }
}

export async function fetchFeaturedArticles() {
  if (!sanityConfigured || !client) return []

  try {
    return await client.fetch(
      FEATURED_ARTICLES_QUERY,
      {},
      {
        cache: "force-cache",
        next: { tags: ["featured-articles"], revalidate: 60 },
      },
    )
  } catch (error) {
    console.error("Error fetching featured articles:", error)
    return []
  }
}

export async function fetchLatestArticles() {
  if (!sanityConfigured || !client) return []

  try {
    return await client.fetch(
      LATEST_ARTICLES_QUERY,
      {},
      {
        cache: "force-cache",
        next: { tags: ["latest-articles"], revalidate: 60 },
      },
    )
  } catch (error) {
    console.error("Error fetching latest articles:", error)
    return []
  }
}
