const fs = require('fs');
const path = require('path');

class HtmlReporter {
    generateReport(results, outputPath) {
        const html = this.createHtml(results);

        const outputDir = path.dirname(outputPath);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        fs.writeFileSync(outputPath, html);
        console.log(`Report generated at: ${outputPath}`);

        return outputPath;
    }

    createHtml(results) {
        return `
      <!DOCTYPE html>
      <html>
      <head>
        <title>React vs Vue Performance Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1, h2, h3 { color: #333; }
          table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          .react-win { background-color: #d4edda; }
          .vue-win { background-color: #d1ecf1; }
          .tie { background-color: #fff3cd; }
          .chart-container { height: 400px; margin-bottom: 40px; }
        </style>
        <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.9/dist/chart.umd.min.js"></script>
      </head>
      <body>
        <h1>React vs Vue Performance Report</h1>
        <p>Generated: ${new Date().toLocaleString()}</p>
        
        <h2>Summary</h2>
        ${this.generateSummaryTable(results)}
        
        <h2>Detailed Results</h2>
        ${this.generateDetailedResults(results)}
        
        <script>
          window.addEventListener('load', function() {
            ${this.generateChartCode(results)}
          });
        </script>
      </body>
      </html>
    `;
    }

    generateSummaryTable(results) {
        let html = `<table>
      <tr>
        <th>Metric</th>
        <th>React (avg)</th>
        <th>Vue (avg)</th>
        <th>Difference</th>
        <th>Winner</th>
      </tr>`;

        const metrics = {
            'loadTime': 'ms',
            'renderTime': 'ms',
            'memoryUsage': 'bytes'
        };

        for (const [metric, unit] of Object.entries(metrics)) {
            const reactSum = Object.values(results.react).reduce((sum, route) => {
                return sum + (route[metric]?.mean || 0);
            }, 0);

            const vueSum = Object.values(results.vue).reduce((sum, route) => {
                return sum + (route[metric]?.mean || 0);
            }, 0);

            const reactRoutes = Object.keys(results.react).length || 1;
            const vueRoutes = Object.keys(results.vue).length || 1;

            const reactAvg = reactSum / reactRoutes;
            const vueAvg = vueSum / vueRoutes;

            const diff = reactAvg - vueAvg;
            const percentDiff = vueAvg !== 0 ? (diff / vueAvg) * 100 : 0;

            let winner = 'tie';
            if (Math.abs(percentDiff) < 5) {
                winner = 'tie';
            } else if (metric === 'memoryUsage' ? diff < 0 : diff < 0) {
                winner = 'react';
            } else {
                winner = 'vue';
            }

            const formattedReactAvg = this.formatValue(reactAvg, unit);
            const formattedVueAvg = this.formatValue(vueAvg, unit);

            html += `
        <tr>
          <td>${this.formatMetricName(metric)}</td>
          <td>${formattedReactAvg}</td>
          <td>${formattedVueAvg}</td>
          <td>${Math.abs(percentDiff).toFixed(2)}% ${diff < 0 ? 'faster' : 'slower'}</td>
          <td class="${winner}-win">${winner === 'tie' ? 'Tie' : winner === 'react' ? 'React' : 'Vue'}</td>
        </tr>
      `;
        }

        html += `</table>`;
        return html;
    }

    generateDetailedResults(results) {
        let html = '';

        const metrics = {
            'loadTime': 'ms',
            'renderTime': 'ms',
            'memoryUsage': 'bytes'
        };

        for (const routePath in results.react) {
            if (!results.vue[routePath]) continue;

            html += `<h3>Route: ${routePath}</h3>`;
            html += `<table>
        <tr>
          <th>Metric</th>
          <th>React (mean)</th>
          <th>React (median)</th>
          <th>Vue (mean)</th>
          <th>Vue (median)</th>
          <th>Difference</th>
          <th>Winner</th>
        </tr>`;

            for (const [metric, unit] of Object.entries(metrics)) {
                const reactMetric = results.react[routePath]?.[metric];
                const vueMetric = results.vue[routePath]?.[metric];

                if (!reactMetric || !vueMetric) continue;

                const diff = reactMetric.mean - vueMetric.mean;
                const percentDiff = vueMetric.mean !== 0 ? (diff / vueMetric.mean) * 100 : 0;

                let winner = 'tie';
                if (Math.abs(percentDiff) < 5) {
                    winner = 'tie';
                } else if (metric === 'memoryUsage' ? diff < 0 : diff < 0) {
                    winner = 'react';
                } else {
                    winner = 'vue';
                }

                const formattedReactMean = this.formatValue(reactMetric.mean, unit);
                const formattedReactMedian = this.formatValue(reactMetric.median, unit);
                const formattedVueMean = this.formatValue(vueMetric.mean, unit);
                const formattedVueMedian = this.formatValue(vueMetric.median, unit);

                html += `
          <tr>
            <td>${this.formatMetricName(metric)}</td>
            <td>${formattedReactMean}</td>
            <td>${formattedReactMedian}</td>
            <td>${formattedVueMean}</td>
            <td>${formattedVueMedian}</td>
            <td>${Math.abs(percentDiff).toFixed(2)}% ${diff < 0 ? 'faster' : 'slower'}</td>
            <td class="${winner}-win">${winner === 'tie' ? 'Tie' : winner === 'react' ? 'React' : 'Vue'}</td>
          </tr>
        `;
            }

            html += `</table>`;

            html += `<div class="chart-container">
        <canvas id="chart-${this.sanitizeId(routePath)}"></canvas>
      </div>`;
        }

        return html;
    }

