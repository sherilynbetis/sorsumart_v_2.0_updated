"use client"

import Image from "next/image"
import { useStore, type MenuItem } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MenuCardProps {
  item: MenuItem
  showAddToCart?: boolean
}

export function MenuCard({ item, showAddToCart = true }: MenuCardProps) {
  const { currentUser, addToCart } = useStore()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (!currentUser) {
      toast({
        title: "Please login",
        description: "You need to login as a shopper to add items to cart.",
        variant: "destructive",
      })
      return
    }

    if (currentUser.role !== "shopper") {
      toast({
        title: "Not allowed",
        description: "Only shoppers can add items to cart.",
        variant: "destructive",
      })
      return
    }

    addToCart(item)
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  return (
    <Card className="overflow-hidden border-[#800000]/20 transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-[#800000]/5">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <Badge variant="secondary" className="bg-gray-200">Not Available</Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="font-semibold text-foreground">{item.name}</h3>
          <Badge variant="outline" className="shrink-0 border-[#800000]/30 text-[#800000]">
            {item.category}
          </Badge>
        </div>
        <p className="mb-2 line-clamp-2 text-sm text-muted-foreground">
          {item.description}
        </p>
        <p className="text-xs text-muted-foreground">by {item.sellerName}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t border-[#800000]/10 p-4">
        <span className="text-lg font-bold text-[#800000]">
          P{item.price.toFixed(0)}
        </span>
        {showAddToCart && item.available && (
          <Button size="sm" onClick={handleAddToCart} className="gap-1 bg-[#800000] hover:bg-[#600000]">
            <Plus className="h-4 w-4" />
            <ShoppingCart className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
