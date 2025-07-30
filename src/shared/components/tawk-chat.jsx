"use client"

import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { useEffect } from "react"
import { usePathname } from "next/navigation"

export default function TawkToChat() {
  const pathname = usePathname()
  

  useEffect(() => {
    const token = Cookies.get("token")
    if (!token) return

    try {
      const decoded = jwtDecode(token)
      const role = decoded?.['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']

      const allowedPaths = ["/", "/doctors", "/about", "/contact"] // пути, где показывать чат

      if (role === "User" && allowedPaths.includes(pathname)) {
        const script = document.createElement("script")
        script.src = "https://embed.tawk.to/6885de888beeee192b5d6b2f/1j15eqhuu"
        script.async = true
        script.charset = "UTF-8"
        script.setAttribute("crossorigin", "*")
        document.body.appendChild(script)
      }
    } catch (error) {
      console.error("Invalid token:", error)
    }
  }, [pathname]) 

  return null
}
