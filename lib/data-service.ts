import { client, getThumbnailUrl } from "@/lib/sanity-image"
import type { Article, PodcastEpisode, VideoContent } from "@/lib/types"

// Transform Sanity post to Article format
function transformSanityPost(sanityPost: any): Article {
  const cleanSlug = sanityPost.slug?.current?.trim() || ""

  // Extract excerpt from body
  let excerpt = "Read more about this story..."
  if (sanityPost.body && Array.isArray(sanityPost.body)) {
    const textBlock = sanityPost.body.find(
      (block: any) => block._type === "block" && block.children && Array.isArray(block.children),
    )
    if (textBlock) {
      const textSpan = textBlock.children.find((child: any) => child._type === "span" && child.text)
      if (textSpan && textSpan.text) {
        excerpt = textSpan.text.substring(0, 200) + "..."
      }
    }
  }

  // Use excerpt field if available, otherwise extract from body
  if (sanityPost.excerpt) {
    excerpt = sanityPost.excerpt
  }

  return {
    id: sanityPost._id,
    title: sanityPost.title,
    excerpt: excerpt,
    image: getThumbnailUrl(sanityPost.thumbnail || sanityPost.image, 800, 450),
    // Use actual publishedAt date from Sanity
    date: new Date(sanityPost.publishedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    // Use actual author from Sanity, with fallback
    author: sanityPost.author?.name || sanityPost.author || "Admin",
    // Use actual category from Sanity, with fallback
    category: sanityPost.category?.title || sanityPost.category || "News",
    url: `/news/${cleanSlug}`,
    sportTags: sanityPost.sportTags || [],
  }
}

// Enhanced Sanity query to fetch all necessary fields including author and category
export const getFeaturedArticlesAsync = async (): Promise<Article[]> => {
  try {
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) [0...5] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      thumbnail {
        asset->{
          _id,
          _ref,
          url
        },
        alt,
        hotspot,
        crop
      },
      image {
        asset->{
          _id,
          _ref,
          url
        },
        alt,
        hotspot,
        crop
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
    }`)

    if (posts && posts.length > 0) {
      return posts.map(transformSanityPost)
    }
  } catch (error) {
    console.error("Error fetching articles from Sanity:", error)
  }

  // Fallback data
  return [
    {
      id: "1",
      title: "Dan Brooke Named Chair of ParalympicsGB",
      excerpt:
        "Following an extensive recruitment process, Dan Brooke has been appointed as the new Chair of ParalympicsGB.",
      image: "/person-suit-green.png",
      date: "June 17, 2025",
      author: "Admin",
      category: "Paralympic News",
      url: "/news/dan-brooke-paralympicsgb",
      sportTags: [],
    },
    {
      id: "2",
      title: "Patrick Anderson: The Unstoppable Force of Wheelchair Basketball",
      excerpt:
        "Patrick Anderson has officially announced his retirement from wheelchair basketball, marking the end of an era.",
      image: "/wheelchair-basketball-action.png",
      date: "June 17, 2025",
      author: "Admin",
      category: "Wheelchair Basketball",
      url: "/news/patrick-anderson-wheelchair-basketball",
      sportTags: ["wheelchair-basketball"],
    },
  ]
}

export const getLatestArticlesAsync = async (): Promise<Article[]> => {
  try {
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc) [0...6] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      thumbnail {
        asset->{
          _id,
          _ref,
          url
        },
        alt,
        hotspot,
        crop
      },
      image {
        asset->{
          _id,
          _ref,
          url
        },
        alt,
        hotspot,
        crop
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
    }`)

    if (posts && posts.length > 0) {
      return posts.map(transformSanityPost)
    }
  } catch (error) {
    console.error("Error fetching latest articles from Sanity:", error)
  }

  return getFeaturedArticlesAsync()
}

export const getAllArticlesAsync = async (): Promise<Article[]> => {
  const featured = await getFeaturedArticlesAsync()
  const latest = await getLatestArticlesAsync()

  // Combine and deduplicate
  const allArticles = [...featured, ...latest]
  const uniqueArticles = allArticles.filter(
    (article, index, self) => index === self.findIndex((a) => a.id === article.id),
  )

  return uniqueArticles
}

// Keep existing functions unchanged
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
  ]
}

export const getSportsCategories = () => {
  return [
    { name: "Wheelchair Basketball", url: "/sports/wheelchair-basketball" },
    { name: "Para Athletics", url: "/sports/para-athletics" },
    { name: "Para Swimming", url: "/sports/para-swimming" },
    { name: "All Sports", url: "/sports" },
  ]
}
