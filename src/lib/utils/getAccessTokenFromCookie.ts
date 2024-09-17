const getTokensFromCookie = (cookie: string[]) => {
  let accessToken: undefined | string
  for (let i = 0; i < cookie.length; i++) {
    const [name, value] = cookie[i].split(";")[0].split("=")
    if (name === "accessToken") {
      accessToken = value
      break
    }
  }

  if (!accessToken) {
    throw new Error("Can not parse access token")
  }

  return accessToken as string
}

export default getTokensFromCookie
