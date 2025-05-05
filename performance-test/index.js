const PerformanceTestRunner = require('./performance-test-runner');

async function main() {
    try {
        console.log('Starting performance tests...');

        const runner = new PerformanceTestRunner();
        const result = await runner.runTests();

        console.log(`Tests completed successfully. Report generated at: ${result.reportPath}`);
        process.exit(0);
    } catch (error) {
        console.error('Test execution failed:', error);
        process.exit(1);
    }
}

main();

