import { createClient } from "next-sanity"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-05-03",
  useCdn: true,
})

// Initialize the image URL builder
const builder = imageUrlBuilder(client)

// Exportable urlFor helper function
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Helper to get thumbnail URL with specific dimensions
export function getThumbnailUrl(imageSource: SanityImageSource | null | undefined, width = 800, height = 450): string {
  if (!imageSource) {
    return "/placeholder.svg"
  }

  try {
    return urlFor(imageSource).width(width).height(height).fit("crop").crop("center").auto("format").quality(80).url()
  } catch (error) {
    console.error("Error generating thumbnail URL:", error)
    return "/placeholder.svg"
  }
}

export { client }
