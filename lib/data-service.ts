import { client, sanityConfigured, LATEST_ARTICLES_QUERY, ARTICLES_QUERY, ALL_POSTS_QUERY } from "@/lib/sanity"
import type { Article, PodcastEpisode, VideoContent } from "@/lib/types"

/**
 * Data Service - SIMPLIFIED IMAGE HANDLING
 */

// Simplified image URL generation - focusing on what actually works
function getSanityImageUrl(imageField: any, width = 800, height = 450): string {
  console.log("🖼️ SIMPLIFIED getSanityImageUrl:")
  console.log("Input:", JSON.stringify(imageField, null, 2))

  if (!imageField) {
    console.log("❌ No image field")
    return "/placeholder.svg"
  }

  // Method 1: Direct asset URL (most common)
  if (imageField.asset?.url) {
    console.log("✅ FOUND DIRECT URL:", imageField.asset.url)
    return imageField.asset.url
  }

  // Method 2: Manual URL construction from asset reference
  if (imageField.asset?._ref) {
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

    console.log("🔧 Building URL manually:")
    console.log("  - Project ID:", projectId)
    console.log("  - Dataset:", dataset)
    console.log("  - Asset Ref:", imageField.asset._ref)

    if (projectId && dataset && imageField.asset._ref.startsWith("image-")) {
      const assetId = imageField.asset._ref
      const match = assetId.match(/image-([a-f\d]+)-(\d+x\d+)-(\w+)/)

      if (match) {
        const [, id, dimensions, format] = match
        const url = `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${format}`
        console.log("✅ GENERATED URL:", url)
        return url
      } else {
        console.log("❌ Invalid asset reference format")
      }
    }
  }

  // Method 3: String URL (for existing CDN URLs)
  if (typeof imageField === "string" && imageField.includes("cdn.sanity.io")) {
    console.log("✅ EXISTING CDN URL:", imageField)
    return imageField
  }

  // Method 4: Local file path
  if (typeof imageField === "string" && imageField.startsWith("/")) {
    console.log("✅ LOCAL FILE:", imageField)
    return imageField
  }

  console.log("❌ NO VALID IMAGE FOUND - USING PLACEHOLDER")
  return "/placeholder.svg"
}

