const capitalize = (string: string) => {
  return `${string[0].toUpperCase()}${string
    .slice(1, string.length)
    .toLowerCase()}`;
};

export default capitalize;
