import React from "react";

/**
 * Renders the result of the calculations.
 * @param {{Array<{pA: number, pB: number, sum: number}>}} param0
 * @returns
 */
export const RenderResult = ({ result }) => {
  if (!result || !result.length) {
    return <p className="App-error">No results found</p>;
  }

  return (
    <ul>
      {result.map((res, key) => (
        <li key={key}>
          pA: {res.pA} pB:{res.pB} sum:{res.sum}
        </li>
      ))}
    </ul>
  );
};
