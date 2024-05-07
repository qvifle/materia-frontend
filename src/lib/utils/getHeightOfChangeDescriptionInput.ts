const getHeightOfChangeDescriptionInput = (value: string) => {
  return Math.floor(value.length / 40) * 30 + 40;
};

export default getHeightOfChangeDescriptionInput;
