module.exports = {
    transform: {
      '^.+\\.ts$': 'babel-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
  };
  