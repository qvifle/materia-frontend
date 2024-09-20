const includesOne = (src: string, strings: string[]) => {
  for (let i = 0; i < strings.length; i++) {
    const isIncludes = src.includes(strings[i])
    if (isIncludes) {
      return true
    }
  }

  return false
}

export default includesOne
