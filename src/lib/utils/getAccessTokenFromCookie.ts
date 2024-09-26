const getCookieByKey = (cookies: string[], cookieName: string) => {
  let cookie: undefined | string
  for (let i = 0; i < cookies.length; i++) {
    const [name, value] = cookies[i].split(";")[0].split("=")
    if (name === cookieName) {
      cookie = value
      break
    }
  }

  if (!cookie) {
    throw new Error("Can not parse access token")
  }

  return cookie
}

const getTokens = (cookiesHeader: string[]) => {
  const accessToken = getCookieByKey(cookiesHeader, "accessToken")
  const refreshToken = getCookieByKey(cookiesHeader, "refreshToken")

  return { accessToken, refreshToken }
}

export default getTokens
