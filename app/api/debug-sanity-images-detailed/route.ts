import { NextResponse } from "next/server"
import { client, sanityConfigured } from "@/lib/sanity"

export async function GET() {
  console.log("🔍 DETAILED IMAGE DEBUG: Starting comprehensive Sanity image analysis")

  if (!sanityConfigured || !client) {
    return NextResponse.json({ error: "Sanity not configured" }, { status: 500 })
  }

  try {
    // Get ALL possible image data with every possible field
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) {
      _id,
      _type,
      title,
      slug,
      publishedAt,
      image,
      "imageRaw": image,
      "imageAsset": image.asset,
      "imageAssetResolved": image.asset->,
      body,
      featured,
      // Get ALL fields to see what's available
      ...
    }`)

    // Also check for any image assets in the system
    const allImageAssets = await client.fetch(`*[_type == "sanity.imageAsset"] | order(_createdAt desc) [0...10] {
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
    }`)

    // Check if there are any references to images
    const imageReferences = await client.fetch(`*[references(*[_type == "sanity.imageAsset"]._id)] {
      _id,
      _type,
      title,
      "referencedImages": *[_type == "sanity.imageAsset" && _id in ^.image.asset._ref] {
        _id,
        url,
        originalFilename
      }
    }`)

    console.log("📊 Analysis complete:")
    console.log("  - Posts found:", posts?.length || 0)
    console.log("  - Image assets found:", allImageAssets?.length || 0)
    console.log("  - Image references found:", imageReferences?.length || 0)

    return NextResponse.json({
      success: true,
      analysis: {
        postsCount: posts?.length || 0,
        imageAssetsCount: allImageAssets?.length || 0,
        imageReferencesCount: imageReferences?.length || 0,
      },
      posts:
        posts?.map((post: any) => ({
          id: post._id,
          title: post.title,
          slug: post.slug?.current,
          publishedAt: post.publishedAt,

          // All possible image field variations
          hasImageField: !!post.image,
          imageField: post.image,
          imageRaw: post.imageRaw,
          imageAsset: post.imageAsset,
          imageAssetResolved: post.imageAssetResolved,

          // Check all possible nested structures
          imageAssetUrl: post.image?.asset?.url,
          imageAssetId: post.image?.asset?._id,
          imageAssetRef: post.image?.asset?._ref,

          // Get all keys to see what fields exist
          allKeys: Object.keys(post || {}),

          // Check if image field has any data at all
          imageFieldType: typeof post.image,
          imageFieldKeys: post.image ? Object.keys(post.image) : [],
        })) || [],

      // Show available image assets in Sanity
      availableImageAssets:
        allImageAssets?.map((asset: any) => ({
          id: asset._id,
          url: asset.url,
          filename: asset.originalFilename,
          size: asset.size,
          dimensions: asset.metadata?.dimensions,
        })) || [],

      // Show any image references
      imageReferences: imageReferences || [],

      // Environment info
      environment: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
      },

      // Recommendations
      recommendations: [
        posts?.every((post: any) => !post.image)
          ? "❌ No posts have image fields populated"
          : "✅ Some posts have image fields",
        allImageAssets?.length > 0
          ? `✅ Found ${allImageAssets.length} image assets in Sanity`
          : "❌ No image assets found in Sanity",
        "🔧 Check if images are assigned to the 'image' field in your posts",
        "🔧 Verify that your Sanity schema has an 'image' field for posts",
      ],
    })
  } catch (error) {
    console.error("❌ Detailed debug error:", error)
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
