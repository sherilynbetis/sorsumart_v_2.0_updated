"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useStore, type UserRole } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, UserPlus, ArrowLeft, Users, Store } from "lucide-react"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

export default function RegisterPage() {
  const router = useRouter()
  const { register, login } = useStore()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState<UserRole>("shopper")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (password !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    const success = register({
      name,
      email,
      contactNumber,
      password,
      role,
    })

    if (success) {
      toast({
        title: "Registration Successful",
        description: "Your account has been created. Logging you in...",
      })
      
      const user = login(email, password)
      if (user) {
        switch (user.role) {
          case "seller":
            router.push("/dashboard/seller")
            break
          case "shopper":
            router.push("/dashboard/shopper")
            break
          default:
            router.push("/")
        }
      }
    } else {
      toast({
        title: "Registration Failed",
        description: "An account with this email already exists.",
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
              <CardTitle className="text-2xl text-[#800000]">Create Account</CardTitle>
              <CardDescription>Join SorSU Mart Food Ordering System</CardDescription>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <FieldGroup>
                <Field>
                  <FieldLabel>Account Type</FieldLabel>
                  <Select value={role} onValueChange={(value: UserRole) => setRole(value)}>
                    <SelectTrigger className="border-[#800000]/20 focus:ring-[#800000]">
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shopper">
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-[#800000]" />
                          <span>Shopper - Order food from sellers</span>
                        </div>
                      </SelectItem>
                      <SelectItem value="seller">
                        <div className="flex items-center gap-2">
                          <Store className="h-4 w-4 text-[#800000]" />
                          <span>Seller - Sell food to customers</span>
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel>{role === "seller" ? "Store/Business Name" : "Full Name"}</FieldLabel>
                  <Input
                    type="text"
                    placeholder={role === "seller" ? "Your Store Name" : "Juan Dela Cruz"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border-[#800000]/20 focus-visible:ring-[#800000]"
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
                    className="border-[#800000]/20 focus-visible:ring-[#800000]"
                  />
                </Field>

                <Field>
                  <FieldLabel>Contact Number</FieldLabel>
                  <Input
                    type="tel"
                    placeholder="09123456789"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    required
                    className="border-[#800000]/20 focus-visible:ring-[#800000]"
                  />
                </Field>

                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
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

                <Field>
                  <FieldLabel>Confirm Password</FieldLabel>
                  <Input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="border-[#800000]/20 focus-visible:ring-[#800000]"
                  />
                </Field>
              </FieldGroup>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full gap-2 bg-[#800000] hover:bg-[#600000]" disabled={isLoading}>
                <UserPlus className="h-4 w-4" />
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="font-medium text-[#800000] hover:underline">
                  Login here
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
