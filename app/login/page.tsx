"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useStore()
  const { toast } = useToast()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const user = login(email, password)

    if (user) {
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      })

      switch (user.role) {
        case "admin":
          router.push("/dashboard/admin")
          break
        case "seller":
          router.push("/dashboard/seller")
          break
        case "shopper":
          router.push("/dashboard/shopper")
          break
        default:
          router.push("/")
      }
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#800000]/5 px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#800000]"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card className="border-[#800000]/20 shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="mx-auto">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sorsu%20Cart-z8emDYUZDoV38gyHdEOjxVm8OdK6Ct.jpg"
                alt="SorSU Mart Logo"
                width={80}
                height={80}
                className="rounded-xl"
              />
            </div>
            <div>
              <CardTitle className="text-2xl text-[#800000]">Welcome Back</CardTitle>
              <CardDescription>Login to your SorSU Mart account</CardDescription>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Email Address</FieldLabel>
                  <Input
                    type="email"
                    placeholder="you@sorsu.edu.ph"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-[#800000]/20 focus-visible:ring-[#800000]"
                  />
                </Field>

                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-[#800000]/20 pr-10 focus-visible:ring-[#800000]"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </Field>
              </FieldGroup>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full gap-2 bg-[#800000] hover:bg-[#600000]" disabled={isLoading}>
                <LogIn className="h-4 w-4" />
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                {"Don't have an account? "}
                <Link href="/register" className="font-medium text-[#800000] hover:underline">
                  Register here
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
