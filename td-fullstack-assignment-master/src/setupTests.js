import '@testing-library/jest-dom';

// setupTests.js
if (!window.getSelection) {
  window.getSelection = () => ({
    removeAllRanges: () => {},
    addRange: () => {},
    getRangeAt: () => ({
      cloneRange: () => ({
        getBoundingClientRect: () => ({}),
        getClientRects: () => [],
      }),
    }),
  });
}

if (!document.getSelection) {
  document.getSelection = window.getSelection;
}
