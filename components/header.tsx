"use client"

import Link from "next/link"
import Image from "next/image"
import { useStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Menu, User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

export function Header() {
  const { currentUser, logout, cart } = useStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const getDashboardLink = () => {
    if (!currentUser) return "/login"
    switch (currentUser.role) {
      case "admin":
        return "/dashboard/admin"
      case "seller":
        return "/dashboard/seller"
      case "shopper":
        return "/dashboard/shopper"
      default:
        return "/login"
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#800000]/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sorsu%20Cart-z8emDYUZDoV38gyHdEOjxVm8OdK6Ct.jpg"
            alt="SorSU Mart Logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="text-xl font-bold text-[#800000]">SorSU Mart</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-foreground/80 transition-colors hover:text-[#800000]">
            Home
          </Link>
          <Link href="/menu" className="text-sm font-medium text-foreground/80 transition-colors hover:text-[#800000]">
            Menu
          </Link>
          <Link href="/about" className="text-sm font-medium text-foreground/80 transition-colors hover:text-[#800000]">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-foreground/80 transition-colors hover:text-[#800000]">
            Contact
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          {currentUser ? (
            <>
              {currentUser.role === "shopper" && (
                <Link href="/cart" className="relative">
                  <Button variant="ghost" size="icon" className="hover:bg-[#800000]/10">
                    <ShoppingCart className="h-5 w-5 text-[#800000]" />
                    {cartItemCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#800000] text-xs text-white">
                        {cartItemCount}
                      </span>
                    )}
                  </Button>
                </Link>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-2 hover:bg-[#800000]/10">
                    <User className="h-4 w-4 text-[#800000]" />
                    {currentUser.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={getDashboardLink()}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logout()} className="text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="text-[#800000] hover:bg-[#800000]/10">Login</Button>
              </Link>
              <Link href="/register">
                <Button className="bg-[#800000] hover:bg-[#600000]">Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden hover:bg-[#800000]/10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <Menu className="h-5 w-5 text-[#800000]" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[#800000]/10 bg-white p-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-sm font-medium hover:text-[#800000]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/menu"
              className="text-sm font-medium hover:text-[#800000]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium hover:text-[#800000]"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:text-[#800000]"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            {currentUser ? (
              <>
                {currentUser.role === "shopper" && (
                  <Link
                    href="/cart"
                    className="text-sm font-medium hover:text-[#800000]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Cart ({cartItemCount})
                  </Link>
                )}
                <Link
                  href={getDashboardLink()}
                  className="text-sm font-medium hover:text-[#800000]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Button
                  variant="ghost"
                  className="justify-start p-0 text-destructive"
                  onClick={() => {
                    logout()
                    setMobileMenuOpen(false)
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex gap-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="text-[#800000]">Login</Button>
                </Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="bg-[#800000] hover:bg-[#600000]">Register</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
