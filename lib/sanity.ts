import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"

// Check if Sanity is configured
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

export const sanityConfigured = !!(projectId && dataset)

// Only create client if Sanity is configured
export const client = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: false, // Set to true in production for better performance
    })
  : null

const builder = sanityConfigured && client ? imageUrlBuilder(client) : null

export function urlFor(source: any) {
  if (!builder) return null
  return builder.image(source)
}

// GROQ queries
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
