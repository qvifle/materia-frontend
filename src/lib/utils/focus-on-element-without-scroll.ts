const focusOnElementWithoutScroll = (id: string) => {
  setTimeout(() => {
    document.getElementById(id)?.focus({ preventScroll: true })
  }, 1)
}

export default focusOnElementWithoutScroll