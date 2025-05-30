import Link from "next/link"
import Image from "next/image"

export default function BBCSportSection() {
  return (
    <section className="w-full bg-gradient-to-r from-gray-900 to-black border-b border-gray-800">
      {/* Header */}
      <div className="container mx-auto px-4 py-6 md:px-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">FEATURED STORIES</h2>
          <Link
            href="/news"
            className="flex items-center gap-2 rounded bg-teal-600 px-3 py-1 text-sm text-white hover:bg-teal-700"
          >
            <span>More News</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="bg-black py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-4">
            {/* Main Feature - Updated to link to specific live video */}
            <div className="md:col-span-2">
              <Link href="/live/wheelchair-basketball-usa-canada-semifinal" className="group relative block">
                <div className="overflow-hidden rounded">
                  <Image
                    src="/wheelchair-basketball-action.png"
                    alt="Wheelchair basketball players in action"
                    width={640}
                    height={360}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                      LIVE
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-teal-400">
                      Paralympic Qualifiers: USA vs Canada - Wheelchair Basketball Semi-Final
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-300">
                    Follow live coverage of the Paralympic Qualifiers semi-finals, with USA and Canada battling for a
                    spot in the final.
                  </p>
                  <p className="mt-2 text-xs text-teal-500">Wheelchair Basketball • Live</p>
                </div>
              </Link>
            </div>

            {/* Secondary Features */}
            <div className="grid gap-6 md:col-span-2 md:grid-cols-2">
              {/* First secondary feature - Updated to link to specific live video */}
              <Link href="/live/world-para-athletics-day2" className="group block">
                <div className="overflow-hidden rounded">
                  <Image
                    src="/para-athletics-track.png"
                    alt="Para athletics track event"
                    width={320}
                    height={180}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white">
                      LIVE
                    </span>
                    <h3 className="font-bold text-white group-hover:text-teal-400">
                      World Para Athletics: Day 2 highlights and results
                    </h3>
                  </div>
                  <p className="mt-2 text-xs text-teal-500">Para Athletics • 2h</p>
                </div>
              </Link>

              {/* Second secondary feature - Updated to link to specific news article */}
              <Link href="/news/dunn-breaks-world-record-100m-freestyle" className="group block">
                <div className="overflow-hidden rounded">
                  <Image
                    src="/para-swimming-competition.png"
                    alt="Para swimming competition"
                    width={320}
                    height={180}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-white group-hover:text-teal-400">
                    Dunn breaks world record in 100m freestyle S14
                  </h3>
                  <p className="mt-2 text-xs text-teal-500">Para Swimming • 4h</p>
                </div>
              </Link>

              {/* Third secondary feature - Updated to link to specific news article */}
              <Link href="/news/alcott-schroder-wheelchair-tennis-final" className="group block">
                <div className="overflow-hidden rounded">
                  <Image
                    src="/wheelchair-tennis-match.png"
                    alt="Wheelchair tennis match"
                    width={320}
                    height={180}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-white group-hover:text-teal-400">
                    Alcott and Schroder to meet in wheelchair tennis final
                  </h3>
                  <p className="mt-2 text-xs text-teal-500">Wheelchair Tennis • 3h</p>
                </div>
              </Link>

              {/* Fourth secondary feature - Updated to link to specific news article */}
              <Link href="/news/stubbs-gold-para-archery-final" className="group block">
                <div className="overflow-hidden rounded">
                  <Image
                    src="/para-archery-competition.png"
                    alt="Para archery competition"
                    width={320}
                    height={180}
                    className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3">
                  <h3 className="font-bold text-white group-hover:text-teal-400">
                    Stubbs secures gold in dramatic para archery final
                  </h3>
                  <p className="mt-2 text-xs text-teal-500">Para Archery • 5h</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Additional News Items - Updated to link to specific news articles */}
          <div className="mt-8 grid gap-4 border-t border-gray-800 pt-6 md:grid-cols-4">
            <Link href="/news/paralympic-committee-new-classification-guidelines" className="flex gap-3">
              <h4 className="text-sm font-bold text-white hover:text-teal-400">
                Paralympic Committee announces new classification guidelines for Paris 2024
              </h4>
              <p className="text-xs text-teal-500 whitespace-nowrap">News • 1h</p>
            </Link>
            <Link href="/news/boccia-world-rankings-update" className="flex gap-3">
              <h4 className="text-sm font-bold text-white hover:text-teal-400">
                Boccia world rankings updated ahead of World Championships
              </h4>
              <p className="text-xs text-teal-500 whitespace-nowrap">Boccia • 3h</p>
            </Link>
            <Link href="/news/para-snowboard-world-cup-finland" className="flex gap-3">
              <h4 className="text-sm font-bold text-white hover:text-teal-400">
                Para snowboard season to begin with World Cup in Finland
              </h4>
              <p className="text-xs text-teal-500 whitespace-nowrap">Winter Sports • 6h</p>
            </Link>
            <Link href="/podcasts/para-sport-talks-emma-parker" className="flex gap-3">
              <h4 className="text-sm font-bold text-white hover:text-teal-400">
                Listen: Para Sport Talks podcast - Episode 12 with Emma Parker
              </h4>
              <p className="text-xs text-teal-500 whitespace-nowrap">Podcast • 8h</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
