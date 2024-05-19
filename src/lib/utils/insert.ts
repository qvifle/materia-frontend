function insert<Type>(element: Type, index: number, array: Type[]): Type[] {
  const newArray = [...array.slice(0, index), element, ...array.slice(index)];
  console.log("insert", element, index);
  console.log(newArray);
  return newArray;
}

export default insert;
