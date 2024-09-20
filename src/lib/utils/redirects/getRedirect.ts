import includesOne from "../includesOne"
import isPageRequest from "./isPageRequest"
import { RedirectsConfig } from "./types"

const getRedirect = ({ url, options }: RedirectsConfig) => {
  const isAllowedRequest = isPageRequest(url)

  if (!isAllowedRequest) {
    return
  }

  const path = "/" + url.split("/").splice(3).join("/")

  for (let i = 0; i < options.length; i++) {
    const { paths, when, to } = options[i]
    const isIncluded = includesOne(path, paths)
    if (isIncluded && when) {
      return new URL(to, url)
    }
  }
}

export default getRedirect
