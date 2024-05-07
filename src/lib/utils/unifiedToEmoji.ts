const unifiedToEmoji = (unifiedCode: string) => {
  const decimalCode = parseInt(unifiedCode, 16);
  const emoji = String.fromCodePoint(decimalCode);

  return emoji;
};

export default unifiedToEmoji;
