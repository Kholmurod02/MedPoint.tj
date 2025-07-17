"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Menu, X, User, LogOut, Settings } from "lucide-react"
import { Button } from "@/shared/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user] = useState({ name: "John Doe", email: "john@example.com" })

  // Check for authentication token on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken")
    setIsLoggedIn(!!token)
  }, [])

  const navigationItems = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about" },
    { name: "Doctors", href: "/doctors" },
    { name: "Contact", href: "/contact" },
  ]

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    setIsLoggedIn(false)
    // Add your logout logic here
  }

  const handleLogin = () => {
    // Simulate login - replace with actual login logic
    localStorage.setItem("authToken", "sample-token")
    setIsLoggedIn(true)
    // Add your login logic here
  }

  return (
    <header className="bg-blue-900 text-white sticky top-0 z-100 container mx-auto px-4">
      <div className="">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section - Left on Desktop, Right on Mobile */}
          <div className="flex items-center order-last lg:order-first">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="MedPoint Logo"
                  width={80}
                  height={40}
                  className="w-20 h-10"
                />
              </div>
              <span className="font-bold text-xl sm:block">MedPoint</span>
            </Link>
          </div>

          {/* Mobile Menu Button - Left Side on Mobile */}
          <button className="lg:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation Menu - Desktop Only */}
          <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-blue-200 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right Side - Authentication Aware - Hidden on Mobile */}
          <div className="hidden lg:flex items-center space-x-4">

            {isLoggedIn ? (
              <>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center space-x-2 text-white hover:text-blue-200 transition-colors duration-200">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <User size={16} />
                      </div>
                      <span className="hidden xl:block">{user.name}</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem asChild>
                      <Link href="/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem> */}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href='/login'>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-blue-200 hover:bg-blue-700"
                    onClick={handleLogin}
                  >
                    Login
                  </Button>
                </Link>
                <Button
                  className="bg-white text-[#3B4A8C] hover:bg-blue-50 font-medium px-4 py-2 rounded-full"
                  onClick={handleLogin}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-blue-600">
            <div className="py-4 max-h-screen overflow-y-auto">
              

              {/* Navigation Links */}
              <nav className="px-4 space-y-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block py-3 px-2 text-white hover:text-blue-200 hover:bg-blue-700 rounded-lg transition-colors duration-200 font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* Mobile User Section */}
              {isLoggedIn ? (
                <div className="border-t border-blue-600 mt-4 pt-4 px-4">
                  <div className="space-y-2">
                   
                    <Link
                      href="/profile"
                      className="flex items-center space-x-3 py-3 px-2 text-white hover:text-blue-200 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={18} />
                      <span>My Profile</span>
                    </Link>
                    <Link
                      href="/settings"
                      className="flex items-center space-x-3 py-3 px-2 text-white hover:text-blue-200 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings size={18} />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="flex items-center space-x-3 w-full py-3 px-2 text-red-300 hover:text-red-200 hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-t border-blue-600 mt-4 pt-4 px-4 space-y-3">
                  <Button
                    className="w-full bg-white text-[#3B4A8C] hover:bg-blue-50 font-medium py-3 rounded-lg"
                    onClick={() => {
                      handleLogin()
                      setIsMenuOpen(false)
                    }}
                  >
                    Sign Up
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full text-white hover:text-blue-200 hover:bg-blue-700 py-3 rounded-lg"
                    onClick={() => {
                      handleLogin()
                      setIsMenuOpen(false)
                    }}
                  >
                    Login
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
