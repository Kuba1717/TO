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
}

module.exports = new RenderTimeMetric();
