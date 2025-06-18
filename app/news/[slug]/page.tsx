import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { client, urlFor, sanityConfigured } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

// Disable static generation for now to allow dynamic routing
export const dynamic = "force-dynamic"

// Enhanced helper function to get image URL from Sanity with CDN URL detection
function getSanityImageUrl(imageField: any, width = 1200, height = 675): string {
  console.log("🖼️ getSanityImageUrl called with:", { imageField, width, height })

  if (!imageField) {
    console.log("❌ No image field provided")
    return "/placeholder.svg"
  }

  // Method 1: Check if it's already a Sanity CDN URL
  if (typeof imageField === "string") {
    if (imageField.includes("cdn.sanity.io/images")) {
      console.log("✅ Using existing Sanity CDN URL:", imageField)
      // Optionally add width and height parameters if needed
      const url = new URL(imageField)
      url.searchParams.set("w", width.toString())
      url.searchParams.set("h", height.toString())
      url.searchParams.set("fit", "crop")
      url.searchParams.set("auto", "format")
      return url.toString()
    }

    // Handle local file paths
    if (imageField.startsWith("/") || imageField.startsWith("http")) {
      console.log("✅ Using local/external URL:", imageField)
      return imageField
    }
  }

  // Method 2: Check if it's a Sanity asset reference
  if (imageField.asset) {
    // Direct asset URL (most reliable)
    if (imageField.asset.url) {
      console.log("✅ Using direct asset URL:", imageField.asset.url)
      return imageField.asset.url
    }

    // Build URL manually from asset reference
    if (imageField.asset._ref && imageField.asset._ref.startsWith("image-")) {
      const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
      const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

      if (projectId && dataset) {
        const assetId = imageField.asset._ref
        // Parse asset reference: image-{id}-{dimensions}-{format}
        const match = assetId.match(/image-([a-f\d]+)-(\d+x\d+)-(\w+)/)

        if (match) {
          const [, id, dimensions, format] = match
          const manualUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}?w=${width}&h=${height}&fit=crop&auto=format`
          console.log("✅ Generated manual URL:", manualUrl)
          return manualUrl
        } else {
          console.warn("❌ Invalid asset reference format:", assetId)
        }
      }
    }

    // Use urlFor builder (only for valid Sanity assets)
    if (urlFor && imageField.asset._ref && imageField.asset._ref.startsWith("image-")) {
      try {
        const urlBuilder = urlFor(imageField)
        if (urlBuilder) {
          const url = urlBuilder.width(width).height(height).fit("crop").auto("format").url()
          console.log("✅ Generated URL with urlFor:", url)
          return url || "/placeholder.svg"
        }
      } catch (error) {
        console.error("❌ Error with urlFor:", error)
      }
    }
  }

  // Method 3: If it's a direct Sanity asset object without nested structure
  if (imageField._ref && imageField._ref.startsWith("image-")) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

    if (projectId && dataset) {
      const assetId = imageField._ref
      const match = assetId.match(/image-([a-f\d]+)-(\d+x\d+)-(\w+)/)

      if (match) {
        const [, id, dimensions, format] = match
        const manualUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}?w=${width}&h=${height}&fit=crop&auto=format`
        console.log("✅ Generated manual URL from direct ref:", manualUrl)
        return manualUrl
      }
    }
  }

  console.log("❌ All methods failed, using placeholder")
  return "/placeholder.svg"
}

// Custom PortableText components for proper formatting
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={getSanityImageUrl(value, 800, 450) || "/placeholder.svg"}
          alt={value.alt || ""}
          width={800}
          height={450}
          className="rounded-lg w-full"
        />
        {value.caption && <p className="text-sm text-gray-400 mt-2 text-center italic">{value.caption}</p>}
      </div>
    ),
  },
  block: {
    // Headings
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mb-6 mt-8 text-white">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mb-4 mt-6 text-white">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mb-3 mt-5 text-white">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-bold mb-2 mt-4 text-white">{children}</h4>,

    // Paragraphs
    normal: ({ children }: any) => <p className="mb-4 text-gray-300 leading-relaxed text-lg">{children}</p>,

    // Block quotes
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-teal-600 pl-6 my-6 italic text-gray-300 bg-gray-900 py-4 rounded-r-lg">
        {children}
      </blockquote>
    ),
  },
  list: {
    // Bullet lists
    bullet: ({ children }: any) => <ul className="list-disc list-inside mb-4 text-gray-300 space-y-2">{children}</ul>,
    // Numbered lists
    number: ({ children }: any) => (
      <ol className="list-decimal list-inside mb-4 text-gray-300 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    // List items
    bullet: ({ children }: any) => <li className="mb-1">{children}</li>,
    number: ({ children }: any) => <li className="mb-1">{children}</li>,
  },
  marks: {
    // Bold text
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
    // Italic text
    em: ({ children }: any) => <em className="italic">{children}</em>,
    // Underline
    underline: ({ children }: any) => <u className="underline">{children}</u>,
    // Strike through
    "strike-through": ({ children }: any) => <s className="line-through">{children}</s>,
    // Code
    code: ({ children }: any) => (
      <code className="bg-gray-800 text-teal-400 px-2 py-1 rounded text-sm font-mono">{children}</code>
    ),
    // Links
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-teal-400 hover:text-teal-300 underline transition-colors"
        target={value.blank ? "_blank" : undefined}
        rel={value.blank ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    ),
  },
}

