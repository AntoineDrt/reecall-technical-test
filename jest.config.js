module.exports = {
  testEnvironment: 'node',
  testEnvironmentOptions: {
    NODE_ENV: 'test',
  },
  preset: 'ts-jest',
  coveragePathIgnorePatterns: ['node_modules', 'dist', 'src/app.ts', 'src/main.ts', 'tests'],
  coverageReporters: ['text', 'lcov', 'clover', 'html'],
};