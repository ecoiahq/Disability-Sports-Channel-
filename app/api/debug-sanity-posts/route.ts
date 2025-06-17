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

    // Also check if there are any articles instead of posts
    const articles = await client.fetch(`*[_type == "article"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      featuredImage {
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
      content,
      featured
    }`)

    console.log("📊 Articles fetched:", articles?.length || 0)

    return NextResponse.json({
      success: true,
      postsCount: posts?.length || 0,
      articlesCount: articles?.length || 0,
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
      articles:
        articles?.map((article: any) => ({
          id: article._id,
          title: article.title,
          slug: article.slug?.current,
          publishedAt: article.publishedAt,
          imageField: article.featuredImage,
          imageAssetUrl: article.featuredImage?.asset?.url,
          imageAssetId: article.featuredImage?.asset?._id,
          imageAssetType: article.featuredImage?.asset?._type,
          imageAssetFilename: article.featuredImage?.asset?.originalFilename,
          hasImage: !!article.featuredImage,
          hasAsset: !!article.featuredImage?.asset,
          hasAssetUrl: !!article.featuredImage?.asset?.url,
        })) || [],
      environment: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
        apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
      },
      recommendation: posts?.every((post: any) => !post.image)
        ? "All posts have null image fields. You need to add images to your posts in Sanity Studio."
        : "Some posts have images, check individual post image fields.",
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
