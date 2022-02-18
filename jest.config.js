module.exports = {
  roots: [
    './tests',
  ],
  testMatch: [
    '**/tests/**/*.+(tsx)',
    '**/?(*.)+(test).+(tsx)',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
