class Statistics {
    mean(values) {
        if (!values || values.length === 0) return 0;
        return values.reduce((sum, value) => sum + value, 0) / values.length;
    }

    median(values) {
        if (!values || values.length === 0) return 0;
        const sorted = [...values].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 === 0
            ? (sorted[mid - 1] + sorted[mid]) / 2
            : sorted[mid];
    }

    stdDev(values) {
        if (!values || values.length <= 1) return 0;
        const avg = this.mean(values);
        const squareDiffs = values.map(value => Math.pow(value - avg, 2));
        return Math.sqrt(this.mean(squareDiffs));
    }

    min(values) {
        if (!values || values.length === 0) return 0;
        return Math.min(...values);
    }

    max(values) {
        if (!values || values.length === 0) return 0;
        return Math.max(...values);
    }

    summarize(values) {
        return {
            values,
            mean: this.mean(values),
            median: this.median(values),
            stdDev: this.stdDev(values),
            min: this.min(values),
            max: this.max(values)
        };
    }

    identifyOutliersIQR(values, threshold = 1.5) {
        if (!values || values.length <= 3) return [];

        const sorted = [...values].sort((a, b) => a - b);
        const q1Index = Math.floor(sorted.length * 0.25);
        const q3Index = Math.floor(sorted.length * 0.75);

        const q1 = sorted[q1Index];
        const q3 = sorted[q3Index];
        const iqr = q3 - q1;

        const lowerFence = q1 - (threshold * iqr);
        const upperFence = q3 + (threshold * iqr);

        return values.map((value, index) => {
            if (value < lowerFence || value > upperFence) {
                return index;
            }
            return -1;
        }).filter(index => index !== -1);
    }

    removeOutliers(values) {
        const outlierIndices = this.identifyOutliersIQR(values);
        return values.filter((_, index) => !outlierIndices.includes(index));
    }
}

module.exports = new Statistics();
