import { NextResponse } from "next/server"
import { client, sanityConfigured } from "@/lib/sanity"

export async function GET() {
  console.log("🔍 DEBUG API: Starting Sanity posts debug")

  if (!sanityConfigured || !client) {
    console.log("❌ Sanity not configured")
    return NextResponse.json(
      {
        error: "Sanity not configured",
        sanityConfigured,
        hasClient: !!client,
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      },
      { status: 500 },
    )
  }

  try {
    console.log("✅ Sanity configured, fetching posts...")

    // Get ALL post data with expanded image query
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      image {
        ...,
        asset-> {
          _id,
          _type,
          url,
          originalFilename,
          size,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      body,
      featured
    }`)

    console.log("📊 Posts fetched:", posts?.length || 0)

    // Log each post's image data
    posts?.forEach((post: any, index: number) => {
      console.log(`\n--- POST ${index + 1}: ${post.title} ---`)
      console.log("Image field:", JSON.stringify(post.image, null, 2))
      console.log("Asset URL:", post.image?.asset?.url)
    })

    return NextResponse.json({
      success: true,
      postsCount: posts?.length || 0,
      posts:
        posts?.map((post: any) => ({
          id: post._id,
          title: post.title,
          slug: post.slug?.current,
          publishedAt: post.publishedAt,
          imageField: post.image,
          imageAssetUrl: post.image?.asset?.url,
          imageAssetId: post.image?.asset?._id,
          imageAssetType: post.image?.asset?._type,
          imageAssetFilename: post.image?.asset?.originalFilename,
          hasImage: !!post.image,
          hasAsset: !!post.image?.asset,
          hasAssetUrl: !!post.image?.asset?.url,
        })) || [],
      environment: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
      },
    })
  } catch (error) {
    console.error("❌ Debug API error:", error)
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
