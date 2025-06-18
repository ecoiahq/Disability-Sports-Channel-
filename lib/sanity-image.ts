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
  console.log("🔧 getThumbnailUrl called with:", { imageSource, width, height })

  if (!imageSource) {
    console.log("⚠️ No image source provided, using placeholder")
    return "/placeholder.svg"
  }

  // If the imageSource already has a direct URL, use it
  if (typeof imageSource === "object" && imageSource !== null && "asset" in imageSource) {
    const asset = (imageSource as any).asset
    if (asset && asset.url) {
      console.log("✅ Using direct asset URL:", asset.url)
      return asset.url
    }
  }

  try {
    const url = urlFor(imageSource)
      .width(width)
      .height(height)
      .fit("crop")
      .crop("center")
      .auto("format")
      .quality(80)
      .url()
    console.log("✅ Generated thumbnail URL:", url)
    return url
  } catch (error) {
    console.error("❌ Error generating thumbnail URL:", error)
    console.error("   Image source was:", JSON.stringify(imageSource, null, 2))
    return "/placeholder.svg"
  }
}

export { client }
