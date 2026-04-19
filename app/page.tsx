"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MenuCard } from "@/components/menu-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useStore } from "@/lib/store"
import { ShoppingBag, Clock, Shield, Store, ChevronRight, Utensils, Users } from "lucide-react"

export default function HomePage() {
  const { menuItems } = useStore()
  const featuredItems = menuItems.filter((item) => item.available).slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Red Maroon */}
        <section className="relative bg-[#800000] py-16 text-white lg:py-24">
          <div className="absolute inset-0 bg-[url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SORSU-BC-sKZttuxL7RYW2RbCQY2byafeuHhzqZ.jpg')] bg-cover bg-center opacity-15" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-6 flex justify-center">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sorsu%20Cart-z8emDYUZDoV38gyHdEOjxVm8OdK6Ct.jpg"
                  alt="SorSU Mart Logo"
                  width={100}
                  height={100}
                  className="rounded-xl shadow-lg"
                />
              </div>
              <h1 className="mb-3 text-balance text-3xl font-bold tracking-tight lg:text-5xl">
                SorSU Mart Food Ordering
              </h1>
              <p className="mb-2 text-lg font-medium text-white/90">
                Sorsogon State University - Bulan Campus
              </p>
              <p className="mb-6 text-balance text-white/80">
                Order your favorite meals from campus sellers easily and conveniently.
              </p>
              <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link href="/menu">
                  <Button size="lg" className="gap-2 bg-white text-[#800000] hover:bg-white/90">
                    <Utensils className="h-5 w-5" />
                    Browse Menu
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="lg" variant="outline" className="gap-2 border-white/40 bg-transparent text-white hover:bg-white/10">
                    Get Started
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Campus Image */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="overflow-hidden rounded-xl shadow-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SORSU-BC-sKZttuxL7RYW2RbCQY2byafeuHhzqZ.jpg"
                alt="Sorsogon State University Bulan Campus"
                width={1200}
                height={400}
                className="h-[250px] w-full object-cover lg:h-[350px]"
              />
            </div>
            <p className="mt-3 text-center text-sm text-muted-foreground">
              Sorsogon State University - Bulan Campus
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="bg-[#800000]/5 py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground lg:text-3xl">
              Why Choose SorSU Mart?
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Card className="border-[#800000]/20">
                <CardContent className="flex flex-col items-center p-5 text-center">
                  <div className="mb-3 rounded-full bg-[#800000]/10 p-3">
                    <ShoppingBag className="h-6 w-6 text-[#800000]" />
                  </div>
                  <h3 className="mb-1 font-semibold text-foreground">Easy Ordering</h3>
                  <p className="text-sm text-muted-foreground">Browse and order with a few clicks</p>
                </CardContent>
              </Card>

              <Card className="border-[#800000]/20">
                <CardContent className="flex flex-col items-center p-5 text-center">
                  <div className="mb-3 rounded-full bg-[#800000]/10 p-3">
                    <Clock className="h-6 w-6 text-[#800000]" />
                  </div>
                  <h3 className="mb-1 font-semibold text-foreground">Fast Service</h3>
                  <p className="text-sm text-muted-foreground">Get notified when ready for pickup</p>
                </CardContent>
              </Card>

              <Card className="border-[#800000]/20">
                <CardContent className="flex flex-col items-center p-5 text-center">
                  <div className="mb-3 rounded-full bg-[#800000]/10 p-3">
                    <Store className="h-6 w-6 text-[#800000]" />
                  </div>
                  <h3 className="mb-1 font-semibold text-foreground">Multiple Sellers</h3>
                  <p className="text-sm text-muted-foreground">Choose from various food vendors</p>
                </CardContent>
              </Card>

              <Card className="border-[#800000]/20">
                <CardContent className="flex flex-col items-center p-5 text-center">
                  <div className="mb-3 rounded-full bg-[#800000]/10 p-3">
                    <Shield className="h-6 w-6 text-[#800000]" />
                  </div>
                  <h3 className="mb-1 font-semibold text-foreground">Secure Platform</h3>
                  <p className="text-sm text-muted-foreground">Safe campus food ordering</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* User Roles */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center text-2xl font-bold text-foreground lg:text-3xl">
              Join Our Platform
            </h2>
            <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
              <Card className="border-[#800000]/20">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-full bg-[#800000]/10 p-3">
                    <Users className="h-8 w-8 text-[#800000]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">Shopper</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Browse menus, add items to cart, and place orders for pickup.
                  </p>
                  <Link href="/register">
                    <Button variant="outline" className="gap-2 border-[#800000] text-[#800000] hover:bg-[#800000]/5">
                      Register as Shopper
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-[#800000]/20">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-full bg-[#800000]/10 p-3">
                    <Store className="h-8 w-8 text-[#800000]" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">Seller</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    List your food items, manage orders, and grow your business.
                  </p>
                  <Link href="/register">
                    <Button variant="outline" className="gap-2 border-[#800000] text-[#800000] hover:bg-[#800000]/5">
                      Register as Seller
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Menu */}
        {featuredItems.length > 0 && (
          <section className="bg-[#800000]/5 py-12">
            <div className="container mx-auto px-4">
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground lg:text-3xl">Featured Menu</h2>
                <Link href="/menu" className="hidden sm:block">
                  <Button variant="outline" size="sm" className="gap-1 border-[#800000] text-[#800000] hover:bg-[#800000]/5">
                    View All
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {featuredItems.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
              <div className="mt-6 text-center sm:hidden">
                <Link href="/menu">
                  <Button variant="outline" className="gap-1 border-[#800000] text-[#800000] hover:bg-[#800000]/5">
                    View All Menu
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card className="bg-[#800000] text-white">
              <CardContent className="p-8 text-center">
                <h2 className="mb-3 text-2xl font-bold">Ready to Get Started?</h2>
                <p className="mb-6 text-white/80">
                  Join SorSU Mart today and experience convenient food ordering at Sorsogon State University, Bulan Campus.
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Link href="/register">
                    <Button size="lg" className="gap-2 bg-white text-[#800000] hover:bg-white/90">
                      Create Account
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="lg" variant="outline" className="gap-2 border-white/40 bg-transparent text-white hover:bg-white/10">
                      Login
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
