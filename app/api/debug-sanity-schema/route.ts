import { NextResponse } from "next/server"
import { client, sanityConfigured } from "@/lib/sanity"

export async function GET() {
  console.log("🔍 SCHEMA DEBUG: Checking Sanity schema structure")

  if (!sanityConfigured || !client) {
    return NextResponse.json({ error: "Sanity not configured" }, { status: 500 })
  }

  try {
    // Get the actual schema structure
    const schema = await client.fetch(`*[_type == "sanity.schema"] {
      _id,
      _type,
      name,
      fields
    }`)

    // Get a sample post with ALL fields to see the actual structure
    const samplePost = await client.fetch(`*[_type == "post"][0] {
      ...,
      "allFields": *
    }`)

    // Check what content types exist
    const contentTypes = await client.fetch(`array::unique(*[]._type)`)

    // Get the post schema specifically
    const postSchema = await client.fetch(`*[_type == "sanity.schema" && name == "post"][0]`)

    return NextResponse.json({
      success: true,
      contentTypes: contentTypes || [],
      samplePost: samplePost || null,
      samplePostKeys: samplePost ? Object.keys(samplePost) : [],
      schema: schema || [],
      postSchema: postSchema || null,
      environment: {
        projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
      },
    })
  } catch (error) {
    console.error("❌ Schema debug error:", error)
    return NextResponse.json(
      {
        error: error.message,
        stack: error.stack,
      },
      { status: 500 },
    )
  }
}
