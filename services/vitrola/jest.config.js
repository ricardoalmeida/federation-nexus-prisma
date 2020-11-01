module.exports = {
    preset: 'ts-jest',
    roots: ['<rootDir>/tests'],
    transform: {
        '^.+\\.ts?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    testEnvironment: './prisma/test-environment.ts',
    setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
};
