/*
    arr = [1,2,3,4,5,6,7,8,9,10]
    => [[1,2,3],[4,5,6],[7,8,9],[10]]
*/
const sliceIntoChunks = (arr, chunkSize) => {
  const res = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    res.push(chunk);
  }
  return res;
};
export { sliceIntoChunks };
