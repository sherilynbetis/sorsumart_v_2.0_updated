"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MenuCard } from "@/components/menu-card"
import { useStore } from "@/lib/store"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Utensils } from "lucide-react"

export default function MenuPage() {
  const { menuItems, users } = useStore()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedSeller, setSelectedSeller] = useState<string>("all")

  const sellers = users.filter((u) => u.role === "seller" && u.status === "approved")
  const categories = [...new Set(menuItems.map((item) => item.category))]

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
      const matchesSeller = selectedSeller === "all" || item.sellerId === selectedSeller

      return matchesSearch && matchesCategory && matchesSeller && item.available
    })
  }, [menuItems, searchQuery, selectedCategory, selectedSeller])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Page Header */}
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
                <h1 className="text-2xl font-bold">Menu</h1>
                <p className="text-white/80">Browse and order from our selection of delicious campus food</p>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 rounded-xl border border-[#800000]/20 bg-white p-4 shadow-sm lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-[#800000]/20 pl-10 focus-visible:ring-[#800000]"
              />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full border-[#800000]/20 focus:ring-[#800000] sm:w-[180px]">
                  <Filter className="mr-2 h-4 w-4 text-[#800000]" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSeller} onValueChange={setSelectedSeller}>
                <SelectTrigger className="w-full border-[#800000]/20 focus:ring-[#800000] sm:w-[180px]">
                  <SelectValue placeholder="Seller" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sellers</SelectItem>
                  {sellers.map((seller) => (
                    <SelectItem key={seller.id} value={seller.id}>
                      {seller.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {(searchQuery || selectedCategory !== "all" || selectedSeller !== "all") && (
                <Button
                  variant="outline"
                  className="border-[#800000] text-[#800000] hover:bg-[#800000]/5"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedSeller("all")
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>

          {/* Results Count */}
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
          </p>

          {/* Menu Grid */}
          {filteredItems.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-[#800000]/20 bg-white py-16 text-center">
              <div className="mb-4 rounded-full bg-[#800000]/10 p-4">
                <Utensils className="h-8 w-8 text-[#800000]" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-foreground">No items found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
