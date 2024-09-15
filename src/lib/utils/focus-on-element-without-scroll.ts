const focusOnElementWithoutScroll = (id: string) => {
  const intervalId = setInterval(() => {
    const element = document.getElementById(id)
    if (element) {
      element.focus({ preventScroll: true })
    }
    if (document.activeElement == element) {
      clearInterval(intervalId)
    }
  }, 100)
}

export default focusOnElementWithoutScroll