// Transform Sanity post data to our Article type
function transformSanityPost(sanityPost: any): Article {
  console.log("🔄 TRANSFORMING POST:", sanityPost.title)
  console.log("Image data:", JSON.stringify(sanityPost.image, null, 2))

  // Extract excerpt
  const excerpt =
    sanityPost.body
      ?.find((block: any) => block._type === "block")
      ?.children?.find((child: any) => child._type === "span")
      ?.text?.substring(0, 200) + "..." || "No excerpt available"

  const cleanSlug = sanityPost.slug?.current?.trim() || ""
  const imageUrl = getSanityImageUrl(sanityPost.image, 800, 450)

  const result = {
    id: sanityPost._id,
    title: sanityPost.title,
    excerpt: excerpt,
    image: imageUrl,
    date: new Date(sanityPost.publishedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    author: "Admin",
    category: "News",
    url: `/news/${cleanSlug}`,
    sportTags: [],
  }

  console.log("✅ FINAL RESULT:")
  console.log("  - Title:", result.title)
  console.log("  - Image URL:", result.image)
  console.log("  - Article URL:", result.url)

  return result
}

// Transform Sanity article data to our Article type
function transformSanityArticle(sanityArticle: any): Article {
  console.log("🔄 Transforming Sanity article:", sanityArticle)

  const cleanSlug = sanityArticle.slug?.current?.trim() || ""
  const imageUrl = getSanityImageUrl(sanityArticle.featuredImage, 800, 450)

  const transformed = {
    id: sanityArticle._id,
    title: sanityArticle.title,
    excerpt: sanityArticle.excerpt,
    image: imageUrl,
    date: new Date(sanityArticle.publishedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    author: sanityArticle.author?.name || "Unknown Author",
    category: sanityArticle.category?.title || "Uncategorized",
    url: `/news/${cleanSlug}`,
    sportTags: sanityArticle.sportTags || [],
  }

  console.log("✨ Transformed article with image:", { title: transformed.title, image: transformed.image })
  return transformed
}

export const getFeaturedArticles = (): Article[] => {
  return [
    {
      id: 1,
      title: "Dunn breaks world record in 100m freestyle S14",
      excerpt:
        "British swimmer Reece Dunn has broken his own world record in the men's 100m freestyle S14 at the World Para Swimming Championships in Manchester.",
      image: "/para-swimming-competition.png",
      date: "May 2, 2025",
      author: "James Wilson",
      category: "Para Swimming",
      url: "/news/dunn-breaks-world-record-100m-freestyle",
      sportTags: ["para-swimming"],
    },
    {
      id: 2,
      title: "Alcott and Schroder to meet in wheelchair tennis final",
      excerpt:
        "Dylan Alcott and Niels Schroder will face off in the wheelchair tennis final after both players secured straight-sets victories in their respective semi-finals.",
      image: "/wheelchair-tennis-match.png",
      date: "May 2, 2025",
      author: "Sarah Johnson",
      category: "Wheelchair Tennis",
      url: "/news/alcott-schroder-wheelchair-tennis-final",
      sportTags: ["wheelchair-tennis"],
    },
    {
      id: 3,
      title: "Stubbs secures gold in dramatic para archery final",
      excerpt:
        "Great Britain's John Stubbs claimed gold in the para archery final with a perfect 10 on his final arrow to edge out China's Zhao Lixue by a single point.",
      image: "/para-archery-competition.png",
      date: "May 2, 2025",
      author: "Michael Chen",
      category: "Para Archery",
      url: "/news/stubbs-gold-para-archery-final",
      sportTags: ["para-archery"],
    },
    {
      id: 4,
      title: "Paralympic Committee announces new classification guidelines for Paris 2024",
      excerpt:
        "The International Paralympic Committee has released updated classification guidelines for the Paris 2024 Paralympic Games, with several key changes to existing categories.",
      image: "/placeholder.svg?key=o63e0",
      date: "May 2, 2025",
      author: "Emma Parker",
      category: "Paralympic News",
      url: "/news/paralympic-committee-new-classification-guidelines",
      sportTags: [],
    },
    {
      id: 5,
      title: "Boccia world rankings updated ahead of World Championships",
      excerpt:
        "The World Boccia Federation has released updated world rankings ahead of next month's World Championships in São Paulo, Brazil.",
      image: "/placeholder.svg?key=j85s8",
      date: "May 2, 2025",
      author: "David Thompson",
      category: "Boccia",
      url: "/news/boccia-world-rankings-update",
      sportTags: ["boccia"],
    },
  ]
}

export const getLatestArticles = (): Article[] => {
  return [
    {
      id: 1,
      title: "Stubbs secures gold in dramatic para archery final",
      excerpt:
        "Great Britain's John Stubbs claimed gold in the para archery final with a perfect 10 on his final arrow to edge out China's Zhao Lixue by a single point.",
      image: "/para-archery-competition.png",
      date: "May 2, 2025",
      author: "Michael Chen",
      category: "Para Archery",
      url: "/news/stubbs-gold-para-archery-final",
      sportTags: ["para-archery"],
    },
    {
      id: 2,
      title: "Paralympic Committee announces new classification guidelines for Paris 2024",
      excerpt:
        "The International Paralympic Committee has released updated classification guidelines for the Paris 2024 Paralympic Games, with several key changes to existing categories.",
      image: "/placeholder.svg?key=o63e0",
      date: "May 2, 2025",
      author: "Emma Parker",
      category: "Paralympic News",
      url: "/news/paralympic-committee-new-classification-guidelines",
      sportTags: [],
    },
    {
      id: 3,
      title: "Boccia world rankings updated ahead of World Championships",
      excerpt:
        "The World Boccia Federation has released updated world rankings ahead of next month's World Championships in São Paulo, Brazil.",
      image: "/placeholder.svg?key=j85s8",
      date: "May 2, 2025",
      author: "David Thompson",
      category: "Boccia",
      url: "/news/boccia-world-rankings-update",
      sportTags: ["boccia"],
    },
    {
      id: 4,
      title: "Para snowboard season to begin with World Cup in Finland",
      excerpt:
        "The 2025-26 Para Snowboard World Cup season will kick off in Finland this November, with over 100 athletes from 25 countries expected to compete.",
      image: "/placeholder.svg?key=rjch1",
      date: "May 2, 2025",
      author: "Lisa Anderson",
      category: "Winter Sports",
      url: "/news/para-snowboard-world-cup-finland",
      sportTags: [],
    },
    {
      id: 5,
      title: "New technology enhances viewing experience for visually impaired fans",
      excerpt:
        "A groundbreaking new technology is set to transform how visually impaired fans experience para sport events, with audio description and haptic feedback.",
      image: "/placeholder.svg?key=ahpsh",
      date: "May 1, 2025",
      author: "Robert Johnson",
      category: "Technology",
      url: "/news/new-technology-visually-impaired-fans",
      sportTags: [],
    },
    {
      id: 6,
      title: "Paris 2024 Paralympic ticket sales break records",
      excerpt:
        "Ticket sales for the Paris 2024 Paralympic Games have broken all previous records, with over 2.5 million tickets already sold 15 months before the event.",
      image: "/placeholder.svg?key=mqz4p",
      date: "May 1, 2025",
      author: "Sophie Martin",
      category: "Paralympic News",
      url: "/news/paris-2024-ticket-sales-record",
      sportTags: [],
    },
  ]
}

// MAIN ASYNC FUNCTIONS
export const getFeaturedArticlesAsync = async (): Promise<Article[]> => {
  console.log("🚀 STARTING getFeaturedArticlesAsync")

  try {
    if (sanityConfigured && client) {
      console.log("✅ Sanity configured - fetching posts...")

      const sanityPosts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) [0...5] {
        _id,
        title,
        slug,
        publishedAt,
        image {
          asset->{
            _id,
            url,
            _ref,
            metadata {
              dimensions {
                width,
                height
              }
            }
          },
          alt,
          hotspot,
          crop
        },
        body,
        featured
      }`)

      console.log("📊 SANITY QUERY RESULT:")
      console.log("  - Total posts found:", sanityPosts?.length || 0)

      if (sanityPosts && sanityPosts.length > 0) {
        console.log("  - First post title:", sanityPosts[0]?.title)
        console.log("  - First post image:", JSON.stringify(sanityPosts[0]?.image, null, 2))

        const transformedPosts = sanityPosts.map(transformSanityPost)
        console.log("🎉 RETURNING SANITY POSTS:", transformedPosts.length)
        return transformedPosts
      } else {
        console.log("❌ No posts found in Sanity")
      }
    } else {
      console.log("❌ Sanity not configured")
    }

    console.log("🔄 FALLING BACK TO STATIC DATA")
    return getFeaturedArticles()
  } catch (error) {
    console.error("❌ ERROR in getFeaturedArticlesAsync:", error)
    return getFeaturedArticles()
  }
}

export const getLatestArticlesAsync = async (): Promise<Article[]> => {
  console.log("🚀 getLatestArticlesAsync called")

  try {
    if (sanityConfigured && client) {
      console.log("✅ Sanity is configured, fetching latest posts...")

      const sanityPosts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) [0...6] {
        _id,
        title,
        slug,
        publishedAt,
        image {
          asset->{
            _id,
            url,
            _ref,
            metadata {
              dimensions {
                width,
                height
              }
            }
          },
          alt,
          hotspot,
          crop
        },
        body,
        featured
      }`)

      console.log("📄 Raw latest posts from Sanity:", JSON.stringify(sanityPosts, null, 2))

      if (sanityPosts && sanityPosts.length > 0) {
        const transformedPosts = sanityPosts.map(transformSanityPost)
        console.log("✨ Transformed latest posts:", transformedPosts)
        return transformedPosts
      }

      // Fallback to articles
      console.log("📰 No posts found, trying articles...")
      const sanityArticles = await client.fetch(LATEST_ARTICLES_QUERY)
      console.log("📰 Raw latest articles from Sanity:", JSON.stringify(sanityArticles, null, 2))

      if (sanityArticles && sanityArticles.length > 0) {
        return sanityArticles.map(transformSanityArticle)
      }
    } else {
      console.log("❌ Sanity not configured, using static data")
    }

    console.log("🔄 Falling back to static latest articles")
    return getLatestArticles()
  } catch (error) {
    console.error("❌ Error fetching latest articles:", error)
    return getLatestArticles()
  }
}

