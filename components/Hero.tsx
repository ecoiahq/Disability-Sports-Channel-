import Image from "next/image"

interface HeroProps {
  title: string
  description?: string
  image: string
  alt: string
}

export default function Hero({ title, description, image, alt }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Image
          src={image || "/placeholder.svg?height=500&width=800&text=Hero+Image"}
          alt={alt}
          fill
          className="object-cover object-center opacity-60"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 py-24 md:px-6">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">{title}</h1>
          {description && <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-300">{description}</p>}
        </div>
      </div>
    </section>
  )
}
