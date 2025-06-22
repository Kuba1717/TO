const config = {
    applications: {
        react: {
            name: 'React Application',
            baseUrl: 'http://localhost:5173',
            apiUrl: 'http://localhost:8080',
            routes: [
                { path: '/login', name: 'Login' },
                { path: '/register', name: 'Register' },
                { path: '/main', name: 'Main Page' }
            ]
        },
        vue: {
            name: 'Vue Application',
            baseUrl: 'http://localhost:5174',
            apiUrl: 'http://localhost:8080',
            routes: [
                { path: '/login', name: 'Login' },
                { path: '/register', name: 'Register' },
                { path: '/main', name: 'Main Page' }
            ]
        }
    },
    metrics: [
        'loadTime',
        'renderTime',
        'apiResponse',
        'memoryUsage'
    ],
    testIterations: 5,
    warmupIterations: 3,
    reportDir: './reports',
    headless: false,
    screenshots: false,
    screenshotDir: './screenshots',
    timeout: 30000,
    serverCheckTimeout: 5000,
    serverCheckRetries: 1
};

module.exports = config;