export const getAllArticlesAsync = async (): Promise<Article[]> => {
  try {
    if (sanityConfigured && client) {
      const sanityPosts = await client.fetch(ALL_POSTS_QUERY)
      if (sanityPosts && sanityPosts.length > 0) {
        return sanityPosts.map(transformSanityPost)
      }

      const sanityArticles = await client.fetch(ARTICLES_QUERY)
      if (sanityArticles && sanityArticles.length > 0) {
        return sanityArticles.map(transformSanityArticle)
      }
    }
    return [...getFeaturedArticles(), ...getLatestArticles()]
  } catch (error) {
    console.error("Error fetching all articles:", error)
    return [...getFeaturedArticles(), ...getLatestArticles()]
  }
}

// Keep existing functions for other data (podcasts, events, etc.)
export const getPodcasts = (): PodcastEpisode[] => {
  return [
    {
      id: 1,
      title: "The Journey to Paralympic Gold",
      guest: "Emma Parker",
      description: "Emma shares her incredible journey from rehabilitation to winning Paralympic gold in Tokyo.",
      image: "/female-paralympic-athlete.png",
      duration: "42:15",
      date: "May 1, 2025",
      url: "/podcasts/journey-to-gold",
    },
    {
      id: 2,
      title: "Coaching Elite Para Athletes",
      guest: "James Wilson",
      description:
        "Top coach James Wilson discusses the unique challenges and rewards of training Paralympic champions.",
      image: "/placeholder.svg?height=400&width=400",
      duration: "38:50",
      date: "April 24, 2025",
      url: "/podcasts/coaching-elite",
    },
    {
      id: 3,
      title: "Technology in Para Sports",
      guest: "Dr. Sarah Chen",
      description:
        "Dr. Chen explores how cutting-edge technology is revolutionizing para sports equipment and performance.",
      image: "/placeholder.svg?height=400&width=400",
      duration: "45:22",
      date: "April 17, 2025",
      url: "/podcasts/technology-para-sports",
    },
    {
      id: 4,
      title: "Mental Health in Elite Para Sport",
      guest: "Dr. Michael Torres",
      description:
        "Sports psychologist Dr. Torres discusses the mental challenges faced by para athletes at the highest level.",
      image: "/sports-psychology-session.png",
      duration: "51:08",
      date: "April 10, 2025",
      url: "/podcasts/mental-health-elite",
    },
    {
      id: 5,
      title: "Breaking Barriers in Para Swimming",
      guest: "Sophia Lee",
      description:
        "Multiple gold medalist Sophia Lee talks about her career and breaking world records in para swimming.",
      image: "/para-swimming-competition.png",
      duration: "39:45",
      date: "April 3, 2025",
      url: "/podcasts/breaking-barriers-swimming",
    },
    {
      id: 6,
      title: "The Business of Para Sports",
      guest: "Robert Johnson",
      description: "Sports marketing expert Robert Johnson discusses the growing commercial appeal of para sports.",
      image: "/placeholder.svg?height=400&width=400",
      duration: "47:30",
      date: "March 27, 2025",
      url: "/podcasts/business-para-sports",
    },
  ]
}

