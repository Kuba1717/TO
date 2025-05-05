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
}

module.exports = VueAdapter;
