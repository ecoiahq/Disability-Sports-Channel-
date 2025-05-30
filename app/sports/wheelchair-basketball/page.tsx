import Hero from "@/components/Hero"
import TabsContent from "@/components/TabsContent"
import SportHistoryTimeline from "@/components/SportHistoryTimeline"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wheelchair Basketball | ParaSport",
  description:
    "Explore the exciting world of Wheelchair Basketball. Learn about its history, rules, classification, and more.",
  openGraph: {
    title: "Wheelchair Basketball | ParaSport",
    description:
      "Explore the exciting world of Wheelchair Basketball. Learn about its history, rules, classification, and more.",
    images: ["/images/wheelchair-basketball/hero.jpg"],
  },
}

const WheelchairBasketballPage = () => {
  const timelineEvents = [
    {
      year: 1944,
      event:
        "Wheelchair basketball emerges as a rehabilitation activity for injured World War II veterans in the United States.",
    },
    { year: 1946, event: "The National Wheelchair Basketball Association (NWBA) is founded in the United States." },
    { year: 1949, event: "The first NWBA National Tournament is held." },
    { year: 1960, event: "Wheelchair basketball is included in the first Paralympic Games in Rome, Italy." },
    {
      year: 1973,
      event: "The International Stoke Mandeville Games Federation (ISMGF) establishes a wheelchair basketball section.",
    },
    {
      year: 1989,
      event: "The International Wheelchair Basketball Federation (IWBF) is formed as an independent organization.",
    },
    { year: 1990, event: "The first Wheelchair Basketball World Championship is held." },
    {
      year: 2000,
      event: "Women’s wheelchair basketball is added to the Paralympic Games program in Sydney, Australia.",
    },
    { year: 2018, event: "The IWBF introduces new classification rules to ensure fair competition." },
    {
      year: "Present",
      event:
        "Wheelchair basketball continues to grow in popularity and participation worldwide, promoting inclusivity and athletic excellence.",
    },
  ]

  const tabsData = [
    {
      label: "Overview",
      content: (
        <div>
          <p>
            Wheelchair basketball is a dynamic and fast-paced sport played by athletes with physical disabilities that
            affect lower limbs. It combines the skills of basketball with the use of wheelchairs, requiring exceptional
            upper-body strength, agility, and teamwork.
          </p>

          <h3>Key Highlights:</h3>
          <ul>
            <li>Played on a standard basketball court with similar rules to able-bodied basketball.</li>
            <li>Athletes use sports wheelchairs designed for maneuverability and stability.</li>
            <li>Teams consist of five players, and games are divided into four quarters.</li>
            <li>Players must dribble the ball while pushing their wheelchair or pass the ball to a teammate.</li>
            <li>Wheelchair basketball promotes inclusivity, athleticism, and competitive spirit.</li>
          </ul>

          <h3>Governing Body:</h3>
          <p>
            The International Wheelchair Basketball Federation (IWBF) is the governing body for wheelchair basketball
            worldwide. It oversees the rules, regulations, and development of the sport.
          </p>
        </div>
      ),
    },
    {
      label: "Rules",
      content: (
        <div>
          <p>
            Wheelchair basketball rules are based on the standard basketball rules with some modifications to
            accommodate the use of wheelchairs.
          </p>

          <h3>Key Rule Adaptations:</h3>
          <ul>
            <li>
              <b>Traveling:</b> A player can only push the wheelchair twice without dribbling the ball.
            </li>
            <li>
              <b>Double Dribble:</b> The standard double dribble rule applies.
            </li>
            <li>
              <b>Fouls:</b> Standard basketball foul rules apply, with additional considerations for wheelchair contact.
            </li>
            <li>
              <b>Classification:</b> Players are classified based on their functional ability, and each team must field
              players with a certain point total to ensure fair competition.
            </li>
          </ul>

          <p>For a comprehensive understanding of the rules, refer to the official IWBF rulebook.</p>
        </div>
      ),
    },
    {
      label: "Classification",
      content: (
        <div>
          <p>
            Classification in wheelchair basketball is a system used to ensure fair competition by grouping athletes
            with similar levels of functional ability.
          </p>

          <h3>Classification System:</h3>
          <ul>
            <li>
              Players are assessed and assigned a point value from 1.0 to 4.5, with lower scores indicating more
              significant impairment.
            </li>
            <li>Each team is limited to a maximum total of 14 points on the court at any time.</li>
            <li>
              The classification system allows athletes with a range of disabilities to participate and compete
              effectively.
            </li>
          </ul>

          <h3>Classification Categories:</h3>
          <ul>
            <li>
              <b>1.0 - 1.5:</b> Players with significant limitations in trunk and leg function.
            </li>
            <li>
              <b>2.0 - 2.5:</b> Players with moderate limitations in trunk and leg function.
            </li>
            <li>
              <b>3.0 - 3.5:</b> Players with minimal limitations in trunk and leg function.
            </li>
            <li>
              <b>4.0 - 4.5:</b> Players with minimal disability who can perform most basketball skills effectively.
            </li>
          </ul>
        </div>
      ),
    },
    {
      label: "Media",
      content: (
        <div>
          <h3>Image Gallery</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <img
              src="/images/wheelchair-basketball/gallery1.jpg"
              alt="Wheelchair Basketball Action 1"
              className="rounded-lg shadow-md"
            />
            <img
              src="/images/wheelchair-basketball/gallery2.jpg"
              alt="Wheelchair Basketball Action 2"
              className="rounded-lg shadow-md"
            />
            <img
              src="/images/wheelchair-basketball/gallery3.jpg"
              alt="Wheelchair Basketball Action 3"
              className="rounded-lg shadow-md"
            />
          </div>

          <h3>Video Highlights</h3>
          <div className="mt-4">
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/your_youtube_video_id"
              title="Wheelchair Basketball Highlights"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg shadow-md"
            ></iframe>
            <p className="text-sm text-gray-500 mt-2">
              Replace "your_youtube_video_id" with the actual YouTube video ID.
            </p>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div>
      <Hero
        title="Wheelchair Basketball"
        subtitle="Experience the Thrill of Wheelchair Basketball"
        image="/images/wheelchair-basketball/hero.jpg"
        alt="Wheelchair Basketball Hero Image"
      />

      <div className="container mx-auto py-8">
        <SportHistoryTimeline events={timelineEvents} />

        <TabsContent tabsData={tabsData} />
      </div>
    </div>
  )
}

export default WheelchairBasketballPage