export function getLiveEvents() {
  return [
    {
      id: 1,
      title: "Wheelchair Basketball: USA vs Canada - Semifinal",
      category: "Wheelchair Basketball",
      image: "/wheelchair-basketball-action.png",
      url: "/live/wheelchair-basketball-usa-canada-semifinal",
      viewers: "12,458",
    },
    {
      id: 2,
      title: "Para Archery World Cup - Medal Rounds",
      category: "Para Archery",
      image: "/para-archery-competition.png",
      url: "/live/para-archery-world-cup-medal-rounds",
      viewers: "8,921",
    },
    {
      id: 3,
      title: "Blind Football: Brazil vs Spain",
      category: "Blind Football",
      image: "/placeholder.svg?height=340&width=600",
      url: "/live/blind-football-brazil-spain",
      viewers: "7,345",
    },
  ]
}

export function getUpcomingEvents() {
  return [
    {
      id: 1,
      title: "Para Swimming World Series - London",
      category: "Para Swimming",
      image: "/para-swimming-competition.png",
      time: "Tomorrow, 14:00 BST",
      date: "May 5, 2025",
      url: "/live/para-swimming-world-series-london",
      viewers: "Starts in 22 hours",
    },
    {
      id: 2,
      title: "Wheelchair Rugby League - Finals",
      category: "Wheelchair Rugby",
      image: "/placeholder.svg?key=7ywek",
      time: "May 6, 19:30 BST",
      date: "May 6, 2025",
      url: "/live/wheelchair-rugby-league-finals",
      viewers: "Starts in 2 days",
    },
    {
      id: 3,
      title: "Para Athletics Grand Prix - Paris",
      category: "Para Athletics",
      image: "/para-athletics-track.png",
      time: "May 8, 12:00 CEST",
      date: "May 8, 2025",
      url: "/live/para-athletics-grand-prix-paris",
      viewers: "Starts in 4 days",
    },
    {
      id: 4,
      title: "Sitting Volleyball World Cup - Quarterfinals",
      category: "Sitting Volleyball",
      image: "/placeholder.svg?height=340&width=600",
      time: "May 10, 16:00 BST",
      date: "May 10, 2025",
      url: "/live/sitting-volleyball-world-cup-quarterfinals",
      viewers: "Starts in 6 days",
    },
  ]
}

