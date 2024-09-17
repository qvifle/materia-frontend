import { getSession } from "next-auth/react"
import { NextRequest } from "next/server"
export { default } from "next-auth/middleware"

export const config = {
  matcher: ["/home/:path*"],
}
