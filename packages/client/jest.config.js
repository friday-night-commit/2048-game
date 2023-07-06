import dotenv from 'dotenv';
dotenv.config();

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  automock: false,
  setupFilesAfterEnv: ['<rootDir>/src/jest-setup.ts'],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest'],
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(mp3)$': '<rootDir>/__mocks__/fileMock.js',
  },
};
