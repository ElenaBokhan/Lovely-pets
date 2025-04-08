import type {Config} from 'jest';

const config: Config = {
    // preset: 'ts-jest',
    clearMocks: true,
    automock: false,
    resetMocks: false,
    rootDir: process.env.PWD,
    testEnvironment: 'jsdom',
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '\\.(css|less)$': 'identity-obj-proxy',
        '@root(.*)$': '<rootDir>/src/$1',
        '\\.(svg)$': '<rootDir>/src/__mocks__/svgMock.js',
    },
    setupFiles: ['<rootDir>/jest/jest.setup.ts'],
    testMatch: ['**/__tests__/**/(*.)+(spec|test).[jt]s?(x)'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.[jt]sx?$': 'babel-jest',
        '^.+\\.svg$': '<rootDir>/svgTransform.js',

        // 'node_modules/variables/.+\\.(j|t)sx?$': 'ts-jest',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
};

export default config;
