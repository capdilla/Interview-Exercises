export const detectSums = (array) => {
  if (!Array.isArray(array)) {
    throw new Error("Input is not an array");
  }

  const results = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      for (let k = 0; k < array.length; k++) {
        // skip if k is the same as i or j
        if (k === i || k === j) {
          continue;
        }

        // check if A[p1] + A[p2] === A[sum]
        if (array[i] + array[j] === array[k]) {
          results.push({ pA: i, pB: j, sum: k });
        }
      }
    }
  }

  return results;
};

export const detectSumsEfficient = (array) => {
  if (!Array.isArray(array)) {
    throw new Error("Input is not an array");
  }

  // Map to store the indexes of each value in the array
  // This allows us to find the indexes of the values in O(1) time
  const valueIndexed = new Map();
  for (let i = 0; i < array.length; i++) {
    const value = array[i];

    if (!valueIndexed.has(value)) {
      valueIndexed.set(value, []);
    }
    valueIndexed.get(value).push(i);
  }

  const results = [];
  for (let i = 0; i < array.length; i++) {
    for (let j = i + 1; j < array.length; j++) {
      const sum = array[i] + array[j];

      // Check if the sum exists in the map
      if (valueIndexed.has(sum)) {
        const indexes = valueIndexed.get(sum);
        // Iterate over the indexes of the sum
        // and push the results if they are not the same as i or j
        for (const k of indexes) {
          // skip if k is the same as i or j
          if (k === i || k === j) {
            continue;
          }
          results.push({ pA: i, pB: j, sum: k });
        }
      }
    }
  }
  return results;
};

export function calculateResult(input) {
  const parsedInput = input.split(",").map((i) => parseInt(i.trim(), 10));
  let error = null;
  let result = "";
  try {
    result = detectSums(input);
  } catch (e) {
    error = e.message;
  }
  return { input: parsedInput, result, error };
}
