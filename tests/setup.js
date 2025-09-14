// Jest setup file
global.console = {
  ...console,
  // Suppress console.log during tests unless needed
  log: jest.fn(),
  // Keep error and warn for debugging
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};