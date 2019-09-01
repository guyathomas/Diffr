import get from "lodash/get";

const processArrayDiff = (before, after, keyPathsToDiff, uniqueItemID) => {

  const createIdToItemMap = item => [get(item, uniqueItemID), item];
  const beforeIdItemMap = new Map(before.map(createIdToItemMap));
  const afterIdItemMap = new Map(after.map(createIdToItemMap));

  const allIds = [...new Set([...beforeIdItemMap.keys(), ...afterIdItemMap.keys()])];
  return allIds.reduce(
    (acc, id) => {
      if (beforeIdItemMap.has(id) && !afterIdItemMap.has(id)) {
        acc.removed.push(beforeIdItemMap.get(id));
      } else if (!beforeIdItemMap.has(id) && afterIdItemMap.has(id)) {
        acc.added.push(afterIdItemMap.get(id));
      } else if (beforeIdItemMap.has(id) && afterIdItemMap.has(id)) {
        const changedValues = keyPathsToDiff.filter(keyPath => get(beforeIdItemMap.get(id), keyPath) !== get(afterIdItemMap.get(id), keyPath));
        if (changedValues.length) {
          acc.changed.push({
            before: beforeIdItemMap.get(id),
            after: afterIdItemMap.get(id),
            changedValues
          });
        }
      }
      return acc;
    },
    { added: [], removed: [], changed: [] }
  );
};

const processSingleDiff = (before, after, keyPathsToDiff) => {
  const hasValueAtPathChanged = keyPath => get(before, keyPath) !== get(after, keyPath);
  const changedValues = keyPathsToDiff.filter(hasValueAtPathChanged);
  const returnValue = { changed: [] };
  if (changedValues.length) {
    returnValue.changed.push({ before, after, changedValues });
  }
  return returnValue;
};

// Returns Added, Removed and Changed fields
export default getDiff = (beforeJSON, afterJSON, pathToResult = '', keyPathsToDiff, uniqueItemID) => {
  if (!beforeJSON || !afterJSON) {
    throw new Error("Please provide all arguments");
  }

  const ROOT_PATH = '';
  const before = pathToResult === ROOT_PATH ? beforeJSON : get(beforeJSON, pathToResult);
  const after = pathToResult === ROOT_PATH ? afterJSON : get(afterJSON, pathToResult);

  if (Array.isArray(before) && Array.isArray(after)) {
    return processArrayDiff(before, after, keyPathsToDiff, uniqueItemID)
  } else {
    return processSingleDiff(before, after, keyPathsToDiff);
  }
};

// const config = {
//   pathToResult: "products",
//   itemIdentifer: "id",
//   diffKeyPaths: ["price.current.value"]
// };

// getDiff(MOCK, MOCK2, config);
// const singleDiffParams = [
//     { a: { b: 4 }},
//     { a: { b: 2 }},
//     { pathToResult: '', itemIdentifer: '', diffKeyPaths: ['a.b']}
// ]
// getDiff(...singleDiffParams);