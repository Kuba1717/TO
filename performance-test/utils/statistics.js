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
}

module.exports = new Statistics();
