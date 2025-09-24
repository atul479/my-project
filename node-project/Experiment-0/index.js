const http = require('http');


const handler1 = (req, res) => {
 res.statusCode = 200;
 res.setHeader('Content-Type', 'text/plain');
 res.end('Hello, World!\n');
};

const handler2 = (req, res) => {
 res.statusCode = 200;
 res.setHeader('Content-Type', 'text/plain');
 res.end('Hello, World!\n');
};

const handler3 = (req, res) => {
 res.statusCode = 200;
 res.setHeader('Content-Type', 'application/json');
 res.end(JSON.stringify({ message: 'Hello, World!' }));
};

const server = http.createServer(handler3)

const port = 3000;
server.listen(port, () => {
 console.log(`Server running at http://localhost:${port}/`);
});