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

// GROQ queries for Posts (your current content)
export const FEATURED_POSTS_QUERY = `*[_type == "post" && featured == true] | order(publishedAt desc) [0...2] {
  _id,
  title,
  slug,
  publishedAt,
  image,
  body,
  featured
}`

export const LATEST_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) [0...6] {
  _id,
  title,
  slug,
  publishedAt,
  image,
  body,
  featured
}`

export const ALL_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  image,
  body,
  featured
}`

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  image,
  body,
  featured
}`

// GROQ queries for Articles (backward compatibility)
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

// Combined queries that check both post and article types
export const COMBINED_FEATURED_QUERY = `*[(_type == "post" || _type == "article") && featured == true] | order(publishedAt desc) [0...2] {
  _id,
  _type,
  title,
  slug,
  publishedAt,
  featured,
  "excerpt": select(_type == "post" => body[0].children[0].text[0...150], excerpt),
  "featuredImage": select(_type == "post" => image, featuredImage),
  "author": select(_type == "article" => author->{name, slug}, null),
  "category": select(_type == "article" => category->{title, slug}, null),
  "sportTags": select(_type == "article" => sportTags, [])
}`

export const COMBINED_LATEST_QUERY = `*[_type == "post" || _type == "article"] | order(publishedAt desc) [0...6] {
  _id,
  _type,
  title,
  slug,
  publishedAt,
  featured,
  "excerpt": select(_type == "post" => body[0].children[0].text[0...150], excerpt),
  "featuredImage": select(_type == "post" => image, featuredImage),
  "author": select(_type == "article" => author->{name, slug}, null),
  "category": select(_type == "article" => category->{title, slug}, null),
  "sportTags": select(_type == "article" => sportTags, [])
}`

// Cached fetch functions
export async function fetchArticles() {
  if (!sanityConfigured || !client) return []

  try {
    return await client.fetch(
      COMBINED_LATEST_QUERY,
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
      COMBINED_FEATURED_QUERY,
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
      COMBINED_LATEST_QUERY,
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
