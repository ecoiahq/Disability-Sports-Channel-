import { NextResponse } from "next/server"
import { client, sanityConfigured } from "@/lib/sanity"

export async function GET() {
  if (!sanityConfigured || !client) {
    return NextResponse.json({ error: "Sanity not configured" }, { status: 500 })
  }

  try {
    // Get raw post data to see exact structure
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) [0...3] {
      _id,
      title,
      slug,
      publishedAt,
      image,
      body,
      featured
    }`)

    console.log("🔍 RAW SANITY POSTS DATA:")
    posts.forEach((post: any, index: number) => {
      console.log(`\n--- POST ${index + 1} ---`)
      console.log("Title:", post.title)
      console.log("Image field:", JSON.stringify(post.image, null, 2))
    })

    return NextResponse.json({
      success: true,
      postsCount: posts.length,
      posts: posts.map((post: any) => ({
        title: post.title,
        imageField: post.image,
        imageType: typeof post.image,
        hasAsset: !!post.image?.asset,
        assetUrl: post.image?.asset?.url,
        assetRef: post.image?.asset?._ref,
      })),
    })
  } catch (error) {
    console.error("Debug API error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
