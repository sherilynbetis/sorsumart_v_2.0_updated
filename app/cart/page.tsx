"use client"

import { useEffect, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, CreditCard } from "lucide-react"

export default function CartPage() {
  const router = useRouter()
  const { currentUser, cart, updateCartQuantity, removeFromCart, createOrder, clearCart } = useStore()
  const { toast } = useToast()

  useEffect(() => {
    if (!currentUser || currentUser.role !== "shopper") {
      router.push("/login")
    }
  }, [currentUser, router])

  // Group cart items by seller
  const groupedCart = useMemo(() => {
    const groups: { [sellerId: string]: { sellerName: string; items: typeof cart } } = {}
    cart.forEach((cartItem) => {
      const sellerId = cartItem.menuItem.sellerId
      if (!groups[sellerId]) {
        groups[sellerId] = {
          sellerName: cartItem.menuItem.sellerName,
          items: [],
        }
      }
      groups[sellerId].items.push(cartItem)
    })
    return groups
  }, [cart])

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.menuItem.price * item.quantity,
    0
  )

  const handleCheckout = (sellerId: string) => {
    createOrder(sellerId)
    toast({
      title: "Order Placed",
      description: "Your order has been placed successfully. The seller will prepare your food.",
    })
  }

  const handleCheckoutAll = () => {
    Object.keys(groupedCart).forEach((sellerId) => {
      createOrder(sellerId)
    })
    toast({
      title: "All Orders Placed",
      description: "All your orders have been placed successfully.",
    })
  }

  if (!currentUser || currentUser.role !== "shopper") {
    return null
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          <Link
            href="/menu"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[#800000]"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>

          {/* Page Header */}
          <div className="mb-6 rounded-xl bg-[#800000] p-6 text-white">
            <div className="flex items-center gap-4">
              <ShoppingCart className="h-10 w-10" />
              <div>
                <h1 className="text-2xl font-bold">Shopping Cart</h1>
                <p className="text-white/80">{cart.length} {cart.length === 1 ? "item" : "items"} in your cart</p>
              </div>
            </div>
          </div>

          {cart.length === 0 ? (
            <Card className="border-[#800000]/20 py-16 text-center">
              <CardContent className="flex flex-col items-center">
                <div className="mb-4 rounded-full bg-[#800000]/10 p-4">
                  <ShoppingCart className="h-12 w-12 text-[#800000]" />
                </div>
                <h2 className="mb-2 text-xl font-semibold text-foreground">Your cart is empty</h2>
                <p className="mb-6 text-muted-foreground">
                  Browse our menu and add some delicious items to your cart
                </p>
                <Link href="/menu">
                  <Button className="gap-2 bg-[#800000] hover:bg-[#600000]">
                    <ShoppingCart className="h-4 w-4" />
                    Browse Menu
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="space-y-4 lg:col-span-2">
                {Object.entries(groupedCart).map(([sellerId, { sellerName, items }]) => (
                  <Card key={sellerId} className="border-[#800000]/20">
                    <CardHeader className="border-b border-[#800000]/10 bg-[#800000]/5">
                      <CardTitle className="text-lg text-[#800000]">{sellerName}</CardTitle>
                    </CardHeader>
                    <CardContent className="divide-y divide-[#800000]/10 p-0">
                      {items.map((cartItem) => (
                        <div
                          key={cartItem.menuItem.id}
                          className="flex items-center gap-4 p-4"
                        >
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-[#800000]/5">
                            <Image
                              src={cartItem.menuItem.image}
                              alt={cartItem.menuItem.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">
                              {cartItem.menuItem.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              P{cartItem.menuItem.price.toFixed(0)} each
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 border-[#800000]/20"
                              onClick={() =>
                                updateCartQuantity(
                                  cartItem.menuItem.id,
                                  cartItem.quantity - 1
                                )
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {cartItem.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 border-[#800000]/20"
                              onClick={() =>
                                updateCartQuantity(
                                  cartItem.menuItem.id,
                                  cartItem.quantity + 1
                                )
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-[#800000]">
                              P{(cartItem.menuItem.price * cartItem.quantity).toFixed(0)}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => removeFromCart(cartItem.menuItem.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter className="flex items-center justify-between border-t border-[#800000]/10 bg-[#800000]/5">
                      <div>
                        <p className="text-sm text-muted-foreground">Subtotal</p>
                        <p className="text-lg font-bold text-[#800000]">
                          P{items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0).toFixed(0)}
                        </p>
                      </div>
                      <Button onClick={() => handleCheckout(sellerId)} className="gap-2 bg-[#800000] hover:bg-[#600000]">
                        <CreditCard className="h-4 w-4" />
                        Checkout
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 border-[#800000]/20">
                  <CardHeader className="border-b border-[#800000]/10">
                    <CardTitle className="text-[#800000]">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 pt-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Items ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
                      <span>P{totalAmount.toFixed(0)}</span>
                    </div>
                    <div className="border-t border-[#800000]/10 pt-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-[#800000]">P{totalAmount.toFixed(0)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-3">
                    <Button className="w-full gap-2 bg-[#800000] hover:bg-[#600000]" onClick={handleCheckoutAll}>
                      <CreditCard className="h-4 w-4" />
                      Checkout All Orders
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-destructive text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        clearCart()
                        toast({
                          title: "Cart Cleared",
                          description: "All items have been removed from your cart.",
                        })
                      }}
                    >
                      Clear Cart
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
