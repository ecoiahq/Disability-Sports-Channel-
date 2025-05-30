"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Check, ChevronRight, Play } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import SiteHeader from "@/components/site-header"
import EnhancedFooter from "@/components/enhanced-footer"

export default function CheckoutSuccess() {
  const router = useRouter()
  const [plan, setPlan] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)

  useEffect(() => {
    // Check if user has an active subscription
    const hasSubscription = typeof window !== "undefined" ? sessionStorage.getItem("dsc_subscription_active") : null
    const userPlan = typeof window !== "undefined" ? sessionStorage.getItem("dsc_subscription_plan") : null
    const userEmail = typeof window !== "undefined" ? sessionStorage.getItem("dsc_user_email") : null

    if (!hasSubscription) {
      // Redirect to home if no active subscription
      router.push("/")
      return
    }

    setPlan(userPlan)
    setEmail(userEmail)
  }, [router])

  // Get plan name from plan ID
  const getPlanName = () => {
    const planNames: Record<string, string> = {
      basic: "Basic",
      standard: "Standard",
      premium: "Premium",
      "basic-annual": "Basic Annual",
      "standard-annual": "Standard Annual",
      "premium-annual": "Premium Annual",
    }

    return plan && plan in planNames ? planNames[plan] : "Premium"
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <SiteHeader />

      <main className="flex-1">
        <section className="relative py-16 md:py-24 overflow-hidden">
          {/* Background image and overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black/80"></div>
            <Image
              src="/paralympic-collage.png"
              alt="Premium content collage"
              fill
              className="object-cover opacity-30"
              priority
            />
          </div>

          {/* Content */}
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="mx-auto w-20 h-20 rounded-full bg-teal-900/30 flex items-center justify-center mb-6">
                  <Check className="h-10 w-10 text-teal-400" />
                </div>
                <h1 className="text-3xl md:text-5xl font-bold mb-6">Welcome to DSC Premium!</h1>
                <p className="text-xl text-gray-300">
                  Your {getPlanName()} membership is now active. You have full access to all the content included in
                  your plan.
                </p>
              </div>

              <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800/50 mb-12">
                <CardHeader>
                  <CardTitle>Membership Details</CardTitle>
                  <CardDescription>Your subscription is now active</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email</span>
                    <span className="font-medium">{email || "member@example.com"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Plan</span>
                    <span className="font-medium">{getPlanName()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status</span>
                    <span className="font-medium text-teal-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Next Billing Date</span>
                    <span className="font-medium">
                      {plan?.includes("annual")
                        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
                        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-8">
                <h2 className="text-2xl font-bold">Start Watching Now</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-teal-900/50 transition-all duration-300 group hover:transform hover:scale-[1.02]">
                    <div className="relative aspect-video">
                      <Image
                        src="/female-paralympic-athlete.png"
                        alt="Para Sport Talks"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-teal-600/80 flex items-center justify-center">
                          <Play className="h-8 w-8 text-white fill-white ml-1" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="text-xl font-bold mb-2">Para Sport Talks</h3>
                      <p className="text-gray-400">
                        Exclusive interviews and discussions with Paralympic athletes and experts
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700/50" asChild>
                        <Link href="/premium-content">Browse Collection</Link>
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-gradient-to-br from-gray-900 to-gray-900/50 backdrop-blur-sm border border-gray-800/50 hover:border-teal-900/50 transition-all duration-300 group hover:transform hover:scale-[1.02]">
                    <div className="relative aspect-video">
                      <Image
                        src="/wheelchair-basketball-action.png"
                        alt="Documentaries"
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-teal-600/80 flex items-center justify-center">
                          <Play className="h-8 w-8 text-white fill-white ml-1" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="pt-4">
                      <h3 className="text-xl font-bold mb-2">Documentaries</h3>
                      <p className="text-gray-400">In-depth documentaries about Paralympic sports and athletes</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-gray-800 hover:bg-gray-700 border border-gray-700/50" asChild>
                        <Link href="/premium-content">Watch Now</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="flex justify-center mt-8">
                  <Button
                    className="bg-teal-600 hover:bg-teal-500 text-lg px-8 py-6 rounded-full shadow-lg shadow-teal-900/20 hover:shadow-teal-900/30 hover:scale-[1.02] transition-all duration-300"
                    asChild
                  >
                    <Link href="/premium-content">
                      Explore All Premium Content
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <EnhancedFooter />
    </div>
  )
}
