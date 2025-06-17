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

// Custom PortableText components for proper formatting
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={urlFor && urlFor(value) ? urlFor(value).width(800).height(450).url() : "/placeholder.svg"}
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

    console.log(`Looking for article with slug: "${slug}" or clean slug: "${cleanSlug}"`)

    if (sanityConfigured && client) {
      // Try to fetch post first - with more flexible slug matching
      const postQuery = `*[_type == "post" && (
        slug.current == $slug || 
        slug.current == $cleanSlug ||
        slug.current == $trimmedSlug
      )][0] {
        _id,
        title,
        slug,
        publishedAt,
        image {
          asset->{
            _id,
            url
          },
          alt
        },
        body,
        featured
      }`

      const post = await client.fetch(postQuery, {
        slug,
        cleanSlug,
        trimmedSlug: slug.replace(/^%20/, "").trim(), // Remove URL encoded space at start
      })

      console.log("Post query result:", post)

      if (post) {
        // Transform post to article format
        const excerpt =
          post.body
            ?.find((block: any) => block._type === "block")
            ?.children?.find((child: any) => child._type === "span")
            ?.text?.substring(0, 200) + "..." || "No excerpt available"

        return {
          _id: post._id,
          title: post.title,
          slug: post.slug,
          excerpt: excerpt,
          content: post.body,
          featuredImage: post.image,
          publishedAt: post.publishedAt,
          author: { name: "Admin" },
          category: { title: "News" },
          sportTags: [],
        }
      }

      // Try to fetch all posts to debug
      const allPosts = await client.fetch(`*[_type == "post"] {
        _id,
        title,
        "slug": slug.current
      }`)
      console.log("All available posts:", allPosts)

      // Fallback to article with flexible matching
      const articleQuery = `*[_type == "article" && (
        slug.current == $slug || 
        slug.current == $cleanSlug ||
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
            url
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
        trimmedSlug: slug.replace(/^%20/, "").trim(),
      })

      console.log("Article query result:", article)

      if (article) return article
    }

    // Fallback to static article data for testing
    const staticArticles = [
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
          "Patrick Anderson has officially announced his retirement from wheelchair basketball, marking the end of an era for the sport. Widely regarded as the greatest player in wheelchair basketball history, Anderson's impact on the game cannot be overstated.",
        content: [
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Patrick Anderson has officially announced his retirement from wheelchair basketball, marking the end of an era for the sport. Widely regarded as the greatest player in wheelchair basketball history, Anderson's impact on the game cannot be overstated. Over his illustrious career, he has won three Paralympic gold medals, led Canada to numerous international victories, and inspired countless athletes around the world.",
              },
            ],
          },
          {
            _type: "block",
            children: [
              {
                _type: "span",
                text: "Born in Fergus, Ontario, Anderson lost both his legs in a drunk driving accident at the age of nine. Rather than let this define him negatively, he channeled his energy into sports, eventually discovering wheelchair basketball. His natural talent, combined with an unrelenting work ethic, quickly set him apart from his peers.",
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
      slug.replace(/^%20/, ""), // Remove URL encoded space
      decodeURIComponent(slug).trim(), // Decode URL encoding
    ]

    for (const testSlug of matchingSlugs) {
      const found = staticArticles.find((article) => article.slug.current === testSlug)
      if (found) {
        console.log(`Found static article with slug: ${testSlug}`)
        return found
      }
    }

    console.log(`No article found for any of these slugs:`, matchingSlugs)
    return null
  } catch (error) {
    console.error("Error fetching article:", error)
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

  // Fix image URL generation
  let imageUrl = "/placeholder.svg"
  if (article.featuredImage) {
    if (urlFor && article.featuredImage.asset) {
      // Sanity image with asset reference
      imageUrl = urlFor(article.featuredImage).width(1200).height(675).url()
    } else if (typeof article.featuredImage === "string") {
      // Direct URL
      imageUrl = article.featuredImage
    } else if (article.featuredImage.asset?.url) {
      // Direct asset URL
      imageUrl = article.featuredImage.asset.url
    }
  }

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
