"use client"

import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Eye, Heart, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary py-20 text-primary-foreground">
          <div className="absolute inset-0 opacity-10">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SORSU-BC-sKZttuxL7RYW2RbCQY2byafeuHhzqZ.jpg"
              alt="Sorsogon State University Bulan Campus"
              fill
              className="object-cover"
            />
          </div>
          <div className="container relative mx-auto px-4 text-center">
            <h1 className="mb-4 text-4xl font-bold lg:text-5xl">About SorSU Mart</h1>
            <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90">
              The official food ordering system for Sorsogon State University, Bulan Campus
            </p>
          </div>
        </section>

        {/* Campus Image */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/SORSU-BC-sKZttuxL7RYW2RbCQY2byafeuHhzqZ.jpg"
                alt="Sorsogon State University Bulan Campus"
                width={1200}
                height={400}
                className="h-[300px] w-full object-cover lg:h-[400px]"
              />
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-6 text-3xl font-bold text-foreground">Our Story</h2>
              <p className="mb-6 text-muted-foreground leading-relaxed">
                SorSU Mart was created to serve the students, faculty, and staff of Sorsogon State University, 
                Bulan Campus. Our platform provides a convenient way to order food from various campus sellers, 
                making meal times easier and more efficient for everyone in our university community.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe in supporting local campus vendors while providing a modern, user-friendly 
                food ordering experience. Our system connects hungry students with passionate food sellers, 
                creating a thriving campus food ecosystem.
              </p>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="bg-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Target className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To provide a seamless and efficient food ordering experience for the Sorsogon State University 
                    community while supporting local campus food vendors.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Eye className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To become the leading campus food ordering platform in the region, setting the standard 
                    for convenience, quality, and community engagement.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-foreground">Our Values</h3>
                  <p className="text-muted-foreground">
                    Community, convenience, quality, and innovation drive everything we do. We are committed 
                    to serving our campus family with excellence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* University Info */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="flex flex-col items-center gap-8 lg:flex-row">
                <div className="lg:w-1/2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sorsu%20Cart-z8emDYUZDoV38gyHdEOjxVm8OdK6Ct.jpg"
                    alt="SorSU Mart Logo"
                    width={300}
                    height={300}
                    className="rounded-2xl shadow-xl"
                  />
                </div>
                <div className="lg:w-1/2">
                  <h2 className="mb-4 text-3xl font-bold text-foreground">
                    Sorsogon State University
                  </h2>
                  <h3 className="mb-4 text-xl text-primary">Bulan Campus</h3>
                  <p className="mb-4 text-muted-foreground leading-relaxed">
                    Sorsogon State University - Bulan Campus is a premier educational institution 
                    committed to providing quality education to students in Bulan, Sorsogon and 
                    surrounding areas.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    SorSU Mart is proud to be part of this vibrant academic community, serving 
                    thousands of students, faculty members, and staff every day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="bg-primary py-16 text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="mb-2 text-4xl font-bold lg:text-5xl">100+</p>
                <p className="text-primary-foreground/80">Menu Items</p>
              </div>
              <div>
                <p className="mb-2 text-4xl font-bold lg:text-5xl">10+</p>
                <p className="text-primary-foreground/80">Campus Sellers</p>
              </div>
              <div>
                <p className="mb-2 text-4xl font-bold lg:text-5xl">1000+</p>
                <p className="text-primary-foreground/80">Happy Customers</p>
              </div>
              <div>
                <p className="mb-2 text-4xl font-bold lg:text-5xl">5000+</p>
                <p className="text-primary-foreground/80">Orders Served</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
