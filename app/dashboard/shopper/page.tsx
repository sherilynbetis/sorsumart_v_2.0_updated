"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MenuCard } from "@/components/menu-card"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ShoppingBag,
  ShoppingCart,
  Clock,
  CheckCircle,
  Package,
  Utensils,
} from "lucide-react"

export default function ShopperDashboard() {
  const router = useRouter()
  const { currentUser, orders, cart, menuItems } = useStore()

  useEffect(() => {
    if (!currentUser || currentUser.role !== "shopper") {
      router.push("/login")
    }
  }, [currentUser, router])

  if (!currentUser || currentUser.role !== "shopper") {
    return null
  }

  const userOrders = orders.filter((order) => order.userId === currentUser.id)
  const activeOrders = userOrders.filter((o) => o.status === "pending" || o.status === "preparing")
  const readyOrders = userOrders.filter((o) => o.status === "ready")
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const availableItems = menuItems.filter((item) => item.available)

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
      case "preparing":
        return <Badge className="bg-blue-100 text-blue-700">Preparing</Badge>
      case "ready":
        return <Badge className="bg-green-100 text-green-700">Ready for Pickup</Badge>
      case "completed":
        return <Badge className="bg-gray-100 text-gray-700">Completed</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>
      default:
        return null
    }
  }

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
                <h1 className="text-2xl font-bold">Welcome, {currentUser.name}!</h1>
                <p className="text-white/80">What would you like to order today?</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/cart">
              <Card className="cursor-pointer border-[#800000]/20 transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="relative rounded-full bg-[#800000]/10 p-2.5">
                      <ShoppingCart className="h-5 w-5 text-[#800000]" />
                      {cartItemCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#800000] text-xs text-white">
                          {cartItemCount}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-xl font-bold text-foreground">{cartItemCount}</p>
                      <p className="text-sm text-muted-foreground">Items in Cart</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Card className="border-[#800000]/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-yellow-100 p-2.5">
                    <Clock className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">{activeOrders.length}</p>
                    <p className="text-sm text-muted-foreground">Active Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#800000]/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-green-100 p-2.5">
                    <CheckCircle className="h-5 w-5 text-green-700" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-foreground">{readyOrders.length}</p>
                    <p className="text-sm text-muted-foreground">Ready for Pickup</p>
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
                    <p className="text-xl font-bold text-foreground">{userOrders.length}</p>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ready Orders Alert */}
          {readyOrders.length > 0 && (
            <Card className="mb-6 border-green-300 bg-green-50">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base text-green-700">
                  <CheckCircle className="h-5 w-5" />
                  Orders Ready for Pickup!
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  {readyOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between rounded-lg bg-white p-3">
                      <div>
                        <p className="font-semibold text-foreground">Order #{order.id.slice(-6).toUpperCase()}</p>
                        <p className="text-sm text-muted-foreground">{order.items.length} items - P{order.total.toFixed(0)}</p>
                      </div>
                      <Badge className="bg-green-500 text-white">Ready</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Menu Section */}
          <Card className="mb-6 border-[#800000]/20">
            <CardHeader className="border-b pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Utensils className="h-5 w-5 text-[#800000]" />
                  Available Menu ({availableItems.length} items)
                </CardTitle>
                <Link href="/menu">
                  <Button variant="outline" size="sm" className="border-[#800000] text-[#800000] hover:bg-[#800000]/5">
                    View All Menu
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              {availableItems.length === 0 ? (
                <div className="py-8 text-center">
                  <Utensils className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
                  <p className="text-muted-foreground">No menu items available yet</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {availableItems.slice(0, 8).map((item) => (
                    <MenuCard key={item.id} item={item} />
                  ))}
                </div>
              )}
              {availableItems.length > 8 && (
                <div className="mt-4 text-center">
                  <Link href="/menu">
                    <Button className="bg-[#800000] hover:bg-[#600000]">
                      View All {availableItems.length} Items
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order History */}
          <Card className="border-[#800000]/20">
            <CardHeader className="border-b pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Package className="h-5 w-5 text-[#800000]" />
                Your Orders ({userOrders.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {userOrders.length === 0 ? (
                <div className="py-8 text-center">
                  <ShoppingBag className="mx-auto mb-3 h-10 w-10 text-muted-foreground/50" />
                  <p className="mb-4 text-muted-foreground">No orders yet</p>
                  <Link href="/menu">
                    <Button className="gap-2 bg-[#800000] hover:bg-[#600000]">
                      <Utensils className="h-4 w-4" />
                      Start Ordering
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {userOrders
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .slice(0, 5)
                    .map((order) => (
                      <div key={order.id} className="rounded-lg border border-[#800000]/10 bg-[#800000]/5 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-foreground">Order #{order.id.slice(-6).toUpperCase()}</p>
                            <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</p>
                          </div>
                          {getOrderStatusBadge(order.status)}
                        </div>
                        <div className="mb-2 space-y-1 text-sm">
                          {order.items.slice(0, 2).map((item) => (
                            <div key={item.menuItem.id} className="flex justify-between text-muted-foreground">
                              <span>{item.quantity}x {item.menuItem.name}</span>
                              <span>P{(item.menuItem.price * item.quantity).toFixed(0)}</span>
                            </div>
                          ))}
                          {order.items.length > 2 && (
                            <p className="text-xs text-muted-foreground">+{order.items.length - 2} more items</p>
                          )}
                        </div>
                        <div className="flex items-center justify-between border-t border-[#800000]/10 pt-2">
                          <span className="text-xs text-muted-foreground">From: {order.items[0]?.menuItem.sellerName}</span>
                          <span className="font-semibold text-[#800000]">Total: P{order.total.toFixed(0)}</span>
                        </div>
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
