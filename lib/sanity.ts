import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

// Check if Sanity is configured
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

// Validate and clean the API version
function getValidApiVersion(): string {
  const envApiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION

  // If no environment variable, use default
  if (!envApiVersion) {
    return "2023-05-03"
  }

  // Clean the environment variable (remove whitespace)
  const cleanVersion = envApiVersion.trim()

  // Check if it's the legacy version "1"
  if (cleanVersion === "1") {
    return "1"
  }

  // Check if it matches YYYY-MM-DD format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/
  if (dateRegex.test(cleanVersion)) {
    return cleanVersion
  }

  // If invalid format, use default
  console.warn(`Invalid Sanity API version: ${cleanVersion}, using default`)
  return "2023-05-03"
}

const apiVersion = getValidApiVersion()

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

// Image URL builder - fix the image URL generation
const builder = sanityConfigured && client ? imageUrlBuilder(client) : null

export function urlFor(source: any) {
  if (!builder || !source) return null
  return builder.image(source)
}

// GROQ queries for Posts (your current content) - Updated to include image asset reference
export const FEATURED_POSTS_QUERY = `*[_type == "post" && featured == true] | order(publishedAt desc) [0...2] {
  _id,
  title,
  slug,
  publishedAt,
  image {
    asset->{
      _id,
      url
    },
    alt
  },
  body,
  featured
}`

export const LATEST_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) [0...6] {
  _id,
  title,
  slug,
  publishedAt,
  image {
    asset->{
      _id,
      url
    },
    alt
  },
  body,
  featured
}`

export const ALL_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  image {
    asset->{
      _id,
      url
    },
    alt
  },
  body,
  featured
}`

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  image {
    asset->{
      _id,
      url
    },
    alt
  },
  body,
  featured
}`

// GROQ queries for Articles (backward compatibility)
export const ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage {
    asset->{
      _id,
      url
    },
    alt
  },
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
  featuredImage {
    asset->{
      _id,
      url
    },
    alt
  },
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
  featuredImage {
    asset->{
      _id,
      url
    },
    alt
  },
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
  featuredImage {
    asset->{
      _id,
      url
    },
    alt
  },
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
  "featuredImage": select(_type == "post" => image, featuredImage) {
    asset->{
      _id,
      url
    },
    alt
  },
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
  "featuredImage": select(_type == "post" => image, featuredImage) {
    asset->{
      _id,
      url
    },
    alt
  },
  "author": select(_type == "article" => author->{name, slug}, null),
  "category": select(_type == "article" => category->{title, slug}, null),
  "sportTags": select(_type == "article" => sportTags, [])
}`

// Get all slugs for static generation
export const ALL_SLUGS_QUERY = `*[_type == "post" || _type == "article"] {
  "slug": slug.current,
  _type
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

// Fetch all slugs for dynamic routing
export async function fetchAllSlugs() {
  if (!sanityConfigured || !client) return []

  try {
    const slugs = await client.fetch(ALL_SLUGS_QUERY)
    // Clean up slugs by trimming whitespace
    return slugs
      .map((item: any) => ({
        ...item,
        slug: item.slug?.trim() || "",
      }))
      .filter((item: any) => item.slug) // Remove empty slugs
  } catch (error) {
    console.error("Error fetching slugs:", error)
    return []
  }
}
