import "@testing-library/jest-dom";
global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };

global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};
