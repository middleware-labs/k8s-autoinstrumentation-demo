const http = require('http');

// Define the port to listen on
const PORT = process.env.PORT || 8080;

// Create a simple HTTP server
const server = http.createServer((req, res) => {
    if (req.url === '/fetch' && req.method === 'GET') {
        // Define the options for the request to the other service
        const options = {
            hostname: 'golang-service',
            port: 8080,
            path: '/data',
            method: 'GET'
        };

        // Create a new HTTP request to the other service
        const otherServiceRequest = http.request(options, otherServiceResponse => {
            let data = '';

            // Accumulate the response data
            otherServiceResponse.on('data', chunk => {
                data += chunk;
            });

            // When the response is complete, send the accumulated data as a JSON response
            otherServiceResponse.on('end', () => {
                res.writeHead(otherServiceResponse.statusCode);
                res.end(data);
            });
        });

        // Handle errors in the request to the other service
        otherServiceRequest.on('error', error => {
            res.writeHead(500);
            res.end('Failed to fetch data from other service' );
        });

        // End the request to the other service
        otherServiceRequest.end();
    } else {
        // Handle other requests
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Not found' }));
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

