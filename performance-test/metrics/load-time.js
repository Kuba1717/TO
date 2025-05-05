class LoadTimeMetric {
    async measure(page, url) {
        try {
            const loadPromise = page.evaluate(() => {
                return new Promise((resolve) => {
                    if (document.readyState === 'complete') {
                        const timing = performance.timing || {};
                        resolve(timing.loadEventEnd - timing.navigationStart);
                    } else {
                        window.addEventListener('load', () => {
                            const timing = performance.timing || {};
                            resolve(timing.loadEventEnd - timing.navigationStart);
                        });
                    }
                });
            });

            const navigationPromise = page.goto(url, {
                waitUntil: 'networkidle2',
                timeout: 30000
            });

            await navigationPromise;
            const loadTime = await loadPromise;

            return loadTime;
        } catch (error) {
            console.error(`Error measuring load time for ${url}:`, error.message);
            return 0;
        }
    }
}

module.exports = new LoadTimeMetric();
