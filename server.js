const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const PORT = 8000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
