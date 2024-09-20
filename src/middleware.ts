import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import { RedirectsConfig } from "./lib/utils/redirects/types"
import getRedirect from "./lib/utils/redirects/getRedirect"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req })
  const isAuth = !!token

  const redirectsConfig: RedirectsConfig = {
    url: req.url,
    options: [
      {
        paths: ["/login", "/registration"],
        when: isAuth,
        to: "/home",
      },
      {
        paths: ["/home"],
        when: !isAuth,
        to: "/login",
      },
    ],
  }

  const redirectPath = getRedirect(redirectsConfig)

  if (!!redirectPath) {
    return NextResponse.redirect(redirectPath)
  }
}
