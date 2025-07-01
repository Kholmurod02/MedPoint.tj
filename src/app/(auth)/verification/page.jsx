"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/shared/ui/button"
import { Input } from "@/shared/ui/input"
import { Mail, Check, Users } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Component() {
    const [code, setCode] = useState(["", "", "", "", "", ""])
    const [countdown, setCountdown] = useState(57)
    const inputRefs = useRef([])
    const router = useRouter()

    const [userEmail, setUserEmail] = useState("")

    useEffect(() => {
        if (typeof window !== "undefined") {
            const email = sessionStorage.getItem("emailForVerification")
            if (email) {
                setUserEmail(email)
            }
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        router.push("/login")

    }

    const handleInputChange = (index, value) => {
        if (value.length > 1) return

        const newCode = [...code]
        newCode[index] = value
        setCode(newCode)

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus()
        }
    }

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus()
        }
    }

    const handlePaste = (e) => {
        e.preventDefault()
        const pastedData = e.clipboardData.getData("text").slice(0, 6)
        const newCode = [...code]

        for (let i = 0; i < pastedData.length && i < 6; i++) {
            if (/^\d$/.test(pastedData[i])) {
                newCode[i] = pastedData[i]
            }
        }

        setCode(newCode)

        const nextEmptyIndex = newCode.findIndex((digit) => digit === "")
        const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex
        inputRefs.current[focusIndex]?.focus()
    }

    const isComplete = code.every((digit) => digit !== "")

    useEffect(() => {
        inputRefs.current[0]?.focus()
    }, [])

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    return (
        <div className="min-h-screen bg-gray-50 flex">



            {/* Right Side */}
            <div className="flex-1 flex flex-col justify-center items-center p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Email Icon */}
                    <div className="text-center">
                        <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail className="w-10 h-10 text-teal-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Check Your Email</h2>
                        <p className="text-gray-600 mb-2">We've sent a 6-digit verification code to</p>
                        <p className="text-teal-600 font-medium">{userEmail}</p>
                    </div>

                    {/* Verification Form */}
                    <>
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-4 text-center">
                                    Enter Verification Code
                                </label>
                                <div className="flex justify-center gap-3">
                                    {code.map((digit, index) => (
                                        <Input
                                            key={index}
                                            ref={(el) => (inputRefs.current[index] = el)}
                                            type="text"
                                            inputMode="numeric"
                                            pattern="[0-9]"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleInputChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={handlePaste}
                                            className="w-12 h-12 text-center text-lg font-semibold border-gray-300 focus:border-teal-500 focus:ring-teal-500 rounded-lg"
                                            aria-label={`Digit ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            <Button
                                className={`w-full h-12 text-white font-semibold rounded-lg transition-all duration-200 ${isComplete ? "bg-teal-400 hover:bg-teal-500" : "bg-teal-300 cursor-not-allowed"
                                    }`}
                                disabled={!isComplete}
                            >
                                Verify Email
                            </Button>

                            <div className="text-center space-y-2">
                                <p className="text-sm text-gray-600">Didn't receive the code?</p>
                                {countdown > 0 ? (
                                    <p className="text-sm text-teal-500">Resend code in {countdown}s</p>
                                ) : (
                                    <button className="text-sm text-teal-600 hover:text-teal-700 font-medium">Resend code</button>
                                )}
                            </div>
                        </form>
                    </>

                    {/* Footer Text */}
                    <p className="text-xs text-gray-500 text-center">
                        For security reasons, this code will expire in 10 minutes.
                    </p>
                </div>
            </div>
        </div>
    )
}
