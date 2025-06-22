class RenderTimeMetric {
    async measure(page, url) {
        try {
            const currentUrl = page.url();
            if (currentUrl !== url) {
                await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
            }

            const renderTime = await page.evaluate(() => {
                return new Promise((resolve) => {
                    const performanceEntries = performance.getEntriesByType('paint');
                    const firstPaint = performanceEntries.find(entry => entry.name === 'first-paint');
                    const firstContentfulPaint = performanceEntries.find(
                        entry => entry.name === 'first-contentful-paint'
                    );

                    if (firstContentfulPaint) {
                        resolve(firstContentfulPaint.startTime);
                    } else if (firstPaint) {
                        resolve(firstPaint.startTime);
                    } else {
                        const start = performance.timing.navigationStart;
                        const renderEnd = performance.timing.domComplete;
                        resolve(renderEnd - start);
                    }
                });
            });

            return renderTime;
        } catch (error) {
            console.error(`Error measuring render time for ${url}:`, error.message);
            return 0;
        }
    }

    async measureFiltering(page, url) {
        try {
            const currentUrl = page.url();
            if (currentUrl !== url) {
                await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
            }

            const framework = url.includes(':5174') ? 'react' : 'vue';

            const filterTime = await page.evaluate((framework) => {
                return new Promise((resolve) => {
                    const testData = Array.from({ length: 10000 }, (_, i) => ({
                        id: i,
                        name: `Item ${i}`,
                        category: `Category ${i % 10}`,
                        value: Math.random() * 1000,
                        active: Math.random() > 0.5,
                        year: 2000 + (i % 24),
                        price: Math.random() * 50000
                    }));

                    const testFunction = framework === 'react' ? window.runReactFilterTest : window.runVueFilterTest;

                    if (testFunction) {
                        const startTime = performance.now();
                        testFunction(testData).then(() => {
                            const endTime = performance.now();
                            resolve(endTime - startTime);
                        });
                    } else {
                        const startTime = performance.now();
                        const filtered = testData.filter(item => {
                            return item.active &&
                                item.value > 500 &&
                                item.name.includes('5') &&
                                item.year > 2010 &&
                                item.price < 30000;
                        });
                        const endTime = performance.now();
                        resolve(endTime - startTime);
                    }
                });
            }, framework);

            return filterTime;
        } catch (error) {
            console.error(`Error measuring filtering time for ${url}:`, error.message);
            return 0;
        }
    }
}

module.exports = new RenderTimeMetric();
