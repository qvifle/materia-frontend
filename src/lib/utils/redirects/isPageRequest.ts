import includesOne from "../includesOne"

const isPageRequest = (url: string) => {
  if (includesOne(url, ["api", "_next"])) {
    return false
  }

  return true
}

export default isPageRequest
