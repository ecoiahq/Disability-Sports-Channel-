import { createClient } from "next-sanity"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01"

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

// Check if Sanity is properly configured
export const sanityConfigured = !!(projectId && dataset)

// GROQ queries for both Post and Article content types
export const FEATURED_POSTS_QUERY = `*[_type == "post" && featured == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  image,
  body,
  featured
}`

export const LATEST_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) [0...10] {
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

// Keep existing article queries for backward compatibility
export const FEATURED_ARTICLES_QUERY = `*[_type == "article" && featured == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  author->{name},
  category->{title},
  publishedAt,
  sportTags
}`

export const LATEST_ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc) [0...10] {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  author->{name},
  category->{title},
  publishedAt,
  sportTags
}`

export const ARTICLES_QUERY = `*[_type == "article"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  author->{name},
  category->{title},
  publishedAt,
  sportTags
}`

// Image URL builder
import imageUrlBuilder from "@sanity/image-url"

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}
