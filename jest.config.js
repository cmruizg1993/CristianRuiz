module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup.jest.ts'],
    testEnvironmentOptions: {
        url: "http://localhost:3002"
    }
}