async function getArticle(slug: string) {
  try {
    // Sanitize the incoming slug parameter
    const cleanSlug = slug.trim()

    console.log(`🔍 Looking for article with slug: "${slug}"`)
    console.log(`🔍 Clean slug: "${cleanSlug}"`)

    if (sanityConfigured && client) {
      // First, let's see what posts actually exist
      const allPosts = await client.fetch(`*[_type == "post"] {
        _id,
        title,
        "slug": slug.current,
        publishedAt
      }`)
      console.log("📋 All available posts:", allPosts)

      // Try to fetch post with comprehensive slug matching
      const postQuery = `*[_type == "post" && (
        slug.current == $slug || 
        slug.current == $cleanSlug ||
        slug.current == $decodedSlug ||
        slug.current == $trimmedSlug
      )][0] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        image {
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          },
          alt
        },
        body,
        featured,
        author->{
          name
        },
        category->{
          title
        },
        sportTags
      }`

      const post = await client.fetch(postQuery, {
        slug,
        cleanSlug,
        decodedSlug: decodeURIComponent(slug).trim(),
        trimmedSlug: slug.replace(/^%20/, "").trim(),
      })

      console.log("📄 Post query result:", post)

      if (post) {
        // Transform post to article format
        let excerpt = post.excerpt || "Read more about this story..."

        // If no excerpt, extract from body
        if (!post.excerpt && post.body && Array.isArray(post.body)) {
          const textBlock = post.body.find(
            (block: any) => block._type === "block" && block.children && Array.isArray(block.children),
          )
          if (textBlock) {
            const textSpan = textBlock.children.find((child: any) => child._type === "span" && child.text)
            if (textSpan && textSpan.text) {
              excerpt = textSpan.text.substring(0, 200) + "..."
            }
          }
        }

        return {
          _id: post._id,
          title: post.title,
          slug: post.slug,
          excerpt: excerpt,
          content: post.body,
          featuredImage: post.image,
          publishedAt: post.publishedAt,
          author: { name: post.author?.name || "Admin" },
          category: { title: post.category?.title || "News" },
          sportTags: post.sportTags || [],
        }
      }

      // Try articles as fallback
      const articleQuery = `*[_type == "article" && (
        slug.current == $slug || 
        slug.current == $cleanSlug ||
        slug.current == $decodedSlug ||
        slug.current == $trimmedSlug
      )][0] {
        _id,
        title,
        slug,
        excerpt,
        content,
        featuredImage {
          asset->{
            _id,
            url,
            metadata {
              dimensions {
                width,
                height
              }
            }
          },
          alt
        },
        publishedAt,
        sportTags,
        author->{
          name,
          slug,
          image,
          bio
        },
        category->{
          title,
          slug
        }
      }`

      const article = await client.fetch(articleQuery, {
        slug,
        cleanSlug,
        decodedSlug: decodeURIComponent(slug).trim(),
        trimmedSlug: slug.replace(/^%20/, "").trim(),
      })

      console.log("📰 Article query result:", article)

      if (article) return article

      // Check if there are any similar slugs
      const similarSlugs = await client.fetch(`*[_type == "post" || _type == "article"] {
        "slug": slug.current,
        title,
        _type
      }`)

      console.log("🔍 All available slugs:", similarSlugs)

      // Try partial matching
      const partialMatch = similarSlugs.find(
        (item: any) =>
          item.slug &&
          (item.slug.includes(cleanSlug) ||
            cleanSlug.includes(item.slug) ||
            item.slug.toLowerCase().includes(cleanSlug.toLowerCase())),
      )

      if (partialMatch) {
        console.log("🎯 Found partial match:", partialMatch)
        // Recursively call with the correct slug
        return getArticle(partialMatch.slug)
      }
    }

    // Enhanced static fallback with the specific article
    const staticArticles = [
      {
        _id: "static-1",
        title: "From Oceania to Euro: A Paralympic Journey",
        slug: { current: "from-oceania-to-euro" },
        excerpt:
          "Follow the incredible journey of Paralympic athletes as they transition from Oceania competitions to European championships, showcasing the global nature of Paralympic sport.",
        content: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "The Paralympic movement has always been about breaking barriers and connecting athletes across continents. This story follows several remarkable athletes who have made the transition from competing in Oceania to establishing themselves on the European Paralympic circuit.",
              },
            ],
          },
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "From the swimming pools of Australia to the athletics tracks of Germany, these athletes have shown that Paralympic sport truly knows no boundaries. Their journeys represent not just personal achievement, but the global unity that defines the Paralympic movement.",
              },
            ],
          },
        ],
        featuredImage: "/paralympic-stadium.png",
        publishedAt: "2024-06-15T10:00:00Z",
        author: { name: "Sarah Mitchell" },
        category: { title: "Paralympic Stories" },
        sportTags: ["para-athletics", "para-swimming"],
      },
      {
        _id: "1",
        title: "Dunn breaks world record in 100m freestyle S14",
        slug: { current: "dunn-breaks-world-record-100m-freestyle" },
        excerpt:
          "British swimmer Reece Dunn has broken his own world record in the men's 100m freestyle S14 at the World Para Swimming Championships in Manchester.",
        content: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "In a stunning display of athletic prowess, British swimmer Reece Dunn shattered his own world record in the men's 100m freestyle S14 at the World Para Swimming Championships held in Manchester. The 27-year-old touched the wall in a remarkable time of 51.90 seconds, improving on his previous record by 0.15 seconds.",
              },
            ],
          },
        ],
        featuredImage: "/para-swimming-competition.png",
        publishedAt: "2024-05-02T10:00:00Z",
        author: { name: "James Wilson" },
        category: { title: "Para Swimming" },
        sportTags: ["para-swimming"],
      },
      {
        _id: "2",
        title: "Patrick Anderson: The Unstoppable Force of Wheelchair Basketball",
        slug: { current: "patrick-anderson-the-unstoppable-force-of-wheelchair-basketball" },
        excerpt:
          "Patrick Anderson has officially announced his retirement from wheelchair basketball, marking the end of an era for the sport.",
        content: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Patrick Anderson has officially announced his retirement from wheelchair basketball, marking the end of an era for the sport. Widely regarded as the greatest player in wheelchair basketball history, Anderson's impact on the game cannot be overstated.",
              },
            ],
          },
        ],
        featuredImage: "/wheelchair-basketball-action.png",
        publishedAt: "2024-03-24T10:00:00Z",
        author: { name: "Admin" },
        category: { title: "News" },
        sportTags: ["wheelchair-basketball"],
      },
    ]

    // Try to match with various slug formats
    const matchingSlugs = [
      cleanSlug,
      slug,
      slug.replace(/^%20/, ""),
      decodeURIComponent(slug).trim(),
      slug.toLowerCase(),
      cleanSlug.toLowerCase(),
    ]

    for (const testSlug of matchingSlugs) {
      const found = staticArticles.find(
        (article) => article.slug.current === testSlug || article.slug.current.toLowerCase() === testSlug.toLowerCase(),
      )
      if (found) {
        console.log(`✅ Found static article with slug: ${testSlug}`)
        return found
      }
    }

    console.log(`❌ No article found for any of these slugs:`, matchingSlugs)
    return null
  } catch (error) {
    console.error("💥 Error fetching article:", error)
    return null
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  console.log("ArticlePage called with slug:", params.slug)

  const article = await getArticle(params.slug)

  if (!article) {
    console.log("Article not found, showing 404")
    notFound()
  }

  const publishedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  // Use the enhanced helper function to get the proper image URL
  const imageUrl = getSanityImageUrl(article.featuredImage, 1200, 675)

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />
      <main className="flex-1">
        <article className="py-12">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              {/* Back Button */}
              <Button asChild variant="ghost" className="mb-6 text-gray-400 hover:text-white">
                <Link href="/news">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to News
                </Link>
              </Button>

              {/* Article Header */}
              <header className="mb-8">
                <div className="mb-4 inline-block rounded bg-teal-600 px-3 py-1 text-sm font-medium text-white">
                  {article.category?.title}
                </div>
                <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">{article.title}</h1>
                <p className="mb-6 text-xl text-gray-300">{article.excerpt}</p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{publishedDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>By {article.author?.name}</span>
                  </div>
                </div>
              </header>

              {/* Featured Image */}
              <div className="mb-8">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={article.title}
                  width={1200}
                  height={675}
                  className="aspect-video w-full rounded-lg object-cover"
                />
              </div>

              {/* Article Content */}
              <div className="max-w-none">
                {article.content ? (
                  <PortableText value={article.content} components={portableTextComponents} />
                ) : (
                  <p className="text-gray-300">Article content will be displayed here when available.</p>
                )}
              </div>

              {/* Sport Tags */}
              {article.sportTags && article.sportTags.length > 0 && (
                <div className="mt-8 border-t border-gray-800 pt-8">
                  <h3 className="mb-4 text-lg font-semibold">Related Sports</h3>
                  <div className="flex flex-wrap gap-2">
                    {article.sportTags.map((tag: string) => (
                      <span key={tag} className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300">
                        {tag.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </article>
      </main>
      <EnhancedFooter />
    </div>
  )
}
