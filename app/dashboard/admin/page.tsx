"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useStore } from "@/lib/store"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Store, ShoppingBag, TrendingUp, Mail, Phone, Calendar } from "lucide-react"

export default function AdminDashboard() {
  const router = useRouter()
  const { currentUser, users, orders, menuItems } = useStore()

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      router.push("/login")
    }
  }, [currentUser, router])

  if (!currentUser || currentUser.role !== "admin") {
    return null
  }

  const sellers = users.filter((u) => u.role === "seller")
  const shoppers = users.filter((u) => u.role === "shopper")
  const totalRevenue = orders.filter(o => o.status === "completed").reduce((sum, o) => sum + o.total, 0)

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Welcome Banner */}
          <div className="mb-6 rounded-xl bg-[#800000] p-6 text-white">
            <div className="flex items-center gap-4">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sorsu%20Cart-z8emDYUZDoV38gyHdEOjxVm8OdK6Ct.jpg"
                alt="SorSU Mart"
                width={60}
                height={60}
                className="rounded-lg"
              />
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-white/80">Welcome, {currentUser.name}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="border-[#800000]/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#800000]/10 p-2.5">
                    <Users className="h-5 w-5 text-[#800000]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{users.length}</p>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#800000]/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#800000]/10 p-2.5">
                    <Store className="h-5 w-5 text-[#800000]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{sellers.length}</p>
                    <p className="text-sm text-muted-foreground">Sellers</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#800000]/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#800000]/10 p-2.5">
                    <ShoppingBag className="h-5 w-5 text-[#800000]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{orders.length}</p>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#800000]/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#800000]/10 p-2.5">
                    <TrendingUp className="h-5 w-5 text-[#800000]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">P{totalRevenue.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Sellers List */}
            <Card className="border-[#800000]/20">
              <CardHeader className="border-b pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Store className="h-5 w-5 text-[#800000]" />
                  Registered Sellers ({sellers.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {sellers.length === 0 ? (
                  <div className="py-8 text-center">
                    <Store className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">No sellers registered yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {sellers.map((user) => (
                      <div key={user.id} className="rounded-lg border border-[#800000]/10 bg-[#800000]/5 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="font-semibold text-foreground">{user.name}</p>
                          <Badge className="bg-[#800000] text-white">Seller</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5" />
                            <span>{user.contactNumber}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Shoppers List */}
            <Card className="border-[#800000]/20">
              <CardHeader className="border-b pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5 text-[#800000]" />
                  Registered Shoppers ({shoppers.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {shoppers.length === 0 ? (
                  <div className="py-8 text-center">
                    <Users className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
                    <p className="text-sm text-muted-foreground">No shoppers registered yet</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {shoppers.map((user) => (
                      <div key={user.id} className="rounded-lg border border-[#800000]/10 bg-[#800000]/5 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <p className="font-semibold text-foreground">{user.name}</p>
                          <Badge variant="secondary" className="bg-gray-200 text-gray-700">Shopper</Badge>
                        </div>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Mail className="h-3.5 w-3.5" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5" />
                            <span>{user.contactNumber}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Menu Items Overview */}
          <Card className="mt-6 border-[#800000]/20">
            <CardHeader className="border-b pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <ShoppingBag className="h-5 w-5 text-[#800000]" />
                Menu Items ({menuItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {menuItems.length === 0 ? (
                <div className="py-8 text-center">
                  <ShoppingBag className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">No menu items yet</p>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {menuItems.slice(0, 6).map((item) => (
                    <div key={item.id} className="flex items-center gap-3 rounded-lg border border-[#800000]/10 p-3">
                      <div className="h-12 w-12 overflow-hidden rounded-lg bg-[#800000]/10">
                        {item.image && (
                          <Image src={item.image} alt={item.name} width={48} height={48} className="h-full w-full object-cover" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="truncate font-medium text-foreground text-sm">{item.name}</p>
                        <p className="text-xs text-muted-foreground">P{item.price} - {item.sellerName}</p>
                      </div>
                      <Badge variant={item.available ? "default" : "secondary"} className={item.available ? "bg-green-100 text-green-700" : ""}>
                        {item.available ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
