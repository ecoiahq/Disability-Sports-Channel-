import Link from "next/link"
import { Facebook, Twitter, Youtube, Instagram, Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function EnhancedFooter() {
  return (
    <footer className="border-t border-gray-800 bg-gray-950 py-12 text-gray-400">
      <div className="container grid gap-8 px-4 md:grid-cols-2 md:px-6 lg:grid-cols-5">
        {/* Logo and Social Media */}
        <div className="lg:col-span-1">
          <Link href="/" className="mb-4 inline-block text-2xl font-bold text-white">
            DSC
          </Link>
          <p className="mb-4 text-sm">
            The leading platform for para sports content, news, and entertainment worldwide.
          </p>
          <div className="flex space-x-4">
            <Link
              href="https://www.facebook.com/disabilitysportschannel"
              className="rounded-full bg-gray-800 p-2 text-white hover:bg-teal-600"
            >
              <Facebook className="h-5 w-5" />
              <span className="sr-only">Facebook</span>
            </Link>
            <Link
              href="https://x.com/dschanneluk"
              className="rounded-full bg-gray-800 p-2 text-white hover:bg-teal-600"
            >
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="https://www.youtube.com/@disabilitysportschannel"
              className="rounded-full bg-gray-800 p-2 text-white hover:bg-teal-600"
            >
              <Youtube className="h-5 w-5" />
              <span className="sr-only">YouTube</span>
            </Link>
            <Link
              href="https://www.instagram.com/disability_sports_channel/"
              className="rounded-full bg-gray-800 p-2 text-white hover:bg-teal-600"
            >
              <Instagram className="h-5 w-5" />
              <span className="sr-only">Instagram</span>
            </Link>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-teal-400" />
            <a href="mailto:contact@disabilitysportschannel.co.uk" className="hover:text-teal-400">
              contact@disabilitysportschannel.co.uk
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="mb-4 text-lg font-medium text-teal-400">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-teal-400">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/careers" className="hover:text-teal-400">
                Careers
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-teal-400">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/partners" className="hover:text-teal-400">
                Partners
              </Link>
            </li>
            <li>
              <Link href="/advertise" className="hover:text-teal-400">
                Advertise
              </Link>
            </li>
          </ul>
        </div>

        {/* Content Links */}
        <div>
          <h3 className="mb-4 text-lg font-medium text-teal-400">Content</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/news" className="hover:text-teal-400">
                News
              </Link>
            </li>
            <li>
              <Link href="/sports" className="hover:text-teal-400">
                Sports
              </Link>
            </li>
            <li>
              <Link href="/studios" className="hover:text-teal-400">
                DSC Studios
              </Link>
            </li>
            <li>
              <Link href="/podcasts" className="hover:text-teal-400">
                Para Sport Talks
              </Link>
            </li>
            <li>
              <Link href="/summit" className="hover:text-teal-400">
                2025 Summit
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="mb-4 text-lg font-medium text-teal-400">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/terms" className="hover:text-teal-400">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-teal-400">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div className="lg:col-span-1">
          <h3 className="mb-4 text-lg font-medium text-teal-400">ParaSports Essential</h3>
          <p className="mb-4 text-sm">
            Get the latest ParaSport analysis and big moments, delivered to your inbox every weekday.
          </p>
          <form className="space-y-3">
            <div>
              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <Input
                id="name"
                placeholder="Your name"
                className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus-visible:ring-teal-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="Your email"
                className="border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus-visible:ring-teal-500"
              />
            </div>
            <Button className="w-full bg-teal-600 hover:bg-teal-700">Sign Up</Button>
          </form>
        </div>
      </div>

      <div className="container mt-8 border-t border-gray-800 pt-8 px-4 md:px-6">
        <p className="text-center text-xs">© 2025 Disability Sports Channel. All rights reserved.</p>
      </div>
    </footer>
  )
}
