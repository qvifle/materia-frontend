const getIndexOfElementById = (id: string, array: any[]) => {
  return array.findIndex((el) => el.id === id);
};

export default getIndexOfElementById;
