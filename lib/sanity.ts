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

console.log("🔧 Sanity configuration:", {
  projectId: projectId ? `✓ ${projectId}` : "✗ Missing",
  dataset,
  apiVersion,
  sanityConfigured,
})

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

// Image URL builder
const builder = sanityConfigured && client ? imageUrlBuilder(client) : null

export function urlFor(source: any) {
  if (!builder || !source) {
    return null
  }

  try {
    return builder.image(source)
  } catch (error) {
    console.error("❌ urlFor error:", error)
    return null
  }
}

// Enhanced image URL generation function
export function generateImageUrl(imageField: any, width = 800, height = 450): string {
  console.log("🎨 generateImageUrl called:", { imageField, width, height })

  if (!imageField) {
    console.log("❌ No image field provided")
    return "/placeholder.svg"
  }

  // Method 1: Direct asset URL (most reliable)
  if (imageField.asset?.url) {
    console.log("✅ Using direct asset URL:", imageField.asset.url)
    return imageField.asset.url
  }

  // Method 2: Build URL manually from asset reference
  if (imageField.asset?._ref && sanityConfigured) {
    const assetId = imageField.asset._ref
    // Parse asset reference: image-{id}-{dimensions}-{format}
    const match = assetId.match(/image-([a-f\d]+)-(\d+x\d+)-(\w+)/)

    if (match) {
      const [, id, dimensions, format] = match
      const manualUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}?w=${width}&h=${height}&fit=crop`
      console.log("✅ Generated manual URL:", manualUrl)
      return manualUrl
    }
  }

  // Method 3: Use urlFor builder
  if (urlFor && imageField) {
    try {
      const urlBuilder = urlFor(imageField)
      if (urlBuilder) {
        const url = urlBuilder.width(width).height(height).fit("crop").url()
        console.log("✅ Generated URL with urlFor:", url)
        return url
      }
    } catch (error) {
      console.error("❌ Error with urlFor:", error)
    }
  }

  // Method 4: String URL fallback
  if (typeof imageField === "string") {
    console.log("✅ Using string URL:", imageField)
    return imageField
  }

  console.log("❌ All methods failed, using placeholder")
  return "/placeholder.svg"
}

// Simple GROQ queries without complex projections
export const BASIC_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  image,
  body,
  featured
}`

export const BASIC_FEATURED_POSTS_QUERY = `*[_type == "post" && featured == true] | order(publishedAt desc) [0...2] {
  _id,
  title,
  slug,
  publishedAt,
  image,
  body,
  featured
}`

export const BASIC_LATEST_POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) [0...6] {
  _id,
  title,
  slug,
  publishedAt,
  image,
  body,
  featured
}`

export const BASIC_POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  image,
  body,
  featured
}`

// Add missing exports for backward compatibility
export const ARTICLE_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  image,
  body,
  featured
}`

// Also add other potentially missing exports for compatibility
export const ARTICLES_QUERY = BASIC_POSTS_QUERY
export const FEATURED_ARTICLES_QUERY = BASIC_FEATURED_POSTS_QUERY
export const LATEST_ARTICLES_QUERY = BASIC_LATEST_POSTS_QUERY
export const POST_BY_SLUG_QUERY = BASIC_POST_BY_SLUG_QUERY
export const FEATURED_POSTS_QUERY = BASIC_FEATURED_POSTS_QUERY
export const LATEST_POSTS_QUERY = BASIC_LATEST_POSTS_QUERY
export const ALL_POSTS_QUERY = BASIC_POSTS_QUERY

// Test Sanity connection with the simplest possible query
export async function testSanityConnection() {
  if (!sanityConfigured || !client) {
    console.log("❌ Sanity not configured")
    return { success: false, error: "Sanity not configured" }
  }

  try {
    // Test with the absolute simplest query
    const result = await client.fetch(`*[_type == "post"][0...1] {
      _id,
      title
    }`)

    console.log("✅ Sanity connection test successful:", result)
    return { success: true, data: result }
  } catch (error) {
    console.error("❌ Sanity connection test failed:", error)
    return { success: false, error }
  }
}

// Cached fetch functions with minimal queries
export async function fetchFeaturedArticles() {
  if (!sanityConfigured || !client) {
    console.log("❌ Sanity not configured, returning empty array")
    return []
  }

  try {
    console.log("🔍 Fetching featured articles...")
    const result = await client.fetch(BASIC_FEATURED_POSTS_QUERY)
    console.log("⭐ Raw featured articles result:", result)
    return result
  } catch (error) {
    console.error("❌ Error fetching featured articles:", error)
    return []
  }
}

export async function fetchLatestArticles() {
  if (!sanityConfigured || !client) {
    console.log("❌ Sanity not configured, returning empty array")
    return []
  }

  try {
    console.log("🔍 Fetching latest articles...")
    const result = await client.fetch(BASIC_LATEST_POSTS_QUERY)
    console.log("📰 Raw latest articles result:", result)
    return result
  } catch (error) {
    console.error("❌ Error fetching latest articles:", error)
    return []
  }
}

export async function fetchAllArticles() {
  if (!sanityConfigured || !client) {
    console.log("❌ Sanity not configured, returning empty array")
    return []
  }

  try {
    console.log("🔍 Fetching all articles...")
    const result = await client.fetch(BASIC_POSTS_QUERY)
    console.log("📄 Raw all articles result:", result)
    return result
  } catch (error) {
    console.error("❌ Error fetching all articles:", error)
    return []
  }
}

// Fetch all slugs for dynamic routing
export async function fetchAllSlugs() {
  if (!sanityConfigured || !client) return []

  try {
    const slugs = await client.fetch(`*[_type == "post"] {
      "slug": slug.current,
      _type
    }`)

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

// Alias functions for backward compatibility
export const fetchArticles = fetchAllArticles
