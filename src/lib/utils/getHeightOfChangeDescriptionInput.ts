const getHeightOfChangeDescriptionInput = (value: string) => {
  return Math.floor(value.length / 45) * 25 + 25
}

export default getHeightOfChangeDescriptionInput
