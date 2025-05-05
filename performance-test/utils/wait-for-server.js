const http = require('http');
const https = require('https');

function isUrlHttps(url) {
    return url.startsWith('https://');
}

function checkServerAvailability(url) {
    return new Promise((resolve) => {
        const protocol = isUrlHttps(url) ? https : http;
        const req = protocol.get(url, (res) => {
            resolve(true);
        });

        req.on('error', () => {
            resolve(false);
        });

        req.on('timeout', () => {
            req.abort();
            resolve(false);
        });

        req.setTimeout(2000);
    });
}

async function waitForServer(url, maxRetries = 3, retryInterval = 2000) {
    console.log(`Checking if server is available at: ${url}`);

    for (let i = 0; i < maxRetries; i++) {
        const isAvailable = await checkServerAvailability(url);

        if (isAvailable) {
            console.log(`Server at ${url} is available!`);
            return true;
        }

        console.log(`Server at ${url} is not available. Retry ${i + 1}/${maxRetries}...`);

        if (i < maxRetries - 1) {
            await new Promise(resolve => setTimeout(resolve, retryInterval));
        }
    }

    console.error(`Server at ${url} is not available after ${maxRetries} retries.`);
    return false;
}

module.exports = waitForServer;
