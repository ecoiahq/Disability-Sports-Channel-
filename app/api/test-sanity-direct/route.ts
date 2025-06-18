import { NextResponse } from "next/server"
import { createClient } from "next-sanity"

export async function GET() {
  // Create a fresh client with minimal config
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2023-05-03",
    useCdn: false,
  })

  try {
    // Get posts with the simplest possible query
    const posts = await client.fetch(`*[_type == "post"] {
      _id,
      title,
      image
    }`)

    // For each post, try to get the image URL in the most direct way
    const results = []
    for (const post of posts) {
      let imageUrl = null

      if (post.image?.asset?._ref) {
        // Build URL directly from reference
        const ref = post.image.asset._ref
        const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
        const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

        if (ref.startsWith("image-")) {
          const [, id, dimensions, format] = ref.match(/image-([a-f\d]+)-(\d+x\d+)-(\w+)/) || []
          if (id && dimensions && format) {
            imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
          }
        }
      }

      results.push({
        title: post.title,
        imageRef: post.image?.asset?._ref,
        generatedUrl: imageUrl,
        rawImage: post.image,
      })
    }

    return NextResponse.json({
      success: true,
      posts: results,
      env: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? "SET" : "MISSING",
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      },
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      env: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? "SET" : "MISSING",
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      },
    })
  }
}