export const getContentGrid = (category: string): VideoContent[] => {
  return [
    {
      id: 1,
      title: "Para Athletics World Championships Highlights",
      description: "Best moments from the championships",
      image: "/para-athletics-track.png",
      category: "Athletics",
      duration: "15:30",
      url: "/watch/para-athletics-highlights",
      views: "125K",
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Wheelchair Rugby: The Clash of Titans",
      description: "Epic match highlights",
      image: "/placeholder.svg?key=yemx0",
      category: "Rugby",
      duration: "12:45",
      url: "/watch/wheelchair-rugby-titans",
      views: "89K",
      date: "1 week ago",
    },
    {
      id: 3,
      title: "Swimming Stars: Path to Paris 2024",
      description: "Following the journey to Paris",
      image: "/para-swimming-competition.png",
      category: "Swimming",
      duration: "22:15",
      url: "/watch/swimming-paris-2024",
      views: "203K",
      date: "3 days ago",
    },
    {
      id: 4,
      title: "Inside Look: GB Sitting Volleyball Team",
      description: "Behind the scenes with Team GB",
      image: "/placeholder.svg?height=400&width=600",
      category: "Volleyball",
      duration: "18:30",
      url: "/watch/sitting-volleyball-gb",
      views: "67K",
      date: "5 days ago",
    },
  ]
}

export const getSportsCategories = () => {
  return [
    { name: "Wheelchair Basketball", url: "/sports/wheelchair-basketball" },
    { name: "Para Athletics", url: "/sports/para-athletics" },
    { name: "Para Swimming", url: "/sports/para-swimming" },
    { name: "Sitting Volleyball", url: "/sports/sitting-volleyball" },
    { name: "Wheelchair Rugby", url: "/sports/wheelchair-rugby" },
    { name: "Para Cycling", url: "/sports/para-cycling" },
    { name: "All Sports", url: "/sports" },
  ]
}
