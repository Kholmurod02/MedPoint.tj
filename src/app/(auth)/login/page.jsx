"use client"


import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Card, CardContent } from "@/shared/ui/card"
import { Eye, EyeOff, Mail, Lock, ArrowRight, LogIn, ShieldCheck, Fingerprint } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import logo from "../../../../public/blackLogo.png"



export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8 p-8">
          <div className="relative w-80 h-32">
            <Image src={logo} alt="MedPoint Logo" fill className="object-contain" />
          </div>
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-light text-slate-700">Welcome Back</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Sign in to your MedPoint account and continue managing your healthcare practice with confidence and ease.
            </p>
          </div>
          <div className="flex space-x-4">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
               <LogIn/>
            </div>
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
             <ShieldCheck/>
            </div>
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center">
              <Fingerprint/>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="w-full bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-5">
              <div className="relative w-64 h-40 mx-auto">
                <Image src={logo} alt="MedPoint Logo" fill className="object-contain" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-slate-800 mb-2">Sign In</h3>
              <p className="text-slate-600">Enter your credentials to access your account</p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-500" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-slate-200 focus:border-teal-400 focus:ring-teal-400 h-12 rounded-xl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-teal-500" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-slate-200 focus:border-teal-400 focus:ring-teal-400 h-12 rounded-xl pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                  <p className="text-red-600 text-sm text-center">{error}</p>
                </div>
              )}

              <div className="flex items-end justify-end">
                
                <button
                  type="button"
                  className="text-sm text-teal-600 hover:text-teal-700 font-medium hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium py-3 h-12 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Signing In...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <div className="text-sm text-slate-600">
                Don't have an account?{" "}
              <Link href="/registration">
                <button className="text-teal-600 hover:text-teal-700 font-medium underline decoration-2 underline-offset-2">
                  Sign up here
                </button>
              </Link>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs text-slate-500 text-center">
                By signing in, you agree to our{" "}
                <a href="#" className="text-teal-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-teal-600 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
