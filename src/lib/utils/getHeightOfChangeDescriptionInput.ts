const getHeightOfChangeDescriptionInput = (value: string) => {
  return Math.floor(value.length / 70) * 30 + 30
}

export default getHeightOfChangeDescriptionInput
