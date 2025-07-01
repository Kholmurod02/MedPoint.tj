"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

import logo from "../../../../public/blackLogo.png"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import { Card, CardContent } from "@/shared/ui/card"
import { Eye, EyeOff, Mail, Lock, ArrowRight, ShieldCheck, MailCheck, UserPlus, User, Phone } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod" 



const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(9, "Phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export default function Registration() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data) => {
    setIsLoading(true)
    sessionStorage.setItem("emailForVerification", data.email)
    router.push("/verification")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side */}
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
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center"><MailCheck /></div>
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center"><UserPlus /></div>
            <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center"><ShieldCheck /></div>
          </div>
        </div>

        {/* Right Side */}
        <Card className="w-full bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-8">
            <div className="lg:hidden text-center mb-8">
              <div className="relative w-64 h-30 mx-auto">
                <Image src={logo} alt="MedPoint Logo" fill className="object-contain" />
              </div>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-slate-800 mb-2">Join MedPoint in just a few steps</h3>
              <p className="text-slate-600">Join thousands of professionals using MedPoint every day</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-teal-500" /> First Name
                </Label>
                <Input id="firstName" placeholder="Enter your name" {...register("firstName")} className="h-12 rounded-xl" />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <User className="w-4 h-4 text-teal-500" /> Last Name
                </Label>
                <Input id="lastName" placeholder="Enter your surname" {...register("lastName")} className="h-12 rounded-xl" />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-teal-500" /> Phone Number
                </Label>
                <Input id="phone" type="tel" placeholder="+992 900 900 900" {...register("phone")} className="h-12 rounded-xl" />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-500" /> Email Address
                </Label>
                <Input id="email" type="email" placeholder="Enter your email" {...register("email")} className="h-12 rounded-xl" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-teal-500" /> Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className="pr-12 h-12 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              {/* Forgot password */}
              <div className="flex items-end justify-end">
                <button type="button" className="text-sm text-teal-600 hover:text-teal-700 font-medium hover:underline">
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium h-12 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Creating Account...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-8 text-center text-sm text-slate-600">
              Already have an account?{" "}
              <Link href="/login">
                <button className="text-teal-600 hover:text-teal-700 font-medium underline">Sign in here</button>
              </Link>
            </div>

            <div className="mt-4">
              <p className="text-xs text-slate-500 text-center">
                By signing in, you agree to our{" "}
                <a href="#" className="text-teal-600 hover:underline">Terms of Service</a> and{" "}
                <a href="#" className="text-teal-600 hover:underline">Privacy Policy</a>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
