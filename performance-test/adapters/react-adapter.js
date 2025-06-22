class ReactAdapter {
    async measureRenderTime(page) {
        return await page.evaluate(() => {
            return new Promise((resolve) => {
                if (typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined') {
                    console.warn('React DevTools not available');
                    resolve(0);
                    return;
                }

                const reactInstance = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.renderers;
                if (!reactInstance || reactInstance.size === 0) {
                    console.warn('React instance not found');
                    resolve(0);
                    return;
                }

                const renderer = reactInstance.get(1);
                if (!renderer) {
                    console.warn('React renderer not found');
                    resolve(0);
                    return;
                }

                let totalRenderTime = 0;
                let renderCount = 0;

                performance.mark('react-render-start');

                const root = document.getElementById('root');
                if (root && root._reactRootContainer) {
                    root._reactRootContainer._internalRoot.current.stateNode.render();
                } else if (window.React && window.ReactDOM) {
                    const event = new Event('forceUpdate');
                    document.dispatchEvent(event);
                }

                setTimeout(() => {
                    performance.mark('react-render-end');
                    performance.measure('react-render', 'react-render-start', 'react-render-end');

                    const measurements = performance.getEntriesByName('react-render');
                    if (measurements.length > 0) {
                        totalRenderTime = measurements[0].duration;
                        renderCount = 1;
                    }

                    performance.clearMarks('react-render-start');
                    performance.clearMarks('react-render-end');
                    performance.clearMeasures('react-render');

                    resolve(renderCount > 0 ? totalRenderTime / renderCount : 0);
                }, 100);
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

                if (window.runReactFilterTest) {
                    const startTime = performance.now();
                    window.runReactFilterTest(testData).then(() => {
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

module.exports = ReactAdapter;
