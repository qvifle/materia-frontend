const focusOnElementWithoutScroll = (id: string) => {
  setInterval(() => {
    console.log(document.getElementById(id))
    document.getElementById(id)?.focus({ preventScroll: true })
  }, 1)
}

export default focusOnElementWithoutScroll
