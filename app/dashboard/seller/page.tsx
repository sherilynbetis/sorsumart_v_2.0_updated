"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useStore, type MenuItem } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import {
  Plus,
  Package,
  ShoppingBag,
  Edit,
  Trash2,
  Utensils,
  Upload,
  ImageIcon,
} from "lucide-react"
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field"

const categories = ["Meals/Rice Meals", "Breakfast", "Lunch", "Dinner", "Drinks/Beverages", "Sweets/Desserts", "Quick Bites"]

export default function SellerDashboard() {
  const router = useRouter()
  const {
    currentUser,
    menuItems,
    orders,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    updateOrderStatus,
  } = useStore()
  const { toast } = useToast()

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Meals/Rice Meals",
    image: "",
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (!currentUser || currentUser.role !== "seller") {
      router.push("/login")
    }
  }, [currentUser, router])

  if (!currentUser || currentUser.role !== "seller") {
    return null
  }

  const sellerMenuItems = menuItems.filter((item) => item.sellerId === currentUser.id)
  const sellerOrders = orders.filter((order) => order.sellerId === currentUser.id)
  const pendingOrders = sellerOrders.filter((o) => o.status === "pending")

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      category: "Meals/Rice Meals",
      image: "",
    })
    setImagePreview(null)
    setEditingItem(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setFormData({ ...formData, image: base64String })
        setImagePreview(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.description || !formData.price || !formData.image) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields including image.",
        variant: "destructive",
      })
      return
    }

    if (editingItem) {
      updateMenuItem(editingItem.id, {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image,
      })
      toast({
        title: "Menu Item Updated",
        description: `${formData.name} has been updated.`,
      })
    } else {
      addMenuItem({
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image,
        sellerId: currentUser.id,
        sellerName: currentUser.name,
        available: true,
      })
      toast({
        title: "Menu Item Saved Successfully!",
        description: `${formData.name} is now visible to customers on the menu.`,
      })
    }

    resetForm()
    setIsAddDialogOpen(false)
  }

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      image: item.image,
    })
    setImagePreview(item.image)
    setIsAddDialogOpen(true)
  }

  const handleDelete = (item: MenuItem) => {
    deleteMenuItem(item.id)
    toast({
      title: "Menu Item Deleted",
      description: `${item.name} has been removed from your menu.`,
    })
  }

  const handleToggleAvailability = (item: MenuItem) => {
    updateMenuItem(item.id, { available: !item.available })
  }

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
      case "preparing":
        return <Badge className="bg-blue-100 text-blue-700">Preparing</Badge>
      case "ready":
        return <Badge className="bg-green-100 text-green-700">Ready</Badge>
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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sorsu%20Cart-z8emDYUZDoV38gyHdEOjxVm8OdK6Ct.jpg"
                  alt="SorSU Mart"
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
                <div>
                  <h1 className="text-2xl font-bold">Seller Dashboard</h1>
                  <p className="text-white/80">Welcome, {currentUser.name}</p>
                </div>
              </div>
              <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
                setIsAddDialogOpen(open)
                if (!open) resetForm()
              }}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-white text-[#800000] hover:bg-white/90">
                    <Plus className="h-4 w-4" />
                    Add Menu Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="flex max-h-[90vh] max-w-md flex-col">
                  <DialogHeader className="flex-shrink-0">
                    <DialogTitle className="text-[#800000]">{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
                    <DialogDescription>
                      {editingItem ? "Update your menu item details." : "Fill in the details and click Save to add to your menu."}
                    </DialogDescription>
                  </DialogHeader>
                  
                  {/* Scrollable content area */}
                  <div className="flex-1 overflow-y-auto pr-2">
                    <FieldGroup>
                      <Field>
                        <FieldLabel>Item Name *</FieldLabel>
                        <Input
                          placeholder="e.g., Chicken Adobo"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="border-[#800000]/20 focus-visible:ring-[#800000]"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Description *</FieldLabel>
                        <Textarea
                          placeholder="Describe your dish..."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          className="border-[#800000]/20 focus-visible:ring-[#800000]"
                          rows={3}
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Price (PHP) *</FieldLabel>
                        <Input
                          type="number"
                          placeholder="0.00"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="border-[#800000]/20 focus-visible:ring-[#800000]"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Category *</FieldLabel>
                        <Select
                          value={formData.category}
                          onValueChange={(value) => setFormData({ ...formData, category: value })}
                        >
                          <SelectTrigger className="border-[#800000]/20 focus:ring-[#800000]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((cat) => (
                              <SelectItem key={cat} value={cat}>
                                {cat}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </Field>
                      <Field>
                        <FieldLabel>Upload Image *</FieldLabel>
                        <div className="space-y-3">
                          {imagePreview ? (
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-[#800000]/20">
                              <Image
                                src={imagePreview}
                                alt="Preview"
                                fill
                                className="object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setImagePreview(null)
                                  setFormData({ ...formData, image: "" })
                                }}
                                className="absolute right-2 top-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          ) : (
                            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#800000]/30 bg-[#800000]/5 p-6 transition-colors hover:border-[#800000]/50 hover:bg-[#800000]/10">
                              <Upload className="mb-2 h-8 w-8 text-[#800000]/50" />
                              <span className="mb-1 text-sm font-medium text-[#800000]">Click to upload from gallery</span>
                              <span className="text-xs text-muted-foreground">PNG, JPG up to 5MB</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                              />
                            </label>
                          )}
                        </div>
                      </Field>
                    </FieldGroup>
                  </div>
                  
                  {/* Fixed footer with Save button */}
                  <div className="flex-shrink-0 border-t bg-background pt-4">
                    <div className="flex gap-3">
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => {
                          setIsAddDialogOpen(false)
                          resetForm()
                        }}
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSubmit} 
                        className="flex-1 bg-[#800000] hover:bg-[#600000] text-lg font-semibold py-6"
                      >
                        SAVE
                      </Button>
                    </div>
                    <p className="mt-2 text-center text-xs text-muted-foreground">
                      Your menu item will be visible to customers after saving
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Stats */}
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <Card className="border-[#800000]/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#800000]/10 p-2.5">
                    <Utensils className="h-5 w-5 text-[#800000]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{sellerMenuItems.length}</p>
                    <p className="text-sm text-muted-foreground">Menu Items</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#800000]/20">
              <CardContent className="p-5">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-yellow-100 p-2.5">
                    <ShoppingBag className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{pendingOrders.length}</p>
                    <p className="text-sm text-muted-foreground">Pending Orders</p>
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
                    <p className="text-2xl font-bold text-foreground">{sellerOrders.length}</p>
                    <p className="text-sm text-muted-foreground">Total Orders</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="menu" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2 lg:w-[280px]">
              <TabsTrigger value="menu" className="gap-2">
                <Package className="h-4 w-4" />
                Menu
              </TabsTrigger>
              <TabsTrigger value="orders" className="gap-2">
                <ShoppingBag className="h-4 w-4" />
                Orders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="menu">
              {sellerMenuItems.length === 0 ? (
                <Card className="border-[#800000]/20 py-12 text-center">
                  <CardContent className="flex flex-col items-center">
                    <Package className="mb-4 h-10 w-10 text-muted-foreground/50" />
                    <h3 className="mb-2 font-semibold text-foreground">No menu items yet</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Start adding items to your menu
                    </p>
                    <Button className="gap-2 bg-[#800000] hover:bg-[#600000]" onClick={() => setIsAddDialogOpen(true)}>
                      <Plus className="h-4 w-4" />
                      Add Your First Item
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {sellerMenuItems.map((item) => (
                    <Card key={item.id} className="overflow-hidden border-[#800000]/20">
                      <div className="relative aspect-video bg-[#800000]/5">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                        {!item.available && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                            <Badge variant="secondary" className="bg-gray-200">Unavailable</Badge>
                          </div>
                        )}
                      </div>
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-base">{item.name}</CardTitle>
                            <Badge variant="outline" className="mt-1 border-[#800000]/30 text-xs text-[#800000]">
                              {item.category}
                            </Badge>
                          </div>
                          <p className="font-bold text-[#800000]">P{item.price.toFixed(0)}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="px-4 pb-2">
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                          {item.description}
                        </p>
                      </CardContent>
                      <CardFooter className="flex items-center justify-between border-t border-[#800000]/10 p-3">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={item.available}
                            onCheckedChange={() => handleToggleAvailability(item)}
                          />
                          <span className="text-xs text-muted-foreground">
                            {item.available ? "Available" : "Unavailable"}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 hover:bg-[#800000]/10"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="h-4 w-4 text-[#800000]" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(item)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="orders">
              <Card className="border-[#800000]/20">
                <CardHeader className="border-b pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <ShoppingBag className="h-5 w-5 text-[#800000]" />
                    Orders ({sellerOrders.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  {sellerOrders.length === 0 ? (
                    <div className="py-8 text-center">
                      <ShoppingBag className="mx-auto mb-4 h-10 w-10 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">No orders yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {sellerOrders.map((order) => (
                        <div key={order.id} className="rounded-lg border border-[#800000]/10 bg-[#800000]/5 p-4">
                          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="font-semibold text-foreground">
                                Order #{order.id.slice(-6).toUpperCase()}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {order.userName} - {new Date(order.createdAt).toLocaleString()}
                              </p>
                            </div>
                            {getOrderStatusBadge(order.status)}
                          </div>
                          <div className="mb-3 space-y-1">
                            {order.items.map((item) => (
                              <div key={item.menuItem.id} className="flex justify-between text-sm">
                                <span>{item.quantity}x {item.menuItem.name}</span>
                                <span>P{(item.menuItem.price * item.quantity).toFixed(0)}</span>
                              </div>
                            ))}
                            <div className="border-t border-[#800000]/10 pt-2 font-semibold">
                              <div className="flex justify-between">
                                <span>Total</span>
                                <span className="text-[#800000]">P{order.total.toFixed(0)}</span>
                              </div>
                            </div>
                          </div>
                          {order.status !== "completed" && order.status !== "cancelled" && (
                            <div className="flex flex-wrap gap-2">
                              {order.status === "pending" && (
                                <Button
                                  size="sm"
                                  className="bg-[#800000] hover:bg-[#600000]"
                                  onClick={() => {
                                    updateOrderStatus(order.id, "preparing")
                                    toast({ title: "Order status updated to Preparing" })
                                  }}
                                >
                                  Start Preparing
                                </Button>
                              )}
                              {order.status === "preparing" && (
                                <Button
                                  size="sm"
                                  className="bg-[#800000] hover:bg-[#600000]"
                                  onClick={() => {
                                    updateOrderStatus(order.id, "ready")
                                    toast({ title: "Order is ready for pickup" })
                                  }}
                                >
                                  Mark as Ready
                                </Button>
                              )}
                              {order.status === "ready" && (
                                <Button
                                  size="sm"
                                  className="bg-[#800000] hover:bg-[#600000]"
                                  onClick={() => {
                                    updateOrderStatus(order.id, "completed")
                                    toast({ title: "Order completed" })
                                  }}
                                >
                                  Mark Complete
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-destructive text-destructive hover:bg-destructive/10"
                                onClick={() => {
                                  updateOrderStatus(order.id, "cancelled")
                                  toast({ title: "Order cancelled", variant: "destructive" })
                                }}
                              >
                                Cancel
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
