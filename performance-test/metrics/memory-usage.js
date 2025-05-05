class MemoryUsageMetric {
    async measure(page, url) {
        try {
            const currentUrl = page.url();
            if (currentUrl !== url) {
                await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
            }

            const memoryUsage = await page.evaluate(() => {
                if (window.performance && window.performance.memory) {
                    return window.performance.memory.usedJSHeapSize;
                }
                return 0;
            });

            return memoryUsage;
        } catch (error) {
            console.error(`Error measuring memory usage for ${url}:`, error.message);
            return 0;
        }
    }
}

module.exports = new MemoryUsageMetric();
