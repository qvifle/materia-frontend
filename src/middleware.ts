import { getSession } from "next-auth/react"
import { NextRequest } from "next/server"
import { withAuth } from "next-auth/middleware"

// export async function middleware(req: NextRequest) {
//   // const session = await getServerSession()
//   // console.log(req)
//   // return NextResponse.redirect(new URL("/home", request.url))
// }

export default withAuth(async function middleware(req: NextRequest) {
  console.log("lesgo")
})

export const config = {
  matcher: ["/home/:path*"],
  // matcher: ["/home/:path*"],
}
