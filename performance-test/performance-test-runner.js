const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const config = require('./config');
const loadTimeMetric = require('./metrics/load-time');
const renderTimeMetric = require('./metrics/render-time');
const memoryUsageMetric = require('./metrics/memory-usage');
const statistics = require('./utils/statistics');
const waitForServer = require('./utils/wait-for-server');
const HtmlReporter = require('./reporters/html-reporter');

class PerformanceTestRunner {
    constructor() {
        this.results = {
            react: {},
            vue: {}
        };
        this.reporter = HtmlReporter;
        this.browser = null;
    }

    async initialize() {
        console.log('Initializing test runner...');

        if (!fs.existsSync(config.reportDir)) {
            fs.mkdirSync(config.reportDir, { recursive: true });
        }

        if (config.screenshots && !fs.existsSync(config.screenshotDir)) {
            fs.mkdirSync(config.screenshotDir, { recursive: true });
        }

        try {
            this.browser = await puppeteer.launch({
                headless: config.headless ? 'new' : false,
                args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
                defaultViewport: { width: 1920, height: 1080 }
            });
            console.log('Browser launched successfully');
        } catch (error) {
            console.error('Failed to launch browser:', error);
            throw error;
        }
    }

    async runTests() {
        try {
            await this.initialize();

            console.log('Checking if application servers are available...');

            const reactAvailable = await waitForServer(
                config.applications.react.baseUrl,
                config.serverCheckRetries,
                config.serverCheckTimeout
            );

            const vueAvailable = await waitForServer(
                config.applications.vue.baseUrl,
                config.serverCheckRetries,
                config.serverCheckTimeout
            );

            if (!reactAvailable) {
                console.error(`The React application at ${config.applications.react.baseUrl} is not available. Please make sure it's running.`);
                console.log('Continuing with Vue tests only...');
            }

            if (!vueAvailable) {
                console.error(`The Vue application at ${config.applications.vue.baseUrl} is not available. Please make sure it's running.`);
                console.log('Continuing with React tests only...');
            }

            if (!reactAvailable && !vueAvailable) {
                throw new Error('Both applications are not available. Aborting tests.');
            }

            if (reactAvailable) {
                console.log(`Testing ${config.applications.react.name}...`);
                this.results.react = await this.testApplication('react');
            }

            if (vueAvailable) {
                console.log(`Testing ${config.applications.vue.name}...`);
                this.results.vue = await this.testApplication('vue');
            }

            const timestamp = new Date().toISOString().replace(/:/g, '-');
            const reportPath = path.join(config.reportDir, `performance-report-${timestamp}.html`);
            this.reporter.generateReport(this.results, reportPath);

            await this.cleanup();
            console.log('Performance tests completed successfully!');

            return {
                success: true,
                reportPath
            };
        } catch (error) {
            console.error('Error running performance tests:', error);
            await this.cleanup();
            throw error;
        }
    }

    async testApplication(appType) {
        const appConfig = config.applications[appType];
        const results = {};

        for (const route of appConfig.routes) {
            console.log(`  Testing route: ${route.name} (${route.path})`);
            results[route.path] = await this.testRoute(appType, route);
        }

        return results;
    }

    async testRoute(appType, route) {
        const appConfig = config.applications[appType];
        const url = `${appConfig.baseUrl}${route.path}`;
        const routeResults = {
            loadTime: { values: [] },
            renderTime: { values: [] },
            memoryUsage: { values: [] }
        };

        for (let i = 0; i < config.testIterations; i++) {
            console.log(`    Iteration ${i + 1}/${config.testIterations}`);
            const page = await this.browser.newPage();

            try {
                await page.setViewport({ width: 1920, height: 1080 });
                await page.setCacheEnabled(false);

                const loadTime = await loadTimeMetric.measure(page, url);
                const renderTime = await renderTimeMetric.measure(page, url);
                const memoryUsage = await memoryUsageMetric.measure(page, url);

                routeResults.loadTime.values.push(loadTime);
                routeResults.renderTime.values.push(renderTime);
                routeResults.memoryUsage.values.push(memoryUsage);

                if (config.screenshots) {
                    const screenshotDir = path.join(config.screenshotDir, appType);
                    if (!fs.existsSync(screenshotDir)) {
                        fs.mkdirSync(screenshotDir, { recursive: true });
                    }

                    const screenshotPath = path.join(
                        screenshotDir,
                        `${route.path.replace(/\//g, '_') || 'home'}_${i + 1}.png`
                    );

                    await page.screenshot({ path: screenshotPath, fullPage: true });
                }
            } catch (error) {
                console.error(`Error testing ${appType} - ${route.path}:`, error.message);
            } finally {
                await page.close();
            }
        }

        for (const metric in routeResults) {
            if (routeResults[metric].values.length > 0) {
                routeResults[metric] = {
                    ...routeResults[metric],
                    ...statistics.summarize(routeResults[metric].values)
                };
            }
        }

        return routeResults;
    }

    async cleanup() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
}

module.exports = PerformanceTestRunner;
