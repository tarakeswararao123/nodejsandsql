const http = require('http');
const app = require('./app')

const port = process.PORT || 7000;
const server = http.createServer(app);
app.listen(port)
console.log('Node server running on port' +port)
