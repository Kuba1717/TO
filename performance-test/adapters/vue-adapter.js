class VueAdapter {
    async measureRenderTime(page) {
        return page.evaluate(() => {
            return new Promise((resolve) => {
                if (!window.__VUE__) {
                    console.warn('Vue DevTools not available');
                    resolve(0);
                    return;
                }

                const vueInstances = window.__VUE__.apps;
                if (!vueInstances || vueInstances.length === 0) {
                    console.warn('Vue instance not found');
                    resolve(0);
                    return;
                }

                const app = vueInstances[0];

                let totalRenderTime = 0;
                let renderCount = 0;

                performance.mark('vue-render-start');

                app.$forceUpdate();

                app.config.globalProperties.$nextTick(() => {
                    performance.mark('vue-render-end');
                    performance.measure('vue-render', 'vue-render-start', 'vue-render-end');

                    const measurements = performance.getEntriesByName('vue-render');
                    totalRenderTime = measurements[0].duration;
                    renderCount = 1;

                    performance.clearMarks('vue-render-start');
                    performance.clearMarks('vue-render-end');
                    performance.clearMeasures('vue-render');

                    resolve(renderCount > 0 ? totalRenderTime / renderCount : 0);
                });
            });
        });
    }

    async measureFilteringTime(page) {
        return await page.evaluate(() => {
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

                if (window.runVueFilterTest) {
                    const startTime = performance.now();
                    window.runVueFilterTest(testData).then(() => {
                        const endTime = performance.now();
                        resolve(endTime - startTime);
                    });
                } else {
                    resolve(0);
                }
            });
        });
    }
}

module.exports = VueAdapter;
