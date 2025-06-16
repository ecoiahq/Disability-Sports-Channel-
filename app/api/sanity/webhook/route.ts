import { type NextRequest, NextResponse } from "next/server"
import { revalidateTag } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Verify webhook signature if needed
    // const signature = request.headers.get('sanity-webhook-signature')

    // Revalidate relevant pages when content changes
    if (body._type === "article") {
      revalidateTag("articles")
      revalidateTag("featured-articles")
      revalidateTag("latest-articles")
    }

    return NextResponse.json({ message: "Webhook received" })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 })
  }
}
