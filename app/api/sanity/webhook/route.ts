import { revalidateTag } from "next/cache";

export async function POST(req: Request) {
  revalidateTag("articles");
  revalidateTag("featured-articles");
  revalidateTag("latest-articles");
  return Response.json({ message: "Webhook received" });
}

fetch(query, { next: { tags: ["articles"] } });
