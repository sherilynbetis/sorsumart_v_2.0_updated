import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserRole = 'admin' | 'seller' | 'shopper'
export type UserStatus = 'pending' | 'approved' | 'rejected'

export interface User {
  id: string
  email: string
  contactNumber: string
  password: string
  role: UserRole
  status: UserStatus
  name: string
  createdAt: string
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  sellerId: string
  sellerName: string
  available: boolean
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
}

export interface Order {
  id: string
  userId: string
  userName: string
  items: CartItem[]
  total: number
  status: 'pending' | 'preparing' | 'ready' | 'completed' | 'cancelled'
  createdAt: string
  sellerId: string
}

interface StoreState {
  // Auth
  currentUser: User | null
  users: User[]
  login: (email: string, password: string) => User | null
  logout: () => void
  register: (user: Omit<User, 'id' | 'status' | 'createdAt'>) => boolean
  approveUser: (userId: string) => void
  rejectUser: (userId: string) => void

  // Menu
  menuItems: MenuItem[]
  addMenuItem: (item: Omit<MenuItem, 'id'>) => void
  updateMenuItem: (id: string, item: Partial<MenuItem>) => void
  deleteMenuItem: (id: string) => void

  // Cart
  cart: CartItem[]
  addToCart: (item: MenuItem) => void
  removeFromCart: (itemId: string) => void
  updateCartQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void

  // Orders
  orders: Order[]
  createOrder: (sellerId: string) => void
  updateOrderStatus: (orderId: string, status: Order['status']) => void
}

const defaultAdmin: User = {
  id: 'admin-1',
  email: 'admin@sorsu.edu.ph',
  contactNumber: '09123456789',
  password: 'admin123',
  role: 'admin',
  status: 'approved',
  name: 'System Admin',
  createdAt: new Date().toISOString(),
}

const defaultSeller: User = {
  id: 'seller-1',
  email: 'seller@sorsu.edu.ph',
  contactNumber: '09234567890',
  password: 'seller123',
  role: 'seller',
  status: 'approved',
  name: 'Campus Canteen',
  createdAt: new Date().toISOString(),
}

const defaultMenuItems: MenuItem[] = [
  {
    id: 'menu-1',
    name: 'Chicken Adobo',
    description: 'Classic Filipino chicken adobo with rice',
    price: 65,
    category: 'Meals/Rice Meals',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400',
    sellerId: 'seller-1',
    sellerName: 'Campus Canteen',
    available: true,
  },
  {
    id: 'menu-2',
    name: 'Sinigang na Baboy',
    description: 'Sour pork soup with vegetables and rice',
    price: 70,
    category: 'Lunch',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400',
    sellerId: 'seller-1',
    sellerName: 'Campus Canteen',
    available: true,
  },
  {
    id: 'menu-3',
    name: 'Tapsilog',
    description: 'Beef tapa with garlic rice and fried egg',
    price: 75,
    category: 'Breakfast',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400',
    sellerId: 'seller-1',
    sellerName: 'Campus Canteen',
    available: true,
  },
  {
    id: 'menu-4',
    name: 'Halo-Halo',
    description: 'Filipino shaved ice dessert with sweet beans and fruits',
    price: 45,
    category: 'Sweets/Desserts',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400',
    sellerId: 'seller-1',
    sellerName: 'Campus Canteen',
    available: true,
  },
  {
    id: 'menu-5',
    name: 'Iced Coffee',
    description: 'Refreshing cold brewed coffee',
    price: 35,
    category: 'Drinks/Beverages',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
    sellerId: 'seller-1',
    sellerName: 'Campus Canteen',
    available: true,
  },
  {
    id: 'menu-6',
    name: 'Lumpia Shanghai',
    description: 'Crispy Filipino spring rolls',
    price: 40,
    category: 'Quick Bites',
    image: 'https://images.unsplash.com/photo-1544025162-d76978e5c6b3?w=400',
    sellerId: 'seller-1',
    sellerName: 'Campus Canteen',
    available: true,
  },
  {
    id: 'menu-7',
    name: 'Bistek Tagalog',
    description: 'Filipino beef steak with onions and rice',
    price: 85,
    category: 'Dinner',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400',
    sellerId: 'seller-1',
    sellerName: 'Campus Canteen',
    available: true,
  },
]

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      users: [defaultAdmin, defaultSeller],
      menuItems: defaultMenuItems,
      cart: [],
      orders: [],

      login: (email, password) => {
        const user = get().users.find(
          (u) => u.email === email && u.password === password
        )
        if (user && user.status === 'approved') {
          set({ currentUser: user })
          return user
        }
        return null
      },

      logout: () => {
        set({ currentUser: null, cart: [] })
      },

      register: (userData) => {
        const exists = get().users.some((u) => u.email === userData.email)
        if (exists) return false

        const newUser: User = {
          ...userData,
          id: `user-${Date.now()}`,
          status: 'approved',
          createdAt: new Date().toISOString(),
        }
        set({ users: [...get().users, newUser] })
        return true
      },

      approveUser: (userId) => {
        set({
          users: get().users.map((u) =>
            u.id === userId ? { ...u, status: 'approved' } : u
          ),
        })
      },

      rejectUser: (userId) => {
        set({
          users: get().users.map((u) =>
            u.id === userId ? { ...u, status: 'rejected' } : u
          ),
        })
      },

      addMenuItem: (item) => {
        const newItem: MenuItem = {
          ...item,
          id: `menu-${Date.now()}`,
        }
        set({ menuItems: [...get().menuItems, newItem] })
      },

      updateMenuItem: (id, item) => {
        set({
          menuItems: get().menuItems.map((m) =>
            m.id === id ? { ...m, ...item } : m
          ),
        })
      },

      deleteMenuItem: (id) => {
        set({ menuItems: get().menuItems.filter((m) => m.id !== id) })
      },

      addToCart: (item) => {
        const cart = get().cart
        const existing = cart.find((c) => c.menuItem.id === item.id)
        if (existing) {
          set({
            cart: cart.map((c) =>
              c.menuItem.id === item.id
                ? { ...c, quantity: c.quantity + 1 }
                : c
            ),
          })
        } else {
          set({ cart: [...cart, { menuItem: item, quantity: 1 }] })
        }
      },

      removeFromCart: (itemId) => {
        set({ cart: get().cart.filter((c) => c.menuItem.id !== itemId) })
      },

      updateCartQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId)
        } else {
          set({
            cart: get().cart.map((c) =>
              c.menuItem.id === itemId ? { ...c, quantity } : c
            ),
          })
        }
      },

      clearCart: () => {
        set({ cart: [] })
      },

      createOrder: (sellerId) => {
        const { currentUser, cart } = get()
        if (!currentUser || cart.length === 0) return

        const sellerItems = cart.filter((c) => c.menuItem.sellerId === sellerId)
        if (sellerItems.length === 0) return

        const order: Order = {
          id: `order-${Date.now()}`,
          userId: currentUser.id,
          userName: currentUser.name,
          items: sellerItems,
          total: sellerItems.reduce(
            (sum, item) => sum + item.menuItem.price * item.quantity,
            0
          ),
          status: 'pending',
          createdAt: new Date().toISOString(),
          sellerId,
        }

        set({
          orders: [...get().orders, order],
          cart: cart.filter((c) => c.menuItem.sellerId !== sellerId),
        })
      },

      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        })
      },
    }),
    {
      name: 'sorsu-mart-storage',
    }
  )
)
