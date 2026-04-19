"use client"

import { useState } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

export default function ContactPage() {
  const { toast } = useToast()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Message Sent",
      description: "Thank you for contacting us. We will get back to you soon!",
    })

    setName("")
    setEmail("")
    setSubject("")
    setMessage("")
    setIsLoading(false)
  }

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
            <h1 className="mb-4 text-4xl font-bold lg:text-5xl">Contact Us</h1>
            <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90">
              Have questions or feedback? We would love to hear from you!
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Contact Form */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                  <CardDescription>
                    Fill out the form below and we will get back to you as soon as possible.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <FieldGroup>
                      <Field>
                        <FieldLabel>Your Name</FieldLabel>
                        <Input
                          type="text"
                          placeholder="Juan Dela Cruz"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </Field>

                      <Field>
                        <FieldLabel>Email Address</FieldLabel>
                        <Input
                          type="email"
                          placeholder="you@sorsu.edu.ph"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Field>

                      <Field>
                        <FieldLabel>Subject</FieldLabel>
                        <Input
                          type="text"
                          placeholder="How can we help?"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          required
                        />
                      </Field>

                      <Field>
                        <FieldLabel>Message</FieldLabel>
                        <Textarea
                          placeholder="Tell us more about your inquiry..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                          rows={5}
                        />
                      </Field>
                    </FieldGroup>

                    <Button type="submit" className="mt-6 w-full gap-2" disabled={isLoading}>
                      <Send className="h-4 w-4" />
                      {isLoading ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">Location</h3>
                        <p className="text-muted-foreground">
                          Sorsogon State University<br />
                          Bulan Campus<br />
                          Bulan, Sorsogon, Philippines
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">Email</h3>
                        <p className="text-muted-foreground">sorsumart@sorsu.edu.ph</p>
                        <p className="text-muted-foreground">support@sorsumart.com</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">Phone</h3>
                        <p className="text-muted-foreground">(056) 123-4567</p>
                        <p className="text-muted-foreground">+63 912 345 6789</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-3">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-semibold text-foreground">Operating Hours</h3>
                        <p className="text-muted-foreground">Monday - Friday: 7:00 AM - 6:00 PM</p>
                        <p className="text-muted-foreground">Saturday: 8:00 AM - 4:00 PM</p>
                        <p className="text-muted-foreground">Sunday: Closed</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
