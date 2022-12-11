function insert<T>(arr: T[], index: number, newItem: T) {
  return [...arr.slice(0, index + 1), newItem, ...arr.slice(index + 1)];
}

// function randomId<T extends FormDataId>(list: T[]) {
//   const ids = list.map(item => item.id);
//   let newId = ids[ids.length - 1] + 1;

//   while (ids.includes(newId)) {
//     newId = newId++;
//   }

//   return newId;
// }

export { insert };
