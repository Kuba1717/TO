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

                const originalCommit = renderer.currentDispatcherRef.current.useCallback;
                renderer.currentDispatcherRef.current.useCallback = (callback, deps) => {
                    const wrappedCallback = (...args) => {
                        const startTime = performance.now();
                        const result = callback(...args);
                        const endTime = performance.now();

                        totalRenderTime += (endTime - startTime);
                        renderCount++;

                        return result;
                    };

                    return originalCommit(wrappedCallback, deps);
                };

                window.forceUpdate = () => {
                    const root = document.getElementById('root');
                    if (root && root._reactRootContainer) {
                        root._reactRootContainer._internalRoot.current.stateNode.render();
                    }
                };

                window.forceUpdate();

                setTimeout(() => {
                    renderer.currentDispatcherRef.current.useCallback = originalCommit;
                    resolve(renderCount > 0 ? totalRenderTime / renderCount : 0);
                }, 1000);
            });
        });
    }
}

module.exports = ReactAdapter;
