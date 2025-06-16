import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { client, ARTICLE_BY_SLUG_QUERY, urlFor, sanityConfigured } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"

interface ArticlePageProps {
  params: {
    slug: string
  }
}

async function getArticle(slug: string) {
  try {
    if (sanityConfigured && client) {
      const article = await client.fetch(ARTICLE_BY_SLUG_QUERY, { slug })
      if (article) return article
    }

    // Fallback to static article data
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
    ]

    return staticArticles.find((article) => article.slug.current === slug) || null
  } catch (error) {
    console.error("Error fetching article:", error)
    return null
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await getArticle(params.slug)

  if (!article) {
    notFound()
  }

  const publishedDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const imageUrl =
    article.featuredImage && urlFor
      ? urlFor(article.featuredImage).width(1200).height(675).url()
      : article.featuredImage || "/placeholder.svg"

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
              <div className="prose prose-invert prose-lg max-w-none">
                {article.content ? (
                  <PortableText
                    value={article.content}
                    components={{
                      types: {
                        image: ({ value }) => (
                          <Image
                            src={
                              urlFor && urlFor(value) ? urlFor(value).width(800).height(450).url() : "/placeholder.svg"
                            }
                            alt={value.alt || ""}
                            width={800}
                            height={450}
                            className="rounded-lg"
                          />
                        ),
                      },
                    }}
                  />
                ) : (
                  <p>Article content will be displayed here when available.</p>
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
