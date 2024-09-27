import removeDuplicates from "./removeDuplicates";

function insert<Type>(element: Type, index: number, array: Type[]): Type[] {
  const arr = [...array];
  const val = removeDuplicates([
    ...arr.slice(0, index),
    element,
    ...arr.slice(index),
  ]);
  return val;
}

export default insert;
