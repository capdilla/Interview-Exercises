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
