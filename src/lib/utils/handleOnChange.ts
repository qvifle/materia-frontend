const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (!e?.target.value) {
    return
  }
  const removeSpaces = e.target.value.replace(/\s/g, "")
  return removeSpaces
}

export default handleOnChange
