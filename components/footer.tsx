import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-[#800000]/10 bg-[#800000]">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Sorsu%20Cart-z8emDYUZDoV38gyHdEOjxVm8OdK6Ct.jpg"
                alt="SorSU Mart Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-xl font-bold text-white">SorSU Mart</span>
            </div>
            <p className="text-sm text-white/70">
              Official food ordering system for Sorsogon State University, Bulan Campus.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-white/70 hover:text-white">
                Home
              </Link>
              <Link href="/menu" className="text-sm text-white/70 hover:text-white">
                Menu
              </Link>
              <Link href="/about" className="text-sm text-white/70 hover:text-white">
                About
              </Link>
              <Link href="/contact" className="text-sm text-white/70 hover:text-white">
                Contact
              </Link>
            </nav>
          </div>

          {/* Account */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Account</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/login" className="text-sm text-white/70 hover:text-white">
                Login
              </Link>
              <Link href="/register" className="text-sm text-white/70 hover:text-white">
                Register
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-sm text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>Sorsogon State University, Bulan Campus, Bulan, Sorsogon</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="h-4 w-4 shrink-0" />
                <span>sorsumart@sorsu.edu.ph</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="h-4 w-4 shrink-0" />
                <span>(056) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/20 pt-8 text-center">
          <p className="text-sm text-white/70">
            &copy; {new Date().getFullYear()} SorSU Mart - Sorsogon State University, Bulan Campus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