    generateChartCode(results) {
        let code = '';

        for (const routePath in results.react) {
            if (!results.vue[routePath]) continue;

            const chartId = `chart-${this.sanitizeId(routePath)}`;

            const reactData = {
                loadTime: results.react[routePath]?.loadTime?.mean || 0,
                renderTime: results.react[routePath]?.renderTime?.mean || 0,
                memoryUsage: results.react[routePath]?.memoryUsage?.mean || 0
            };

            const vueData = {
                loadTime: results.vue[routePath]?.loadTime?.mean || 0,
                renderTime: results.vue[routePath]?.renderTime?.mean || 0,
                memoryUsage: results.vue[routePath]?.memoryUsage?.mean || 0
            };

            const maxValues = {
                loadTime: Math.max(reactData.loadTime, vueData.loadTime) || 1,
                renderTime: Math.max(reactData.renderTime, vueData.renderTime) || 1,
                memoryUsage: Math.max(reactData.memoryUsage, vueData.memoryUsage) || 1
            };

            const normalizedReactData = [
                (reactData.loadTime / maxValues.loadTime) * 100 || 0,
                (reactData.renderTime / maxValues.renderTime) * 100 || 0,
                (reactData.memoryUsage / maxValues.memoryUsage) * 100 || 0
            ];

            const normalizedVueData = [
                (vueData.loadTime / maxValues.loadTime) * 100 || 0,
                (vueData.renderTime / maxValues.renderTime) * 100 || 0,
                (vueData.memoryUsage / maxValues.memoryUsage) * 100 || 0
            ];

            code += `
        new Chart(document.getElementById('${chartId}'), {
          type: 'bar',
          data: {
            labels: ['Load Time', 'Render Time',  'Memory Usage'],
            datasets: [
              {
                label: 'React',
                data: ${JSON.stringify(normalizedReactData)},
                backgroundColor: 'rgba(97, 218, 251, 0.5)',
                borderColor: 'rgba(97, 218, 251, 1)',
                borderWidth: 1
              },
              {
                label: 'Vue',
                data: ${JSON.stringify(normalizedVueData)},
                backgroundColor: 'rgba(66, 184, 131, 0.5)',
                borderColor: 'rgba(66, 184, 131, 1)',
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Percentage (%)'
                }
              }
            },
            plugins: {
              tooltip: {
                callbacks: {
                  label: function(context) {
                    const label = context.dataset.label || '';
                    const value = context.parsed.y.toFixed(1);
                    return \`\${label}: \${value}%\`;
                  }
                }
              },
              title: {
                display: true,
                text: 'Performance Comparison for ${routePath}'
              }
            }
          }
        });`;
        }

        return code;
    }

    formatValue(value, unit) {
        if (value === undefined || value === null) {
            return "N/A";
        }

        if (unit === 'bytes') {
            if (value > 1024 * 1024) {
                return `${(value / (1024 * 1024)).toFixed(2)} MB`;
            } else if (value > 1024) {
                return `${(value / 1024).toFixed(2)} KB`;
            } else {
                return `${value.toFixed(2)} bytes`;
            }
        } else {
            return `${value.toFixed(2)} ${unit}`;
        }
    }


    formatMetricName(name) {
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
    }

    sanitizeId(str) {
        return str.replace(/[^a-zA-Z0-9]/g, '_');
    }
}

module.exports = new HtmlReporter();
